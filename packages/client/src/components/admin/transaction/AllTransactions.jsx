import {
  Box, Text, Avatar, Link, AvatarBadge, Flex, Input, Select, InputLeftElement, InputGroup,
  Modal, ModalCloseButton, Icon, Tooltip, ModalOverlay, ModalHeader, ModalBody, useDisclosure,
  FormControl, Button, useToast, FormHelperText, ModalContent, Center, useMediaQuery,
  Divider, Tabs, TabList, TabPanel, TabPanels, Tab, InputRightElement, Drawer,
  DrawerBody, DrawerHeader, DrawerCloseButton, DrawerContent, DrawerOverlay,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { BiPlusMedical } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { BiSearchAlt, BiReset } from 'react-icons/bi';
import { axiosInstance } from '../../../lib/api';
// import ModalProfPicture from './mchangepicture/ModalProfPict';
import moment from 'moment';
import * as Yup from "yup";
import qs from 'qs';
// import TransactionCard from './TransactionCard';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import AdmTransactionCard from './AdmTransactionCard';

export default function AllTransactions() {
  const { isOpen: isOpenStatus, onOpen: onOpenStatus, onClose: onCloseStatus } = useDisclosure()
  const [filtermobile] = useMediaQuery('(min-width: 1059px)')
  const [filtermobile2] = useMediaQuery('(min-width: 670px)')
  const [transactionFetch, setTransactionFetch] = useState([])
  const [transactionLength, setTransactionLength] = useState()
  const userSelector = useSelector((state) => (state.auth))
  const autoRender = useSelector((state) => state.automateRendering)
  const toast = useToast();
  const dispatch = useDispatch()
  const router = useRouter();
  const image = userSelector.image_url;

  // ------ for filter
  const [pageStart, setPageStart] = useState(1)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(16)
  const [totalProduct, setTotalProduct] = useState(0)
  const [searchInvNo, setSearchInvNo] = useState('')
  let routerQuery = router.query
  // const [statusTransaction, setStatusTransaction] = useState('')
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);


  // ----- Search
  const formik = useFormik({
    initialValues: {
      searchInvoice: ``,
    },
    validationSchema: Yup.object().shape({
      note: Yup.string().required("Kolom pencarian masih kosong")
    }),
    validateOnChange: false,
  })

  let dateNow = moment(new Date()).format('YYYY-MM-DD')
  let startDate2 = moment(dateRange[0].startDate).format('YYYY-MM-DD') + 'T00:00:00.000Z'
  let endDate2 = dateRange[0].endDate ? moment(dateRange[0].endDate).format('YYYY-MM-DD') + 'T00:00:00.000Z' : ''
  // console.log('sekarang ' + dateNow);
  // console.log(moment(dateRange[0].startDate).format('YYYY-MM-DD'));
  // console.log(moment(dateRange[0].endDate).format('YYYY-MM-DD'));
  console.log(startDate2);
  console.log(endDate2);

  // ---------- Fetching Transaction ---------- //
  async function fetchTransaction(filter) {
    const { status } = router.query

    let order = "";
    let sort = "";
    if (filter == 'no_invoice_asc') {
      order = 'no_invoice';
      sort = "ASC"
    } else if (filter == 'no_invoice_desc') {
      order = 'no_invoice';
      sort = "DESC"
    } else if (filter == 'createdAt_desc') {
      order = 'createdAt';
      sort = "DESC"
    } else if (filter == 'createdAt_asc') {
      order = 'createdAt';
      sort = "ASC"
    } else {
      order = '';
      sort = ""
    }

    try {
      axiosInstance.post(`/transaction/api/v1/Trasanctions?idUser&page=1&limit=15&search=${searchInvNo}&startDate${startDate2 == dateNow && !endDate2 ? null : '=' + startDate2}&endDate=${endDate2}&status${status ? '=' + status : null}&sort=${sort}&orderby=${order}`)
        .then((res) => {
          setTransactionFetch(res.data.result)
          const temp = res.data.result
          setTransactionLength(temp.length)
          console.log(temp)
          console.log('test' + res.data.result.length)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderTransaction = () => {
    return transactionFetch.map((val, index) => {
      return (
        <AdmTransactionCard key={index}
          id={val.id}
          noInvoice={val.no_invoice}
          dateCreated={val.createdAt}
          status={val.transaction_status}
          grandTotal={val.total_paid}
          qtyBuy={val.Transaction_lists[0].buy_quantity}
          // unit={val.}
          productName={val.Transaction_lists[0].Product.product_name}
          productCode={val.Transaction_lists[0].Product.product_code}
          productImage={val.Transaction_lists[0].Product.Product_images[0].image_url}
          idUser={val.id_user}
          buyerName={val.User.first_name + ' ' + val.User.last_name}
          addressReciever={val.Address.address}
          courier={val.courier}
          imagePayment={val.Payment?.image_url}
        />

      )
    })
  }

  useEffect(() => {
    fetchTransaction()
    // console.log(addressLength)
  }, [router.isReady]);

  useEffect(() => {
    fetchTransaction()
    // console.log(addressLength)
  }, [autoRender]);

  useEffect(() => {
    fetchTransaction()
    // console.log(addressLength)
  }, [searchInvNo],);

  useEffect(() => {
    fetchTransaction()
    // console.log(addressLength)
  }, [routerQuery.status]);

  useEffect(() => {
    fetchTransaction()
    // console.log(addressLength)
  }, [dateRange]);

  return (
    <Box maxW='1050px'>
      <Box display='flex' flexWrap='wrap'>
        <Box w='190px' m='3px'>
          {/* {formik.values.searchInvoice} */}
          <FormControl isInvalid={formik.errors.searchInvoice}>
            <InputGroup size='md' >
              <Input placeholder="Cari Nama Produk" type='text' bg='white' borderRadius='8px'
                onChange={(event) => formik.setFieldValue("searchInvoice", event.target.value)} />
              <InputRightElement>
                <Icon
                  fontSize="xl"
                  as={BiSearchAlt}
                  sx={{ _hover: { cursor: "pointer" } }}
                  onClick={() => setSearchInvNo(`${formik.values.searchInvoice}`)}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        <Box m='3px' w='210px'>
          {formik.values.sortByProduct}
          <FormControl isInvalid={formik.errors.sortByProduct}>
            <Select size='md' borderRadius='8px' bg='white'
              onChange={(event) => {
                fetchTransaction(event.target.value)
              }}
            >
              <option value='' color='grey'>Urut Berdasarkan</option>
              <option value='no_invoice_asc'>No Invoice A-Z</option>
              <option value='no_invoice_desc'>No Invoice Z-A</option>
              <option value='createdAt_desc'>Tanggal Transaksi Terbaru</option>
              <option value='createdAt_asc'>Tanggal Transaksi Lama</option>
            </Select>
          </FormControl>
        </Box>

        <Box m='3px' >
          <Popover>
            <PopoverTrigger>
              <Button size='md' borderWidth='1px' borderRadius='8px' bg='white'>
                {moment(dateRange[0].startDate).format('YYYY-MM-DD')}  &nbsp; to &nbsp;
                {dateRange[0].endDate ? moment(dateRange[0].endDate).format('YYYY-MM-DD') : moment(dateRange[0].startDate).format('YYYY-MM-DD')}</Button>
            </PopoverTrigger>
            <PopoverContent w='360px'>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader bg='#009B90' color='white' borderTopRadius='5px'>
                <Text fontWeight='bold'>Pilih tanggal</Text>
              </PopoverHeader>
              <PopoverBody>
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />

              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Box>

      {!searchInvNo ?
        null
        :
        <Box mt='10px' display='flex'>
          <Text mr='5px'>
            Hasil Pencarian :
          </Text>
          <Text fontWeight='semibold'>
            {searchInvNo}
          </Text>
        </Box>
      }

      <Box my='15px'>
        {/* <AdmTransactionCard /> */}
        {renderTransaction()}
      </Box>
    </Box>
  )
}