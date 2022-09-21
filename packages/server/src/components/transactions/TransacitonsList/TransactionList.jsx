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
import TransactionCard from './TransactionCard';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

export default function TransactionList() {
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
  const [statusTransaction, setStatusTransaction] = useState('')
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
      axiosInstance.post(`/transaction/api/v1/Trasanction/User/${userSelector.id}?page=1&limit=15&search=${searchInvNo}&startDate${startDate2 == dateNow && !endDate2 ? null : '=' + startDate2}&endDate=${endDate2}&status=${statusTransaction}&sort=${sort}&orderby=${order}`)
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
        <TransactionCard key={index}
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
        />

      )
    })
  }

  async function handleEvent(event, picker) {

    console.log(picker.startDate);
    console.log(picker.endDate);
    // console.log('testing ' + newEnd);
  }
  async function handleCallback(start, end, label) {
    console.log(start, end, label);
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
  }, [statusTransaction]);

  useEffect(() => {
    fetchTransaction()
    // console.log(addressLength)
  }, [dateRange]);

  return (
    <>
      <Box maxH='300px' w={'250px'} m='30px' mt='15px' mb='20px' boxShadow='md' hidden={filtermobile ? false : true} bg='#ffffff' borderWidth='1px' borderRadius="6px">
        {/* -------------------- User Profile Picture and data -------------------- */}
        <Box display='flex' m='20px' py='5px'  >
          <Avatar name={userSelector.first_name + userSelector.last_name} size='sm' src={`http://${userSelector.image_url}`} />
          <Text color='#0778a3' alignSelf='center' fontWeight='bold' ml='20px' fontSize='lg' >{userSelector.first_name} {userSelector.last_name}</Text>
          {
            userSelector.is_verified == 'no' ? null : <Icon ml='5px' boxSize={4} alignSelf='center' color='#00ACEE' as={GoVerified} />
          }
        </Box >
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' borderTopWidth='2px' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Transaksi Sukses</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>0</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Proses</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>0</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Pengiriman</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>0</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Transaksi Batal</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>0</Text>
        </Box>
      </Box >

      {/* -------------------- Daftar Transaksi -------------------- */}
      <Box flexWrap={'wrap'} minW='350px' justifyContent='space-evenly' boxShadow='md' maxW='800px' bg='#ffffff' borderWidth='1px' borderRadius="6px" mt='15px' p='20px' >
        <Box display='flex'>
          <Box w='400px'>
            <Text fontWeight='bold' color='#0778a3' fontSize='xl'>
              Daftar Pembelian
            </Text>
          </Box>
          <Box w='350px'></Box >
        </Box >

        <Box mt="10px" display='flex' flexWrap='wrap'>
          <Box w='170px' m='3px'>
            {/* {formik.values.searchInvoice} */}
            <FormControl isInvalid={formik.errors.searchInvoice}>
              <InputGroup size='sm' >
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

          <Box m='3px' w='170px'>
            {formik.values.sortByProduct}
            <FormControl isInvalid={formik.errors.sortByProduct}>
              <Select size='sm' borderRadius='8px'
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

          <Box display='flex' m='3px' w='170px' justifyContent='space-evenly' hidden={filtermobile2 ? true : false}>
            <Button onClick={onOpenStatus} size='sm' w='170px' borderRadius='8px' bg='#009B90'
              _hover={{ background: '#02d1c2' }}>
              <Text mx='10px' fontWeight='bold' color='white'>
                Status
              </Text>
            </Button>
            <Drawer onClose={onCloseStatus} placement='top' isOpen={isOpenStatus} size='full'>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton color='white' />
                <DrawerHeader bg='#009B90' color='white'>Status</DrawerHeader>
                <DrawerBody>
                  <Box px='20px' py='10px'>
                    asdfasdf
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>

          <Box m='3px' w='170px'>
            <Popover>
              <PopoverTrigger>
                <Button size='sm' borderWidth='1px' borderRadius='8px' bg='white'>
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

            {/* <DateRange
                editableDateInputs={true}
                onChange={item => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              /> */}
          </Box>
        </Box>

        <Box hidden={filtermobile2 ? false : true}>
          <Tabs>
            <TabList>
              <Tab py='15px' onClick={() => setStatusTransaction(``)}>
                <Text fontSize='sm' fontWeight='semibold'>Semua</Text>
              </Tab>
              <Tab py='15px' onClick={() => setStatusTransaction(`Menunggu Pembayaran`)}>
                <Text fontSize='sm' fontWeight='semibold'>Menunggu</Text>
              </Tab>
              <Tab py='15px' onClick={() => setStatusTransaction(`Diproses`)}>
                <Text fontSize='sm' fontWeight='semibold'>Diproses</Text>
              </Tab>
              <Tab py='15px' onClick={() => setStatusTransaction(`Dikirim`)}>
                <Text fontSize='sm' fontWeight='semibold'>Dikirim</Text>
              </Tab>
              <Tab py='15px' onClick={() => setStatusTransaction(`Pesanan Dikonfirmasi`)}>
                <Text fontSize='sm' fontWeight='semibold'>Selesai</Text>
              </Tab>
              <Tab py='15px' onClick={() => setStatusTransaction(`Dibatalkan`)}>
                <Text fontSize='sm' fontWeight='semibold'>Dibatalkan</Text>
              </Tab>
              <Tab py='15px'>
                <Text fontSize='sm' fontWeight='semibold'>Resep Dokter</Text>
              </Tab>
            </TabList>
          </Tabs>
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
          {renderTransaction()}
        </Box>

        Test
      </Box >
    </>
  )
}