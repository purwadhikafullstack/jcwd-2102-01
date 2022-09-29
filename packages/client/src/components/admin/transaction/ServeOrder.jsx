import {
 Box, Text, Avatar, Link, FormLabel, Textarea, AvatarBadge, Flex, Input, Select, InputLeftElement, InputGroup,
 Modal, ModalCloseButton, Icon, InputRightElement, Tooltip, ModalOverlay, ModalHeader, ModalBody, useDisclosure, ModalFooter,
 FormControl, Button, useToast, FormHelperText, ModalContent, Center, useMediaQuery, Image,
 Divider, TableContainer, Table, Thead, Tr, Th, Td, Tbody, Tfoot, Drawer, DrawerBody, DrawerHeader, DrawerCloseButton, DrawerContent, DrawerOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { BiDetail } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { BiSearchAlt, BiReset } from 'react-icons/bi';
import { axiosInstance } from '../../../lib/api';
import AdmMdetailTransaction from './AdmMdetailTransaction';
// import ModalProfPicture from './mchangepicture/ModalProfPict';
import * as Yup from "yup";
import qs from 'qs';
import { RiZzzFill } from 'react-icons/ri';
// import UploadPayment from '../payment/UploadPayment';

export default function ServeOrder(props) {
 const { transactionId, noInvoice, recipeImage, dateCreated, status, totalOrderList, totalWeight, grandTotal, buyer, reciever, recieverPhoneNo, address, courier, shippingCost,
  province, city, district, postalCode, productList, note, userId, productId } = props
 const { isOpen: isOpenServe, onOpen: onOpenServe, onClose: onCloseServe } = useDisclosure()
 const { isOpen: isOpenServeOk, onOpen: onOpeSserveOk, onClose: onCloseServeOk } = useDisclosure()
 const router = useRouter();
 const [product, setProduct] = useState([])
 // --------------- for Filtering --------------- //
 const [pageStart, setPageStart] = useState(1)
 const [page, setPage] = useState(1)
 const [limit, setLimit] = useState(15)
 const [searchProduct, setSearchProduct] = useState('')
 const [totalProduct, setTotalProduct] = useState(0)
 const [totalPage, setTotalPage] = useState(0)
 // let routerQuery = router.query

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


 // --------------- Fetching Product --------------- //
 async function fetchProduct() {
  try {
   axiosInstance.get(`/products/api/v1/products/admin?search=${searchProduct}&sort=ASC&orderby=product_name&category&category2&category3&limit=100000&page=1`)
    .then((res) => {
     const temp = res.data.result
     setTotalProduct(temp.length) // total prod keseluruhan
     setTotalPage(Math.ceil(temp.length / limit))
    })

   axiosInstance.get(`/products/api/v1/products/admin?search=${searchProduct}&sort=ASC&orderby=product_name&category&category2&category3&limit=${limit}&page=${page}`)
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
     <Td textAlign='right'>
      <Button size='xs' bg='#009B90' color='white' _hover={{ background: '#02d1c2' }}>Tambah</Button>
     </Td>
     <Td textAlign='left'>{val.product_code}</Td>
     <Td textAlign='left'>{val.product_name}</Td>
     <Td textAlign='right'>1000 gram</Td>
     <Td textAlign='right'>{val.Product_stocks?.stock} {val.Product_stocks?.Unit?.unit_name}</Td>
     <Td textAlign='right'>Rp {val.Product_stocks?.selling_price}</Td>
    </Tr>

    // <ProductCard key={index}
    //  productId={val.id}
    //  productCode={val.product_code}
    //  productName={val.product_name}
    //  isiPerkemasan={val.isi_perkemasan}
    //  isDeleted={val.is_deleted}
    //  productImage={val.Product_images[0]?.image_url}
    //  stock={val.Product_stocks[0]?.stock}
    //  unit={val.Product_stocks[0]?.Unit?.unit_name}
    //  idUnit={val.Product_stocks[0]?.Unit?.id}
    //  firstPrice={val.Product_stocks[0]?.first_price}
    //  sellingPrice={val.Product_stocks[0]?.selling_price}
    //  converted={val.Product_stocks[0]?.converted}
    // />
   )
  })
 }

 useEffect(() => {
  fetchProduct()
 }, [router.isReady]);

 useEffect(() => {
  fetchProduct()
 }, [page]);
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

        {/* ----- Table Ringkasan Pesanan ----- */}
        <Box mt='5px' maxH='200px' maxW='460px' overflow='scroll' >
         {/* ----- table transaction list */}
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
            <Tr _hover={{ background: '#c7fcfc' }} >
             <Td>Obat 1</Td>
             <Td>Obat 1</Td>
             <Td textAlign='right'>Rp 1000.000</Td>
             <Td textAlign='right'>100 botol</Td>
             <Td textAlign='right'>Rp 100.000</Td>
            </Tr>
            <Tr _hover={{ background: '#c7fcfc' }} >
             <Td>Obat 1</Td>
             <Td>Obat 1</Td>
             <Td textAlign='right'>Rp 1000.000</Td>
             <Td textAlign='right'>100 botol</Td>
             <Td textAlign='right'>Rp 100.000</Td>
            </Tr>

           </Tbody>

          </Table>
         </TableContainer>
        </Box>
        <Box display='flex' fontSize='sm'>
         <Text fontWeight='semibold' color='#213360' minW='160px'>
          Total Keseluruhan
         </Text>:
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>
        <Box display='flex' fontSize='sm'>
         <Text fontWeight='semibold' color='#213360' minW='160px'>
          Pilih Kurir
         </Text>:
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>
        <Box display='flex' fontSize='sm'>
         <Text fontWeight='semibold' color='#213360' minW='160px'>
          Biaya Pengiriman
         </Text>:
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>
        <Box display='flex' fontSize='sm'>
         <Text fontWeight='semibold' color='#213360' minW='160px'>
          Total Keseluruhan
         </Text>:
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='300px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>

       </Box>
      </Flex>

      <Box>
       <Text fontWeight='bold'>Daftar Produk :</Text>
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


  </>
 )
}