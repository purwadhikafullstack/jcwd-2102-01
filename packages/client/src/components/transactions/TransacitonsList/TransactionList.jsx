import {
  Box, Text, Avatar, Link, Input, Select, InputGroup,
  Icon, useDisclosure, FormControl, Button, useToast, useMediaQuery,
  Tabs, TabList, TabPanel, TabPanels, Tab, InputRightElement, Drawer,
  DrawerBody, DrawerHeader, DrawerCloseButton, DrawerContent, DrawerOverlay,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody,
  NumberInputField, NumberInput, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import { BiSearchAlt, BiReset } from 'react-icons/bi';
import { axiosInstance } from '../../../lib/api';
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
  const userSelector = useSelector((state) => (state.auth))
  const autoRender = useSelector((state) => state.automateRendering)
  const toast = useToast();
  const dispatch = useDispatch()
  const router = useRouter();
  const image = userSelector.image_url;

  // -------------------- for filter -------------------- //
  const [pageStart, setPageStart] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [limit, setLimit] = useState(8)
  const [transactionLength, setTransactionLength] = useState(0)
  const [searchInvNo, setSearchInvNo] = useState('')
  const [statusTransaction, setStatusTransaction] = useState('')
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
  // console.log(moment(dateRange[0].startDate).format("YYYY-MM-DD HH:mm:ss"));
  // console.log(moment(dateRange[0].endDate).format('YYYY-MM-DD'));
  // console.log(startDate2);
  // console.log(endDate2);

  // -------------------- Fetching Transaction -------------------- //
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
      axiosInstance.post(`/transaction/api/v1/Trasanctions?idUser=${userSelector.id}&page=1&limit=1000000&search=${searchInvNo}&startDate${startDate2 == dateNow && !endDate2 ? null : '=' + startDate2}&endDate=${endDate2}&status${statusTransaction ? '=' + statusTransaction : null}&sort=${sort}&orderby=${order}`)
        .then((res) => {
          const temp = res.data.result
          setTransactionLength(temp.length) // total transaksi keseluruhan
          setTotalPage(Math.ceil(temp.length / limit))
        })

      axiosInstance.post(`/transaction/api/v1/Trasanctions?idUser=${userSelector.id}&page=${page}&limit=${limit}&search=${searchInvNo}&startDate${startDate2 == dateNow && !endDate2 ? null : '=' + startDate2}&endDate=${endDate2}&status=${statusTransaction}&sort=${sort}&orderby=${order}`)
        .then((res) => {
          setTransactionFetch(res.data.result)
          const temp = res.data.result
          setTransactionLength(temp.length)
          console.log(temp)
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
          qtyBuy={val.Transaction_lists[0]?.buy_quantity}
          products={val.Transaction_lists}
          note={val.note}
          cancelDes={val.cancel_description}
          unit={val.Transaction_lists[0]?.Unit?.unit_name}
          productName={val.Transaction_lists[0]?.Product?.product_name}
          productCode={val.Transaction_lists[0]?.Product?.product_code}
          productImage={val.Transaction_lists[0]?.Product?.Product_images[0].image_url}
          idUser={val.id_user}
          recipeImage={val.Upload_recipe?.image_recipe}
          idRecipe={val.id_upload_recipe}
          namaPenerima={val.Address?.receiver_name}
          noHpPenerima={val.Address?.receiver_phone}
          alamatPenerima={val.Address?.address}
          prov={val.Address?.province}
          city={val.Address?.city_name}
          district={val.Address?.districts}
          kurir={val.courier}
          totalOrder={val.total_transaction}
          shippingCost={val.shipping_cost}
        />

      )
    })
  }

  const resetFilter = async () => {
    setSearchInvNo('')
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
  }, [searchInvNo, statusTransaction, dateRange, startDate2, endDate2, page]);

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
                <Input placeholder="Cari No Invoice" type='text' bg='white' borderRadius='8px'
                  onChange={(event) => formik.setFieldValue("searchInvoice", event.target.value)} />
                <InputRightElement>
                  <Icon
                    fontSize="xl"
                    as={BiSearchAlt}
                    sx={{ _hover: { cursor: "pointer" } }}
                    onClick={() => {
                      async function submit() {
                        setSearchInvNo(`${formik.values.searchInvoice}`)
                        setPage(1)
                      }
                      submit()
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>

          <Box m='3px' w='202px'>
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

          <Box m='3px' mr='8px'>
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
                    ranges={dateRange}
                  />

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

        <Box hidden={filtermobile2 ? false : true}>
          <Tabs>
            <TabList>
              <Tab py='15px' onClick={() => {
                async function submit() {
                  setStatusTransaction(``)
                  setPage(1)
                }
                submit()
              }}>
                <Text fontSize='sm' fontWeight='semibold'>Semua</Text>
              </Tab>
              <Tab py='15px' onClick={() => {
                async function submit() {
                  setStatusTransaction(`Menunggu Pembayaran`)
                  setPage(1)
                }
                submit()
              }}>
                <Text fontSize='sm' fontWeight='semibold'>Menunggu</Text>
              </Tab>
              <Tab py='15px' onClick={() => {
                async function submit() {
                  setStatusTransaction(`Diproses`)
                  setPage(1)
                }
                submit()
              }}>
                <Text fontSize='sm' fontWeight='semibold'>Diproses</Text>
              </Tab>
              <Tab py='15px' onClick={() => {
                async function submit() {
                  setStatusTransaction(`Dikirim`)
                  setPage(1)
                }
                submit()
              }}>
                <Text fontSize='sm' fontWeight='semibold'>Dikirim</Text>
              </Tab>
              <Tab py='15px' onClick={() => {
                async function submit() {
                  setStatusTransaction(`Pesanan Dikonfirmasi`)
                  setPage(1)
                }
                submit()
              }}>
                <Text fontSize='sm' fontWeight='semibold'>Selesai</Text>
              </Tab>
              <Tab py='15px' onClick={() => {
                async function submit() {
                  setStatusTransaction(`Dibatalkan`)
                  setPage(1)
                }
                submit()
              }}>
                <Text fontSize='sm' fontWeight='semibold'>Dibatalkan</Text>
              </Tab>
              <Tab py='15px' onClick={() => {
                async function submit() {
                  setStatusTransaction(`Resep Dokter`)
                  setPage(1)
                }
                submit()
              }}>
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

        {transactionFetch ?
          <>
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
          </>
          :
          <Text mt='10px' fontWeight='semibold'>
            Anda belum melakukan transaksi
          </Text>
        }

      </Box >
    </>
  )
}