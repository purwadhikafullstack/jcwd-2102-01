import {
  Box, Text, Avatar, Link, AvatarBadge, Flex, Input, Select, InputLeftElement, InputGroup,
  Modal, ModalCloseButton, Icon, Tooltip, ModalOverlay, ModalHeader, ModalBody, useDisclosure,
  FormControl, Button, useToast, FormHelperText, ModalContent, Center, useMediaQuery,
  Divider, Tabs, TabList, TabPanel, TabPanels, Tab, InputRightElement, Drawer, DrawerBody, DrawerHeader, DrawerCloseButton, DrawerContent, DrawerOverlay
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
import * as Yup from "yup";
import qs from 'qs';
import TransactionCard from './TransactionCard';

export default function TransactionList() {
  const { isOpen: isOpenStatus, onOpen: onOpenStatus, onClose: onCloseStatus } = useDisclosure()
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure()
  const { isOpen: isOpenAlamat, onOpen: onOpenAlamat, onClose: onCloseAlamat } = useDisclosure()
  const { isOpen: isOpenChangePass, onOpen: onOpenChangePass, onClose: onCloseChangePass } = useDisclosure()
  const { isOpen: isOpenEditProf, onOpen: onOpenEditProf, onClose: onCloseEditProf } = useDisclosure()
  const [filtermobile] = useMediaQuery('(min-width: 1059px)')
  const [filtermobile2] = useMediaQuery('(min-width: 565px)')
  const [transactionFetch, setTransactionFetch] = useState([])
  const [transactionLength, setTransactionLength] = useState()
  const userSelector = useSelector((state) => (state.auth))
  const autoRender = useSelector((state) => state.automateRendering)
  const toast = useToast();
  const dispatch = useDispatch()
  const router = useRouter();
  const image = userSelector.image_url;

  let todayYear = new Date().getFullYear()
  let minYear = todayYear - 100;
  let maxYear = todayYear - 10

  const formik = useFormik({
    initialValues: {
      first_name: `${userSelector.first_name}`,
      last_name: `${userSelector.last_name}`,
      username: `${userSelector.username}`,
      email: `${userSelector.email}`,
      birthdate: `${userSelector.birthdate}`,
      gender: `${userSelector.gender}`,
      // phone_no: `${userSelector.phone_no}`,
      id: userSelector.id,
    },
    validationSchema: Yup.object().shape({
      // username: Yup.string().required("Username is required"),
      first_name: Yup.string().required("Nama wajib diisi").min(3, 'Nama anda terlalu pendek!').
        max(50, 'Nama tidak boleh lebih dari 50 karakter').
        matches(/^[aA-zZ\s]+$/, "hanya boleh diisi huruf").trim(),
      last_name: Yup.string().required("Nama wajib diisi").min(3, 'Nama anda terlalu pendek!').
        max(50, 'Nama tidak boleh lebih dari 50 karakter').
        matches(/^[aA-zZ\s]+$/, "hanya boleh diisi huruf").trim(),
      birthdate: Yup.date().required("tanggal wajib diisi").
        max(`${maxYear}-12-12`, `Tanggal lahir tidak bisa lewat dari tahun ${maxYear}`).
        min(`${minYear}-01-01`, `Tanggal lahir tidak bisa dibawah dari tahun ${minYear}`),
      email: Yup.string().required("email wajib diisi").email('Format harus email')
    }),
    validateOnChange: false,
    onSubmit: async () => {
      // dispatch(userEdit(values, formik.setSubmitting))
      const { first_name, last_name, email, birthdate, gender, phone_no } = formik.values

      let msg = ""
      try {
        let body = {
          first_name: first_name,
          last_name: last_name,
          // username: username,
          email: email,
          birthdate: birthdate,
          gender: gender,
          // phone_no: phone_no,
        };
        const res = await axiosInstance.patch(`/user/edit/${userSelector.id}`, qs.stringify(body));

        // msg = res.data.message
        // console.log(res.data.message);
        // console.log(res.data.user);
        // dispatch({
        //   type: "AUTH_LOGIN",
        //   payload: res.data.user
        // })
        dispatch({
          type: "FETCH_RENDER",
          payload: { value: !autoRender.value }
        })
        toast({
          title: "Berhasil mengedit user profil",
          status: "success",
          isClosable: true,
        })
      } catch (err) {
        console.log(err);
        toast({
          title: "maaf email sudah dipakai pengguna lain",
          status: "error",
          isClosable: true,
        })
      }
      formik.setSubmitting(false);
    }
  })

  // ---------- Fetching Transaction ---------- //
  async function fetchTransaction() {
    try {
      // axiosInstance.get(`/ comment / post / ${ id } ? page = ${ startComment } & limit=${ 5}`)
      axiosInstance.post(`/transaction/api/v1/Trasanction/User/${userSelector.id}?page=1&limit=15&search=&startDate=&endDate=&status=&sort=&orderby=`)
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
  useEffect(() => {
    fetchTransaction()
    // console.log(addressLength)
  }, [autoRender]);

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
            {/* {formik.values.searchName} */}
            <FormControl isInvalid={formik.errors.searchName}>
              <InputGroup size='sm' >
                <Input placeholder="Cari Nama Produk" type='text' bg='white' borderRadius='8px'
                  onChange={(event) => formik.setFieldValue("searchName", event.target.value)} />
                <InputRightElement>
                  <Icon
                    fontSize="xl"
                    as={BiSearchAlt}
                    sx={{ _hover: { cursor: "pointer" } }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>

          <Box m='3px' w='170px'>
            {formik.values.sortByProduct}
            <FormControl isInvalid={formik.errors.sortByProduct}>
              <Select size='sm' borderRadius='8px'
              // onChange={(event) => {
              //   fetchProduct(event.target.value)
              // }}
              >
                <option value='' color='grey'>Urut Berdasarkan</option>
                <option value='no_invoice'>No Invoice</option>
                <option value='createdAt'>Tanggal Transaksi</option>
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
            {formik.values.sortByProduct}
            <FormControl isInvalid={formik.errors.sortByProduct}>
              <Select size='sm' borderRadius='8px'
              // onChange={(event) => {
              //   fetchProduct(event.target.value)
              // }}
              >
                <option value='' color='grey'>Urut Berdasarkan</option>
                <option value='no_invoice'>No Invoice</option>
                <option value='createdAt'>Tanggal Transaksi</option>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box hidden={filtermobile2 ? false : true}>
          <Tabs>
            <TabList>
              <Tab py='15px'><Text fontSize='sm' fontWeight='semibold'>Semua</Text></Tab>
              <Tab py='15px'><Text fontSize='sm' fontWeight='semibold'>Menunggu</Text></Tab>
              <Tab py='15px'><Text fontSize='sm' fontWeight='semibold'>Diproses</Text></Tab>
              <Tab py='15px'><Text fontSize='sm' fontWeight='semibold'>Dikirim</Text></Tab>
              <Tab py='15px'><Text fontSize='sm' fontWeight='semibold'>Selesai</Text></Tab>
              <Tab py='15px'><Text fontSize='sm' fontWeight='semibold'>Dibatalkan</Text></Tab>
            </TabList>
          </Tabs>
        </Box>

        <Box my='15px'>
          {renderTransaction()}
        </Box>

        Test
      </Box >
    </>
  )
}