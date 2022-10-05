import {
  Box, Text, Flex, Input, Select, InputGroup, Modal, ModalCloseButton, Icon, InputRightElement, ModalOverlay, ModalHeader, ModalBody,
  useDisclosure, ModalFooter, FormControl, Button, useToast, FormHelperText, ModalContent, Image, TableContainer,
  Table, Thead, Tr, Th, Td, Tbody, Tfoot, Tabs, TabList, Tab, TabPanels, TabPanel
} from '@chakra-ui/react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { axiosInstance } from '../../../lib/api';
import AdmMdetailTransaction from './AdmMdetailTransaction';
import * as Yup from "yup";
import qs from 'qs';
import ModalAddProduct from './serveOrderModal/ModalAddProduct';
import ModalAddProductRacik from './serveOrderModal/ModalAddProductRacik';
import ModalEditProductList from './serveOrderModal/ModalEditProductList';
import axios from 'axios';

export default function ServeOrder(props) {
  const { transactionId, noInvoice, recipeImage, dateCreated, status, totalOrderList, grandTotal, buyer, reciever, recieverPhoneNo, address,
    province, city, cityId, district, postalCode, productList, note, userId, productId } = props
  const { isOpen: isOpenServe, onOpen: onOpenServe, onClose: onCloseServe } = useDisclosure()
  const { isOpen: isOpenServeOk, onOpen: onOpenServeOk, onClose: onCloseServeOk } = useDisclosure()
  const autoRender = useSelector((state) => state.automateRendering)
  const dispatch = useDispatch()
  const router = useRouter();
  const toast = useToast();
  const [product, setProduct] = useState([])

  // --------------- for Filtering --------------- //
  const [pageStart, setPageStart] = useState(1)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)
  const [searchProduct, setSearchProduct] = useState('')
  const [totalProduct, setTotalProduct] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [costRajaOngkir, setCostRajaOngkir] = useState([])
  const [couriers, setCouriers] = useState([])
  const [totalSeluruh, setTotalSeluruh] = useState()
  const [weight, setWeight] = useState(0)

  // -------------------- filter name and code product -------------------- //
  const formik = useFormik({
    initialValues: {
      searchName: ``,
    },
    validationSchema: Yup.object().shape({
      searchName: Yup.string()
        .min(3, 'Minimal 3 huruf')
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { searchName } = formik.values;
      setSearchProduct(searchName)
      setPage(1)
    }
  })

  // -------------------- filter name and code product -------------------- //
  const formikPrescription = useFormik({
    initialValues: {
      namaRacikan: ``,
    },
  })

  // -------------------- Transaction will be process -------------------- //
  const confirmTransaction = async () => {
    try {
      if (formik.values.courier && formik.values.service) {
        let body = {
          transaction_status: status,
          courier: `${formik.values.courier}`,
          shipping_cost: formik.values.service,
          total_paid: totalSeluruh
        }
        await axiosInstance.patch("/transaction/api/v1/invoice/" + noInvoice, qs.stringify(body))
        dispatch({
          type: "FETCH_RENDER",
          payload: { value: !autoRender.value }
        })
        toast({
          title: "Succes",
          description: "Sukses menyiapkan Pesanan",
          status: "success",
          isClosable: true,
        })
        onCloseServeOk()
      } else {
        toast({
          title: "Gagal",
          description: "Harap memilih kurir dan service terlebih dahulu",
          status: "error",
          isClosable: true,
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  let totalWeight = 0;

  useEffect(() => {
    setTotalSeluruh(parseFloat(totalOrderList) + parseFloat(formik.values.service))
    setWeight(totalWeight)
  }, [productList])

  // -------------------- render Transaction List -------------------- //
  // const renderTransactionList = () => {
  //   return productList.map((val, index) => {
  //     totalWeight += (val.buy_quantity * val.Product?.Product_description?.weight)
  //     return (
  //       <Tr _hover={{ background: '#c7fcfc' }} key={index}>
  //         <Td>
  //           <ModalEditProductList
  //             transactionId={val.id_transaction}
  //             orderListId={val.id}
  //             productName={val.Product?.product_name}
  //             totalPrice={val.total_price}
  //             price={val.price}
  //             buyQuantity={val.buy_quantity}
  //             stokProduk={val.Product?.Product_stocks[0]?.id_unit == val.Unit?.id ? val.Product?.Product_stocks[0]?.stock : val.Product?.Product_stocks[1]?.stock}
  //             unitName={val.Unit?.unit_name}
  //           />
  //         </Td>
  //         <Td>{val.Product?.product_name.substring(0, 30)}{!val.Product?.product_name ? null : val.Product?.product_name.length >= 32 ? '...' : null}</Td>
  //         <Td textAlign='right'>Rp {val.price?.toLocaleString()}</Td>
  //         <Td textAlign='right'>{val.buy_quantity?.toLocaleString()} {val.Unit?.unit_name}</Td>
  //         <Td textAlign='right'>Rp {val.total_price?.toLocaleString()}</Td>
  //       </Tr>
  //     )
  //   })
  // }

  // -------------------- pengecekkan NamaRacikan untuk di filter versi maping -------------------- //
  let temp = productList.map(function (x) { return x.medicine_concoction_name })
  let cekNamaRacikan = new Set(temp);
  let filterNamaRacikan = [...cekNamaRacikan];
  // console.log(filterNamaRacikan);
  // console.log(productList);

  const renderTransactionList2 = () => {
    return filterNamaRacikan.map((x, index) => {
      return (
        <>
          <Text key={index} fontSize='md' fontWeight='bold'>
            {x == '' ? 'Umum' : 'Racikan ' + x}
          </Text>
          <TableContainer borderTopRadius='6px' mb='8px'>
            <Table size='sm' >
              <Thead bg='#213360' color='white' fontWeight='bold' >
                <Tr>
                  <Th textAlign='center' color='white'>Act</Th>
                  <Th maxW='150px' color='white' textAlign='center'>Nama Produk</Th>
                  <Th textAlign='center' color='white'>Harga</Th>
                  <Th textAlign='center' color='white' maxW='140px'>Qty</Th>
                  <Th textAlign='center' color='white'>Total Harga</Th>
                </Tr>
              </Thead>
              <Tbody fontWeight='semibold'>
                {productList.map((val, index) => {
                  totalWeight += (val.buy_quantity * val.Product?.Product_description?.weight)
                  if (val.medicine_concoction_name == x) {
                    return (

                      <Tr _hover={{ background: '#c7fcfc' }} key={index}>
                        <Td>
                          <ModalEditProductList
                            transactionId={val.id_transaction}
                            orderListId={val.id}
                            productName={val.Product?.product_name}
                            totalPrice={val.total_price}
                            price={val.price}
                            buyQuantity={val.buy_quantity}
                            stokProduk={val.Product?.Product_stocks[0]?.id_unit == val.Unit?.id ? val.Product?.Product_stocks[0]?.stock : val.Product?.Product_stocks[1]?.stock}
                            unitName={val.Unit?.unit_name}
                          />
                        </Td>
                        <Td>{val.Product?.product_name.substring(0, 30)}{!val.Product?.product_name ? null : val.Product?.product_name.length >= 32 ? '...' : null}</Td>
                        <Td textAlign='right'>Rp {val.price?.toLocaleString()}</Td>
                        <Td textAlign='right'>{val.buy_quantity?.toLocaleString()} {val.Unit?.unit_name}</Td>
                        <Td textAlign='right'>Rp {val.total_price?.toLocaleString()}</Td>
                      </Tr>
                    )
                  } else { null }
                })}
                {/* {renderTransactionList()} */}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )
    })
  }

  // -------------------- Fetching Product -------------------- //
  async function fetchProduct() {
    try {
      axiosInstance.get(`/products/api/v1/products/admin?search=${searchProduct}&limit=100000&page=1`)
        .then((res) => {
          const temp = res.data.result
          setTotalProduct(temp.length) // total prod keseluruhan
          setTotalPage(Math.ceil(temp.length / limit))
        })

      axiosInstance.get(`/products/api/v1/products/admin?search=${searchProduct}&limit=${limit}&page=${page}`)
        .then((res) => {
          setProduct(res.data.result)
          const temp = res.data.result
          console.log(res.data.result)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderProduct = () => {
    return product.map((val, index) => {
      return (
        <Tr _hover={{ background: '#c7fcfc' }} key={index}>
          <Td textAlign='left'>
            <ModalAddProduct
              weight={val.Product?.Product_description?.weight}
              stock={val.stock}
              unit={val.Unit?.unit_name}
              price={val.selling_price}
              unitId={val.Unit?.id}
              userId={userId}
              transactionId={transactionId}
              productName={val.Product?.product_name}
              productId={val.Product?.id}
              converted={val.converted}
            />
          </Td>
          <Td textAlign='left'>{val.Product?.product_code}</Td>
          <Td textAlign='left'>{val.Product?.product_name.substring(0, 30)}{!val.Product?.product_name ? null : val.Product?.product_name.length >= 32 ? '...' : null}</Td>
          <Td textAlign='right'>{val.Product?.Product_description?.weight} gram</Td>
          <Td textAlign='right'>{val.stock} {val.Unit?.unit_name}</Td>
          <Td textAlign='right'>Rp {val.selling_price?.toLocaleString()}</Td>
        </Tr>
      )
    })
  }

  // -------------------- Render for combine Prescription -------------------- //
  const renderProductRacik = () => {
    return product.map((val, index) => {
      return (
        <Tr _hover={{ background: '#c7fcfc' }} key={index}>
          <Td textAlign='left'>
            <ModalAddProductRacik
              weight={val.Product?.Product_description?.weight}
              stock={val.stock}
              unit={val.Unit?.unit_name}
              price={val.selling_price}
              unitId={val.Unit?.id}
              userId={userId}
              transactionId={transactionId}
              productName={val.Product?.product_name}
              productId={val.Product?.id}
              converted={val.converted}
              concoctionName={formikPrescription.values.namaRacikan}
            />
          </Td>
          <Td textAlign='left'>{val.Product?.product_code}</Td>
          <Td textAlign='left'>{val.Product?.product_name.substring(0, 30)}{!val.Product?.product_name ? null : val.Product?.product_name.length >= 32 ? '...' : null}</Td>
          <Td textAlign='right'>{val.Product?.Product_description?.weight} gram</Td>
          <Td textAlign='right'>{val.stock} {val.Unit?.unit_name}</Td>
          <Td textAlign='right'>Rp {val.selling_price?.toLocaleString()}</Td>
        </Tr>
      )
    })
  }

  // -------------------- Fetching courier -------------------- //
  async function fetchCouriers() {
    try {
      axiosInstance.get(`/transaction/api/v1/Couriers`)
        .then((res) => {
          setCouriers(res.data.result)
          // console.log(res.data.result);
        })
    } catch (err) {
      console.log(err)
    }
  };
  const renderCouriers = () => {
    return couriers.map((val, index) => {
      return (
        <option key={index} value={val.courier_code}> {val.courier}</option>
      )
    })
  }

  // -------------------- Fetching Cost Raja Ongkir -------------------- //
  async function fetchCostRajaOngkir() {
    try {
      if (cityId && weight && formik.values.courier) {
        const res = await axios.post('https://api.rajaongkir.com/starter/cost',
          { "origin": "455", "destination": `${cityId}}`, "weight": `${weight}`, "courier": `${formik.values.courier}` },
          {
            headers: { 'key': '461415f8b280e7996178dd23957c633e' },
          })
        setCostRajaOngkir(res.data.rajaongkir.results[0].costs)
        // console.log(res)
        // console.log(res.data.rajaongkir.results[0].costs)
      } else { null }

    } catch (err) {
      console.log(err)
    }
  };

  const renderCostRajaOngkir = () => {
    return costRajaOngkir.map((val, index) => {
      return (
        <option key={index} value={val.cost[0].value}>{val.service} &nbsp; ={'>'}  &nbsp; Estimasi pengiriman :&nbsp;
          {val.service == 'ECO' || val.service == 'REG' || val.service == 'ONS' || val.service == 'CTC' || val.service == 'OKE' ? val.cost[0].etd + ' HARI'
            : val.service == 'CTCYES' ? '1 HARI' : val.cost[0].etd}</option>
      )
    })
  }

  useEffect(() => {
    fetchProduct()
    fetchCouriers()
    fetchCostRajaOngkir()
  }, [router.isReady]);

  useEffect(() => {
    fetchProduct()
    fetchCostRajaOngkir()
  }, [page, searchProduct, autoRender, formik.values.courier]);

  useEffect(() => {
    setTotalSeluruh(parseFloat(totalOrderList) + parseFloat(formik.values.service))
  }, [formik.values.service]);
  return (
    <>
      <Button onClick={onOpenServe} size='sm' borderRadius='8px' bg='#009B90' mr='10px'
        _hover={{ background: '#02d1c2' }}>
        <Text mx='10px' fontWeight='bold' color='white'>
          Siapkan Pesanan
        </Text>
      </Button>

      {/* ----- Serve Custom Order-----  */}
      <Modal isOpen={isOpenServe} onClose={onCloseServe} size='4xl'>
        <ModalOverlay />
        <ModalContent borderRadius='10px'>
          <ModalHeader bg='#009B90' color='white' borderTopRadius='10px'>Proses Pesanan</ModalHeader>
          <ModalCloseButton color='white' size='lg' />
          <ModalBody pb={6}>
            <Flex flexWrap='wrap' justifyContent='center'>
              <Box minW='300px' maxW='350px' maxH='400px' mr='10px' mb='10px'>
                <Image mr='20px' objectFit='contain' src={`http://${recipeImage}`} width='350px' height='400px' />
              </Box >
              <Box minW='350px' mr='10px' mb='10px'>
                <Box display='flex' fontSize='sm'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Tanggal
                  </Text>:
                  <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
                    {moment(dateCreated).format('DD MMMM YYYY ')}
                  </Text>
                </Box>
                <Box display='flex' fontSize='sm'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Nama Pembeli
                  </Text>:
                  <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
                    {buyer}
                  </Text>
                </Box>
                <Box display='flex' fontSize='sm'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Nama Penerima
                  </Text>:
                  <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
                    {reciever} / {recieverPhoneNo}
                  </Text>
                </Box>
                <Box display='flex' fontSize='sm'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Alamat Penerima
                  </Text>:
                  <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
                    {address}, Prov. {province}, Kec. {district}, Kota/Kab. {city}. {postalCode}
                  </Text>
                </Box>
                <Box display='flex' fontSize='sm'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Catatan
                  </Text>:
                  <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
                    {note}
                  </Text>
                </Box>
                <Box display='flex' fontSize='sm'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Ringkasan Pesanan
                  </Text>:
                </Box>

                {/* ----- Table Ringkasan Pesanan ver2 racikan ----- */}
                <Box mt='5px' maxH='250px' maxW='460px' overflow='scroll' >
                  {renderTransactionList2()}
                </Box>
                {/* ----- Table Ringkasan Pesanan ver1 normal ----- */}
                {/* <Box mt='5px' maxH='200px' maxW='460px' overflow='scroll' >
                  <TableContainer borderTopRadius='6px'>
                    <Table size='sm' >
                      <Thead bg='#213360' color='white' fontWeight='bold' >
                        <Tr>
                          <Th textAlign='center' color='white'>Act</Th>
                          <Th maxW='150px' color='white' textAlign='center'>Nama Produk</Th>
                          <Th textAlign='center' color='white'>Harga</Th>
                          <Th textAlign='center' color='white' maxW='140px'>Qty</Th>
                          <Th textAlign='center' color='white'>Total Harga</Th>
                        </Tr>
                      </Thead>
                      <Tbody fontWeight='semibold'>
                        {renderTransactionList()}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box> */}

                <Box display='flex' fontSize='sm' justifyContent='space-between'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Total Keseluruhan :
                  </Text>
                  <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
                    Rp {totalOrderList?.toLocaleString()}
                  </Text>
                </Box>
                {/* ----- Pilih Kurir ----- */}
                <Box fontSize='sm' justifyContent='space-between'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Pilih Kurir :
                  </Text>
                  <FormControl isInvalid={formik.errors.courier}>
                    {/* {formik.values.courier} */}
                    <Select size='sm' w='300px' onChange={(event) => formik.setFieldValue("courier", event.target.value)}>
                      <option value="">- Pilih Kurir -</option>
                      {renderCouriers()}
                    </Select>
                    <FormHelperText color="red">
                      {formik.errors.courier}
                    </FormHelperText>
                  </FormControl>
                </Box>
                {/* ----- Pilih Service ----- */}
                <Box fontSize='sm' justifyContent='space-between'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Pilih Service :
                  </Text>
                  {/* {formik.values.service} */}
                  <FormControl isInvalid={formik.errors.service} >
                    <Select size='sm' w='300px' onChange={(event) => formik.setFieldValue("service", event.target.value)}>
                      <option value="">- Pilih Service -</option>
                      {formik.values.courier ? renderCostRajaOngkir() : null}
                    </Select>
                    <FormHelperText color="red">
                      {formik.errors.service}
                    </FormHelperText>
                  </FormControl>
                </Box>

                <Box display='flex' fontSize='sm' justifyContent='space-between'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Biaya Pengiriman :
                  </Text>
                  <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
                    Rp {formik.values.service ? formik.values.service.toLocaleString() : 0}
                  </Text>
                </Box>
                <Box display='flex' fontSize='sm' justifyContent='space-between'>
                  <Text fontWeight='semibold' color='#213360' minW='160px'>
                    Total Keseluruhan :
                  </Text>
                  <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
                    Rp {totalSeluruh ? totalSeluruh.toLocaleString() : totalOrderList.toLocaleString()}
                  </Text>
                </Box>
              </Box>
            </Flex>

            <Tabs>
              <TabList>
                <Tab><Text fontWeight='bold'>Daftar Produk</Text></Tab>
                <Tab><Text fontWeight='bold'>Racik Obat</Text></Tab>
              </TabList>
              <TabPanels>
                {/* ---------- daftar produk ---------- */}
                <TabPanel>
                  <Box>
                    <Box display='flex' justifyContent='space-between'>
                      {/* {formik.values.searchName} */}
                      <FormControl isInvalid={formik.errors.searchName} w='200px' alignSelf='center' >
                        <InputGroup size='sm' w='200px' borderRadius='6px' alignSelf='center'>
                          <Input placeholder="Cari Nama Produk" type='text' bg='white'
                            onChange={(event) => formik.setFieldValue("searchName", event.target.value)} />
                          <InputRightElement>
                            <Icon
                              fontSize="xl"
                              as={BiSearchAlt}
                              sx={{ _hover: { cursor: "pointer" } }}
                              onClick={() => formik.handleSubmit()}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormHelperText color="red">
                          {formik.errors.searchName}
                        </FormHelperText>
                      </FormControl>

                      {/* ---------- Pagination ---------- */}
                      <Box display='flex' justifyContent='center' alignSelf='center'>
                        <Button onClick={() => setPage(page == 1 ? 1 : page - 1)} size='xs' m='3px' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px'
                          _hover={{ bg: '#009B90', color: 'white' }}>Prev</Button>
                        {/* {renderButton()} */}
                        <Input alignSelf='center' size='xs' w='50px' type='number' textAlign='center' bg='white' value={page}
                          onChange={(event) => setPage(event.target.value > totalPage ? page : event.target.value < 1 ? 1 : event.target.value)} />
                        <Text alignSelf='center' ml='5px'>of {totalPage}</Text>
                        <Button onClick={() => setPage(totalPage == page ? page : page + 1)} size='xs' m='3px' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px'
                          _hover={{ bg: '#009B90', color: 'white' }}>Next</Button>
                      </Box>
                    </Box>

                    <Box mt='5px' maxH='300px' maxW='850px' overflow='scroll' >
                      {/* ----- table transaction list */}
                      <TableContainer borderTopRadius='6px'>
                        <Table size='sm' >
                          {/* <Table size='sm' variant='striped' colorScheme='cyan'> */}
                          <Thead bg='#213360' color='white' fontWeight='bold' >
                            <Tr>
                              <Th textAlign='center' w='60px' color='white'>Act</Th>
                              <Th w='170px' color='white' textAlign='center'>Kode Produk</Th>
                              <Th w='200px' color='white' textAlign='center'>Nama Produk</Th>
                              <Th w='100px' color='white' textAlign='center'>Berat</Th>
                              <Th w='110px' textAlign='center' color='white' maxW='140px'>Stok</Th>
                              <Th w='140px' textAlign='center' color='white'>Harga</Th>
                            </Tr>
                          </Thead>
                          <Tbody fontWeight='semibold' >
                            {renderProduct()}
                          </Tbody>
                          <Tfoot bg='#213360' color='white' fontWeight='bold'>
                            <Tr>
                              <Th textAlign='center' color='white'>Act</Th>
                              <Th maxW='150px' color='white' textAlign='center'>Kode Produk</Th>
                              <Th maxW='150px' color='white' textAlign='center'>Nama Produk</Th>
                              <Th maxW='150px' color='white' textAlign='center'>Berat</Th>
                              <Th textAlign='center' color='white' maxW='140px'>Stok</Th>
                              <Th textAlign='center' color='white'>Harga</Th>
                            </Tr>
                          </Tfoot>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </TabPanel>

                {/* ---------- Racik Obat ---------- */}
                <TabPanel>
                  <Box >
                    {/* <Box display='flex'>
                      <Text fontWeight='semibold' alignSelf='center' mr='5px'>
                        Nama Obat Racikan :
                      </Text>
                      <Input size='sm' w='200px' placeholder='Nama Obat Racikan' />
                    </Box> */}
                    <Box display='flex' justifyContent='space-between' mt='10px'>
                      {/* {formikPrescription.values.namaRacikan} */}
                      <FormControl w='200px' isInvalid={formikPrescription.errors.namaRacikan}>
                        <Input size='sm' w='200px' placeholder='Nama Obat Racikan'
                          onChange={(event) => formikPrescription.setFieldValue("namaRacikan", event.target.value)} />
                        <FormHelperText color="red">
                          {formikPrescription.errors.namaRacikan}
                        </FormHelperText>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.searchName} w='200px' alignSelf='center' >
                        <InputGroup size='sm' w='200px' borderRadius='6px' alignSelf='center'>
                          <Input placeholder="Cari Nama Produk" type='text' bg='white'
                            onChange={(event) => formik.setFieldValue("searchName", event.target.value)} />
                          <InputRightElement>
                            <Icon
                              fontSize="xl"
                              as={BiSearchAlt}
                              sx={{ _hover: { cursor: "pointer" } }}
                              onClick={() => formik.handleSubmit()}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormHelperText color="red">
                          {formik.errors.searchName}
                        </FormHelperText>
                      </FormControl>

                      {/* ---------- Pagination ---------- */}
                      <Box display='flex' justifyContent='center' alignSelf='center'>
                        <Button onClick={() => setPage(page == 1 ? 1 : page - 1)} size='xs' m='3px' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px'
                          _hover={{ bg: '#009B90', color: 'white' }}>Prev</Button>
                        {/* {renderButton()} */}
                        <Input alignSelf='center' size='xs' w='50px' type='number' textAlign='center' bg='white' value={page}
                          onChange={(event) => setPage(event.target.value > totalPage ? page : event.target.value < 1 ? 1 : event.target.value)} />
                        <Text alignSelf='center' ml='5px'>of {totalPage}</Text>
                        <Button onClick={() => setPage(totalPage == page ? page : page + 1)} size='xs' m='3px' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px'
                          _hover={{ bg: '#009B90', color: 'white' }}>Next</Button>
                      </Box>
                    </Box>

                    <Box mt='5px' maxH='300px' maxW='850px' overflow='scroll' >
                      {/* ----- table transaction list */}
                      <TableContainer borderTopRadius='6px'>
                        <Table size='sm' >
                          {/* <Table size='sm' variant='striped' colorScheme='cyan'> */}
                          <Thead bg='#213360' color='white' fontWeight='bold' >
                            <Tr>
                              <Th textAlign='center' w='60px' color='white'>Act</Th>
                              <Th w='170px' color='white' textAlign='center'>Kode Produk</Th>
                              <Th w='200px' color='white' textAlign='center'>Nama Produk</Th>
                              <Th w='100px' color='white' textAlign='center'>Berat</Th>
                              <Th w='110px' textAlign='center' color='white' maxW='140px'>Stok</Th>
                              <Th w='140px' textAlign='center' color='white'>Harga</Th>
                            </Tr>
                          </Thead>
                          <Tbody fontWeight='semibold' >
                            {renderProductRacik()}
                          </Tbody>
                          <Tfoot bg='#213360' color='white' fontWeight='bold'>
                            <Tr>
                              <Th textAlign='center' color='white'>Act</Th>
                              <Th maxW='150px' color='white' textAlign='center'>Kode Produk</Th>
                              <Th maxW='150px' color='white' textAlign='center'>Nama Produk</Th>
                              <Th maxW='150px' color='white' textAlign='center'>Berat</Th>
                              <Th textAlign='center' color='white' maxW='140px'>Stok</Th>
                              <Th textAlign='center' color='white'>Harga</Th>
                            </Tr>
                          </Tfoot>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>

          </ModalBody>

          <ModalFooter pt='5px'>
            <Button mr={3} size='sm' colorScheme='red' onClick={() => onCloseServe()}>
              Batal
            </Button>
            <Button colorScheme='whatsapp' size='sm' mr={3} onClick={() => onOpenServeOk()}>
              Konfirmasi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ----- Konfirmasi Transaksi untuk diubah status menjaid menunggu pembayaran -----  */}
      <Modal isOpen={isOpenServeOk} onClose={onCloseServeOk} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi Transaksi</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>Lakukan pengecekan ulang sebelum konfirmasi transaksi</Text>
          </ModalBody>
          <ModalFooter pt='5px'>
            <Button mr={3} colorScheme='red' onClick={onCloseServeOk}>
              Batal
            </Button>
            <Button colorScheme='whatsapp' mr={3} onClick={() => {
              async function submit() {
                await confirmTransaction();
              }
              submit()
            }}>
              Konfirmasi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}