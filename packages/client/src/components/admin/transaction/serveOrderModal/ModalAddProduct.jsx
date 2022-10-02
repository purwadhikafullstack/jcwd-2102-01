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
import { SiConvertio } from 'react-icons/si';
import { BiPlusMedical } from "react-icons/bi";
import { axiosInstance } from '../../../../lib/api';
// import ModalProfPicture from './mchangepicture/ModalProfPict';
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import * as Yup from "yup";
import qs from 'qs';
import { RiZzzFill } from 'react-icons/ri';
// import UploadPayment from '../payment/UploadPayment';

export default function ModalAddProduct(props) {
 const { transactionId, productId, unitId, userId, price, unit, stock, weight, grandTotal, buyer, reciever, recieverPhoneNo, address, courier, shippingCost,
  province, city, district, postalCode, note
  , productName } = props
 const { isOpen: isOpenAddQty, onOpen: onOpeSAddQty, onClose: onCloseAddQty } = useDisclosure()
 const dispatch = useDispatch()
 const toast = useToast();
 const router = useRouter();
 const autoRender = useSelector((state) => state.automateRendering)
 const [qtyProduct, setQtyProduct] = useState(1)

 // ----- Add to Cart
 const addToTransactionList = async () => {
  let msg = ''
  try {
   let body = {
    buy_quantity: qtyProduct,
    // price: parseFloat(sellingPrice),
    // total_price: parseFloat(sellingPrice) * parseFloat(qtyProduct),
    id_user: userId,
    id_product: productId,
    id_unit: unitId,
    id_transaction: transactionId
   }
   let res = await axiosInstance.post(`/transaction/api/v1/CustomOrder`, qs.stringify(body))
   msg = res.data.message;
   console.log(res.data.message);

   dispatch({
    type: "FETCH_RENDER",
    payload: { value: !autoRender.value }
   })

   if (msg == "Error: Maaf quantity melebihi produk stok") {
    toast({
     title: `Quantity beli Produk ${productName} di keranjang anda sudah melebihi stok / stok tiak mencukupi`,
     status: "error",
     isClosable: true,
    })
   } else {
    toast({
     title: `Berhasil Menambah ${qtyProduct} ${unit} Produk ${productName} ke keranjang`,
     status: "success",
     isClosable: true,
    })
   }
  } catch (err) {
   console.log(err);
  }
 }

 return (
  <>
   {/* <Button onClick={onOpeSAddQty} size='xs' bg='#009B90' color='white' mr='5px' _hover={{ background: '#02d1c2' }}> */}
   <Tooltip label='Tambah Produk Ke List' fontSize='sm' >
    <Button onClick={onOpeSAddQty} variant='link' size='xs' color='#009B90' mr='5px' >
     <Icon boxSize={5} as={BiPlusMedical} _hover={{ color: '#02d1c2' }} />
    </Button>
   </Tooltip>

   <Tooltip label='Convert satuan' fontSize='sm' >
    <Button onClick={onOpeSAddQty} variant='link' size='xs' color='#009B90' mr='5px' >
     <Icon boxSize={5} as={SiConvertio} _hover={{ color: '#02d1c2' }} />
    </Button>
   </Tooltip>
   { }
   <Modal isOpen={isOpenAddQty} onClose={onCloseAddQty} size='lg'>
    <ModalOverlay />
    <ModalContent>
     <ModalHeader>Tambah Produk ke List Pesanan</ModalHeader>
     <ModalCloseButton />
     <ModalBody pb={6}>
      <Box display='flex' >
       <Text fontWeight='semibold' color='#213360' minW='140px'>
        Product Name
       </Text>:
       <Text color='#213360' ml='5px' maxW='300px'>
        {productName}  unit{unitId} user{userId} trans{transactionId} prod{productId}
       </Text>
      </Box>
      <Box display='flex' >
       <Text fontWeight='semibold' color='#213360' minW='140px'>
        Berat
       </Text>:
       <Text color='#213360' ml='5px' maxW='300px'>
        {weight?.toLocaleString()} gram
       </Text>
      </Box>
      <Box display='flex' >
       <Text fontWeight='semibold' color='#213360' minW='140px'>
        Stok
       </Text>:
       <Text color='#213360' ml='5px' maxW='300px'>
        {stock?.toLocaleString()} {unit}
       </Text>
      </Box>
      <Box display='flex' >
       <Text fontWeight='semibold' color='#213360' minW='140px'>
        Harga
       </Text>:
       <Text color='#213360' ml='5px' maxW='300px'>
        Rp {price?.toLocaleString()}
       </Text>
      </Box>
      <Box display='flex' mt='5px' >
       <Text fontWeight='semibold' color='#213360' minW='140px'>
        QTY
       </Text>

       <InputGroup w='150px' size='sm'>
        <InputLeftElement bg='#009B90' borderLeftRadius='5px' color='white' sx={{ _hover: { cursor: "pointer" } }}
         onClick={() => setQtyProduct(qtyProduct <= 1 ? 1 : qtyProduct - 1)}>
         <Icon boxSize='5' as={HiMinusSm} />
        </InputLeftElement>
        <Input textAlign='center' type='number' borderRadius='5px' placeholder='qty' required bg='white'
         onChange={(event) => setQtyProduct(event.target.value > stock ? stock : event.target.value < 1 ? 1 : event.target.value)} value={qtyProduct}
        />
        <InputRightElement bg='#009B90' borderRightRadius='5px' color='white' sx={{ _hover: { cursor: "pointer" } }}
         onClick={() => setQtyProduct(qtyProduct >= stock ? stock : parseInt(qtyProduct) + parseInt(1))}>
         <Icon boxSize='5' as={HiPlusSm} />
        </InputRightElement>
       </InputGroup>

      </Box>
     </ModalBody>
     <ModalFooter pt='5px'>
      <Button mr={3} colorScheme='red' onClick={onCloseAddQty}>
       Batal
      </Button>
      <Button colorScheme='whatsapp' mr={3} onClick={() => {
       async function submit() {
        await addToTransactionList();
        onCloseAddQty();
       }
       submit()
      }}>
       Tambah
      </Button>
     </ModalFooter>
    </ModalContent>
   </Modal>
  </>
 )
}