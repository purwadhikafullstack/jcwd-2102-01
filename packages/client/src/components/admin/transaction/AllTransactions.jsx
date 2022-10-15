import {
  Box, Text, Input, Select, InputGroup, Icon,
  FormControl, Button, useMediaQuery, TabPanel, Tab, InputRightElement,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody,
  NumberInputField, NumberInput, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { BiSearchAlt } from 'react-icons/bi';
import { axiosInstance } from '../../../lib/api';
import moment from 'moment';
import * as Yup from "yup";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import AdmTransactionCard from './AdmTransactionCard';

export default function AllTransactions() {
  const [transactionFetch, setTransactionFetch] = useState([])
  const userSelector = useSelector((state) => (state.auth))
  const autoRender = useSelector((state) => state.automateRendering)
  const dispatch = useDispatch()
  const router = useRouter();

  // ------ for filter
  const [pageStart, setPageStart] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [limit, setLimit] = useState(8)
  const [transactionLength, setTransactionLength] = useState(0)
  const [searchInvNo, setSearchInvNo] = useState('')
  let routerQuery = router.query
  const [hoursStart, setHoursStart] = useState(0)
  const [minutesStart, setMinutesStart] = useState(0)
  const [hoursEnd, setHoursEnd] = useState(0)
  const [minutesEnd, setMinutesEnd] = useState(0)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  // -------------------- Search -------------------- //
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
  let startDate2 = moment(dateRange[0]?.startDate).format('YYYY-MM-DD') + ` ${hoursStart < 10 ? '0' + hoursStart : hoursStart}:${minutesStart < 10 ? '0' + minutesStart : minutesStart}:00`
  let endDate2 = dateRange[0]?.endDate ? moment(dateRange[0]?.endDate).format('YYYY-MM-DD') + ` ${hoursEnd < 10 ? '0' + hoursEnd : hoursEnd}:${minutesEnd < 10 ? '0' + minutesEnd : minutesEnd}:00` : ''
  // console.log(moment(dateRange[0].startDate).format('YYYY-MM-DD'));
  // console.log(moment(dateRange[0].endDate).format('YYYY-MM-DD'));
  // console.log(startDate2);
  // console.log(endDate2);

  // -------------------- Fetching Transaction -------------------- //
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
      axiosInstance.post(`/transaction/api/v1/Trasanctions?idUser&page=1&limit=1000000&search=${searchInvNo}&startDate${startDate2 == dateNow && !endDate2 ? null : '=' + startDate2}&endDate=${endDate2}&status${status ? '=' + status : null}&sort=${sort}&orderby=${order}`)
        .then((res) => {
          const temp = res.data.result
          setTransactionLength(temp.length) // total transaksi keseluruhan
          setTotalPage(Math.ceil(temp.length / limit))
        })

      axiosInstance.post(`/transaction/api/v1/Trasanctions?idUser&page=${page}&limit=${limit}&search=${searchInvNo}&startDate${startDate2 == dateNow && !endDate2 ? null : '=' + startDate2}&endDate=${endDate2}&status${status ? '=' + status : null}&sort=${sort}&orderby=${order}`)
        .then((res) => {
          setTransactionFetch(res.data.result)
          const temp = res.data.result
          setTransactionLength(temp.length)
          // console.log(res.data.result)
          // console.log('test' + res.data.result.length)
        })
    } catch (err) {
      console.log(err)
    }
  };
  // console.log('total transaksi ' + transactionLength)
  // console.log('total page ' + totalPage)
  // console.log('limit ' + limit);
  // console.log(page)
  const renderTransaction = () => {
    return transactionFetch.map((val, index) => {
      return (
        <AdmTransactionCard key={index}
          id={val.id}
          noInvoice={val.no_invoice}
          dateCreated={val.createdAt}
          status={val.transaction_status}
          grandTotal={val.total_paid}
          products={val.Transaction_lists}
          qtyBuy={val.Transaction_lists[0]?.buy_quantity}
          note={val.note}
          cancelDes={val.cancel_description}
          productName={val.Transaction_lists[0]?.Product?.product_name}
          productCode={val.Transaction_lists[0]?.Product?.product_code}
          productImage={val.Transaction_lists[0]?.Product?.Product_images[0].image_url}
          idUser={val.id_user}
          buyerName={val.User.first_name + ' ' + val.User.last_name}
          addressReciever={val.Address.address}
          courier={val.courier}
          imagePayment={val.Payment?.image_url}
          recipeImage={val.Upload_recipe?.image_recipe}
          idRecipe={val.id_upload_recipe}
          namaPenerima={val.Address?.receiver_name}
          noHpPenerima={val.Address?.receiver_phone}
          alamatPenerima={val.Address?.address}
          prov={val.Address?.province}
          city={val.Address?.city_name}
          cityId={val.Address?.city_id}
          district={val.Address?.districts}
          postalCode={val.Address?.postal_code}
          totalOrder={val.total_transaction}
          shippingCost={val.shipping_cost}
        />
      )
    })
  }

  //  -------------------- reset filter -------------------- //
  const resetFilter = async () => {
    setSearchInvNo('')
    document.getElementById("search").value = '';
    setHoursStart(0)
    setMinutesStart(0)
    setHoursEnd(0)
    setMinutesEnd(0)
    setPage(1)
    setDateRange([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
      }]
    )
  }

  useEffect(() => {
    fetchTransaction()
  }, [router.isReady]);

  useEffect(() => {
    fetchTransaction()
  }, [autoRender]);

  useEffect(() => {
    fetchTransaction()
  }, [routerQuery.status, dateRange, searchInvNo, startDate2, endDate2, page]);

  return (
    <Box maxW='1050px'>
      <Box display='flex' flexWrap='wrap'>

        {/* ----- filter search Inv ----- */}
        <Box w='190px' m='3px'>
          {/* {formik.values.searchInvoice} */}
          <FormControl isInvalid={formik.errors.searchInvoice}>
            <InputGroup size='md' >
              <Input placeholder="Cari No Invoice" id='search' type='text' bg='white' borderRadius='8px'
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

        {/* ----- filter Sord dan order ----- */}
        <Box m='3px' w='210px'>
          {/* {formik.values.sortByProduct} */}
          <FormControl isInvalid={formik.errors.sortByProduct}>
            <Select size='md' borderRadius='8px' bg='white'
              onChange={(event) => {
                fetchTransaction(event.target.value)
              }}>
              <option value='' color='grey'>Urut Berdasarkan</option>
              <option value='no_invoice_asc'>No Invoice A-Z</option>
              <option value='no_invoice_desc'>No Invoice Z-A</option>
              <option value='createdAt_desc'>Tanggal Transaksi Terbaru</option>
              <option value='createdAt_asc'>Tanggal Transaksi Lama</option>
            </Select>
          </FormControl>
        </Box>

        {/* ----- filter Date and time ----- */}
        <Box m='3px' mr='8px'>
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
                <Box>Pukul</Box>
                <Box display='flex' bg='#F3F3F3' justifyContent='space-evenly' p='5px' mb='5px'>
                  <Box display='flex' bg='white' p='5px' borderRadius='6px'>
                    <NumberInput size='sm' borderRadius='full' defaultValue={'00'} min={0} max={24} w='63px'
                      onChange={(valueString) => setHoursStart(parseInt(valueString))} value={hoursStart}>
                      <NumberInputField />
                      <NumberInputStepper >
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Text mx='5px'> : </Text>
                    <NumberInput size='sm' borderRadius='full' defaultValue={0} min={0} max={59} w='63px'
                      onChange={(valueString) => setMinutesStart(parseInt(valueString))} value={minutesStart}>
                      <NumberInputField />
                      <NumberInputStepper >
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  <Box display='flex' bg='white' p='5px' borderRadius='6px'>
                    <NumberInput size='sm' borderRadius='full' defaultValue={0} min={0} max={24} w='63px'
                      onChange={(valueString) => setHoursEnd(parseInt(valueString))} value={hoursEnd}>
                      <NumberInputField />
                      <NumberInputStepper >
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Text mx='5px'> : </Text>
                    <NumberInput size='sm' borderRadius='full' defaultValue={0} min={0} max={59} w='63px'
                      onChange={(valueString) => setMinutesEnd(parseInt(valueString))} value={minutesEnd}>
                      <NumberInputField />
                      <NumberInputStepper >
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Box>
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange} />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Box display='flex' >
          <Button variant='link' style={{ textDecoration: 'none' }}
            onClick={() => resetFilter()}>
            <Text alignSelf='center' fontWeight='semibold' textColor='#009B90'>
              Reset Filter
            </Text>
          </Button>
        </Box>
      </Box>

      {/* ----- filter search Inv ----- */}
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

      {/* ----- Transaction Rendering ----- */}
      <Box my='15px'>
        {renderTransaction()}
      </Box>

      {/* ---------- Pagination ---------- */}
      <Box display='flex' justifyContent='center' alignContent='center'>
        <Button onClick={() => {
          async function submit() {
            setPage(page == 1 ? 1 : page - 1)
          } submit()
          var pageNow = page - 1
          pageNow = pageNow <= 0 ? 1 : pageNow
          document.getElementById("pagingInput").value = parseInt(pageNow)
        }}
          size='sm' m='3px' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px'
          _hover={{ bg: '#009B90', color: 'white' }}>Prev</Button>
        {/* {renderButton()} */}
        {/* <Input w='50px' type='number' textAlign='center' bg='white' value={page}
              onChange={(event) => setPage(event.target.value > totalPage ? page : event.target.value < 1 ? 1 : event.target.value)} /> */}
        {/* <Input w='50px' textAlign='center' bg='white' defaultValue={page} type="text" onChange={(e) => {
              !e.target.value ? null : e.target.value <= 0 ? setPage(1) :
                setPage(e.target.value)
            }} /> */}
        <Input w='50px' type='number' id='pagingInput' textAlign='center' bg='white' defaultValue={page} onChange={(e) => {
          !e.target.value ? null : e.target.value > totalPage || e.target.value <= 0 ? e.target.value = page :
            setPage(parseInt(e.target.value))
        }} />
        <Text alignSelf='center' mx='5px'>of {totalPage}</Text>
        <Button onClick={() => {
          async function submit() {
            setPage(totalPage == page ? page : page + 1)
          } submit()
          var pageNow = page + 1
          pageNow = pageNow > totalPage ? page : pageNow
          document.getElementById("pagingInput").value = parseInt(pageNow);
          // console.log("PageNow" + pageNow);
          // console.log("page" + page);
          // console.log("totalPage" + totalPage);
        }} size='sm' m='3px' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px'
          _hover={{ bg: '#009B90', color: 'white' }}>Next</Button>
      </Box>
    </Box>
  )
}