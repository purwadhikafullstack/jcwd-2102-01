import {
  Flex, Box, Text, Button, InputGroup, InputLeftElement, Icon, Modal, ModalCloseButton, ModalContent,
  ModalOverlay, ModalHeader, ModalBody, useDisclosure, FormControl, FormLabel, FormHelperText,
  InputRightElement, Input, Tooltip, Divider, Select
} from '@chakra-ui/react';
import Footer from '../../../components/footer/Footer';
import { BiPlusMedical } from "react-icons/bi";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import Metatag from '../../../components/metatag/Metatag';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useFormik } from "formik";
import { axiosInstance } from '../../../lib/api';
import MaddAddress from '../../profilesetting/maddressadd/maddaddress';
import ShowAddress from '../../profilesetting/ShowAddress';
import ShowDefaultAddress from '../../profilesetting/ShowDefAddress';
import ProductCartList from '../CartTransactions/ProductCartList';
import axios from 'axios';
import qs from 'qs';
import * as Yup from "yup";

export default function OrderTrasanctions() {
  const userSelector = useSelector((state) => state.auth);
  const autoRender = useSelector((state) => state.automateRendering)
  const dispatch = useDispatch();
  const router = useRouter();
  const [couriers, setCouriers] = useState([])
  const [cart, setCart] = useState([])
  const [cartLength, setCartLength] = useState([])
  const [idUnit, setIdUnit] = useState()
  const [cartSubTotal, setCartSubTotal] = useState(0)
  const [cartWeight, setCartWeight] = useState(0)
  const [addressFetch, setAddressFetch] = useState([])
  const [addressFetchById, setAddressFetchById] = useState([])
  const [getCityId, setGetCityId] = useState()
  const [addressLength, setAddressLength] = useState()
  const [costRajaOngkir, setCostRajaOngkir] = useState([])
  const [totalSeluruh, setTotalSeluruh] = useState()
  const { isOpen: isOpenAlamat, onOpen: onOpenAlamat, onClose: onCloseAlamat } = useDisclosure()
  const { isOpen: isOpenPayment, onOpen: onOpenPayment, onClose: onClosePayment } = useDisclosure()
  const { isOpen: isOpenChangeAddress, onOpen: onOpenChangeAddress, onClose: onCloseChangeAddress } = useDisclosure()

  // ---------- Fetching Address by User ---------- //
  async function fetchAddress() {
    try {
      // axiosInstance.get(`/ comment / post / ${ id } ? page = ${ startComment } & limit=${ 5}`)
      axiosInstance.get(`address/user/` + userSelector.id)
        .then((res) => {
          setAddressFetch(res.data.result)
          const temp = res.data.result
          setAddressLength(temp.length)
          // console.log(temp)
          // console.log('address length' + temp.length)
        })
    } catch (err) {
      console.log(err)
    }
  };
  const renderAddress = () => {
    return addressFetch.map((val, index) => {
      return (
        <ShowAddress key={index}
          idalamat={val.id}
          namaPenerima={val.receiver_name}
          phonePenerima={val.receiver_phone}
          alamat={val.address}
          provinsi={val.province}
          provinsiId={val.province_id}
          city={val.city_name}
          city_id={val.city_id}
          kecamatan={val.districts}
          postalCode={val.postal_code}
          defaultAddress={val.User?.default_address}
        />
      )
    })
  }

  // ---------- Fetching Address by id Address ---------- //
  async function fetchAddressbyId() {
    try {
      axiosInstance.get(`address/addressid/` + userSelector.default_address)
        .then((res) => {
          setAddressFetchById(res.data.result)
          setGetCityId(res.data.result[0]?.city_id)
          const temp = res.data.result
          console.log(res.data.result[0]?.city_id)
          console.log(getCityId)
          // console.log('address length' + temp.length)
        })
    } catch (err) {
      console.log(err)
    }
  };
  const renderAddressById = () => {
    return addressFetchById.map((val, index) => {
      return (
        <ShowDefaultAddress key={index}
          idalamat={val.id}
          namaPenerima={val.receiver_name}
          phonePenerima={val.receiver_phone}
          alamat={val.address}
          provinsi={val.province}
          provinsiId={val.province_id}
          city={val.city_name}
          city_id={val.city_id}
          kecamatan={val.districts}
          postalCode={val.postal_code}
          defaultAddress={val.User?.default_address}
        />
      )
    })
  }

  // --------------- Fetching Cart --------------- //
  async function fetchCart() {
    try {
      axiosInstance.get(`/transaction/api/v1/Carts/${userSelector.id}`)
        .then((res) => {
          setCart(res.data.result)
          setCartLength(res.data.result.length)

          // console.log(res.data.result[1].Product.Product_stocks[0].Unit.unit_name);
        })
    } catch (err) {
      console.log(err)
    }
  };

  // ---------- ambil data subtotal dan total berat produk ---------- //
  let subTotal = 0;
  let totalWeight = 0;

  useEffect(() => {
    // alert(a)
    setTotalSeluruh(parseFloat(subTotal) + parseFloat(formik.values.service))
    setCartWeight(totalWeight)
    setCartSubTotal(subTotal);
  }, [cart])

  // ---------- Render cart list ---------- //
  const renderCartList = () => {
    return cart.map((val, index) => {
      subTotal += val.total_price;
      totalWeight += (val.buy_quantity * val.Product.Product_description.weight)
      // console.log(subTotal)
      // console.log(totalWeight)
      return (
        <>
          <ProductCartList key={index}
            image={val.Product.Product_images[0].image_url}
            productName={val.Product.product_name}
            qtyBuy={val.buy_quantity}
            price={val.price}
            totalPrice={val.total_price}
            idCart={val.id}
            firstPrice={val.Product.Product_stocks[0].first_price}
            unit={val.Product.Product_stocks[0].Unit.unit_name}
            idUnit={val.Product.Product_stocks[0].Unit.id}
            idProduct={val.Product.id}
            productCode={val.Product.product_code}
            idUser={val.id_user}
          />
        </>
      )
    }
    )
  }

  // --------------- Fetching courier --------------- //
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

  // ---------- Fetching Cost Raja Ongkir ---------- //
  async function fetchCostRajaOngkir() {
    try {
      if (getCityId && cartWeight && formik.values.courier) {
        const res = await axios.post('https://api.rajaongkir.com/starter/cost',
          { "origin": "455", "destination": `${getCityId}`, "weight": `${cartWeight}`, "courier": `${formik.values.courier}` },
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

  // --------------- Simpan data ke Transaction --------------- //
  const formik = useFormik({
    initialValues: {
      courier: "",
      service: "",
    },
    validationSchema: Yup.object().shape({
      courier: Yup.string().required("Pilih Kurir"),
      service: Yup.string().required("Wajib pilih Service")
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { courier, service } = formik.values
      try {
        let body = {
          total_transaction: cartSubTotal,
          courier: courier,
          shipping_cost: service,
          total_paid: totalSeluruh,
          cancel_description: "",
          transaction_status: "Menunggu Pembayaran",
          id_address: userSelector.default_address,
          id_upload_recipe: "1",
          id_payment: "1"
        }
        let newTransaction = await axiosInstance.post("/transaction/api/v1/Trasanction/" + userSelector.id, qs.stringify(body))
        let noInvoice = newTransaction.data.result[0].no_invoice
        console.log(newTransaction.data.result);
        console.log(newTransaction.data.result[0].no_invoice);

        router.push('/transactions/alltransactions')
        dispatch({
          type: "FETCH_RENDER",
          payload: { value: !autoRender.value }
        })
      } catch (err) {
        console.log(err);
      }
      formik.setSubmitting(false)
    }
  });

  useEffect(() => {
    fetchCart()
    fetchAddress()
    fetchAddressbyId()
    fetchCouriers()
    fetchCostRajaOngkir()
    // console.log(costRajaOngkir);
  }, [router.isReady]);

  useEffect(() => {
    fetchCart()
    fetchAddress()
    fetchAddressbyId()
    fetchCostRajaOngkir()
  }, [autoRender]);

  useEffect(() => {
    fetchAddress()
    fetchAddressbyId()
    fetchCostRajaOngkir()
    formik.values.service = ''
    formik.values.courier = ''
  }, [userSelector.default_address]);

  useEffect(() => {
    fetchCostRajaOngkir()
    formik.values.service = ''
  }, [formik.values.courier]);

  useEffect(() => {
    setTotalSeluruh(parseFloat(subTotal) + parseFloat(formik.values.service))
  }, [formik.values.service]);

  return (
    <Box>
      <Box display='flex' justifyContent='center' flexWrap={'wrap'}>

        {/* -------------------- Address -------------------- */}
        <Box minW='370px' w={'55vw'} mx='15px' my='10px' p='20px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
          <Box display='flex' mb='5px' >
            <Text alignSelf='center' fontWeight='bold'>Alamat Pengiriman</Text>
            <Button colorScheme='twitter' size='xs' ml='5px' onClick={onOpenChangeAddress}>Ganti</Button>
            <Modal isOpen={isOpenChangeAddress} onClose={onCloseChangeAddress} size='md'>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Ganti alamat pengiriman</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  {renderAddress()}
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
          {userSelector.default_address ? renderAddressById() :
            <Text fontWeight='semibold' fontSize='sm'>Maaf anda belum memiliki Alamat utama silahkan pilih / tekan tombol ganti</Text>}

          {/* ----- tambah address baru ----- */}
          <Box mt='5px'>
            <Button variant='link' style={{ textDecoration: 'none' }} disabled={addressLength == 3 ? true : false} colorScheme='twitter' mr='5px' my='5px' size='sm' onClick={onOpenAlamat}>
              <Icon boxSize={4} as={BiPlusMedical} />
              <Text ml='5px' alignSelf='center' fontWeight='semibold' fontSize='sm'>
                Tambah Alamat Baru
              </Text>
            </Button>
            <Modal isOpen={isOpenAlamat} onClose={onCloseAlamat} size='md'>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Tambah alamat pengiriman</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <MaddAddress onClose={onCloseAlamat} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
          {/* ----- Pilih kurir ----- */}
          <Box mt='5px'>
            <Text alignSelf='center' fontWeight='semibold' fontSize='sm' mb='5px'>
              Berat Paket: {cartWeight.toLocaleString()} gram
            </Text>
          </Box>
          {/* ----- Pilih kurir ----- */}
          <Box mt='5px'>
            <Text alignSelf='center' fontWeight='semibold' fontSize='sm' mb='5px'>
              Pilih Kurir :
            </Text>
            <FormControl isInvalid={formik.errors.courier} marginTop={"10px"}>
              {formik.values.courier}
              <Select onChange={(event) => formik.setFieldValue("courier", event.target.value)}>
                <option value="">- Pilih Kurir -</option>
                {renderCouriers()}
              </Select>
              <FormHelperText color="red">
                {formik.errors.courier}
              </FormHelperText>
            </FormControl>
          </Box>
          {/* ----- Pilih Service ----- */}
          <Box mt='10px'>
            <Text alignSelf='center' fontWeight='semibold' fontSize='sm' mb='5px'>
              Pilih Service :
            </Text>
            {formik.values.service}
            <FormControl isInvalid={formik.errors.service} marginTop={"10px"}>
              <Select onChange={(event) => formik.setFieldValue("service", event.target.value)}>
                {/* {formik.values.service == '' ? <option value="">- Pilih Service -</option>
                  : <>
                  {renderCostRajaOngkir()}
                  </>
                } */}
                <option value="">- Pilih Service -</option>

                {formik.values.courier ? renderCostRajaOngkir() : null}
              </Select>
              <FormHelperText color="red">
                {formik.errors.service}
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>

        {/* -------------------- Total Order -------------------- */}
        <Box h='295px' p='25px' minW='370px' w={'22vw'} mx='15px' mt='10px' mb='20px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
          <Text fontWeight='bold' fontSize='lg'>
            Total
          </Text>
          <Box display='flex' mt='20px' justifyContent='space-between' >
            <Text fontWeight='semibold'>
              Sub Total Belanja
            </Text>
            <Text fontWeight='semibold'>
              Rp {cartSubTotal.toLocaleString()}
            </Text>
          </Box>
          <Box display='flex' mt='10px' justifyContent='space-between' >
            <Text fontWeight='semibold'>
              Biaya Pengiriman
            </Text>
            <Text fontWeight='semibold'>
              Rp {formik.values.service ? formik.values.service.toLocaleString() : 0}
            </Text>
          </Box>
          <Divider my='20px' />
          <Box display='flex' mt='20px' justifyContent='space-between' >
            <Text fontWeight='bold'>
              Total Belanja
            </Text>
            <Text fontWeight='bold'>
              Rp {totalSeluruh ? totalSeluruh.toLocaleString() : cartSubTotal.toLocaleString()}
            </Text>
          </Box>
          <Button variant='link' onClick={onOpenPayment}>
            <Text fontWeight='semibold' color='#213360' mb='5px' mt='15px' fontSize='sm' >
              Metode pembayaran
            </Text>
          </Button>
          <Modal isOpen={isOpenPayment} onClose={onClosePayment} size='md'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Payment Method</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text fontWeight='semibold'>Untuk Saat ini pembayaran hanya bisa melalui transfer bank BCA.</Text>
                <Text fontWeight='semibold'>REK BCA: 80777082261130123 </Text>
                <Text fontWeight='semibold'>PT. HEALTHYMED INDONESIA </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Box display='flex' justifyContent='flex-end' >
            <Button w='full' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px'
              _hover={{ bg: '#009B90', color: 'white' }} disabled={userSelector.id ? false : true}
              onClick={() => {
                async function submit() {
                  formik.handleSubmit();
                }
                submit()
              }}>
              Bayar
            </Button>
          </Box>
        </Box>

        {/* -------------------- Cart List -------------------- */}
        <Box minW='370px' w={'55vw'} mx='15px' my='10px' p='25px' px='20px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
          {renderCartList()}
        </Box>

        <Box h='250px' p='25px' minW='370px' w={'22vw'} mx='15px' mt='10px' mb='20px' justifyContent={'center'} >
        </Box>
      </Box>
    </Box>
  )
}