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
import { axiosInstance } from '../../../../lib/api';
// import ModalProfPicture from './mchangepicture/ModalProfPict';
import * as Yup from "yup";
import qs from 'qs';
import { RiZzzFill } from 'react-icons/ri';
// import UploadPayment from '../payment/UploadPayment';

export default function ModalAddProduct(props) {
 const { transactionId, noInvoice, recipeImage, dateCreated, status, totalOrderList, totalWeight, grandTotal, buyer, reciever, recieverPhoneNo, address, courier, shippingCost,
  province, city, district, postalCode, productList, note, userId, productId } = props
 const { isOpen: isOpenAddQty, onOpen: onOpeSAddQty, onClose: onCloseAddQty } = useDisclosure()
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

 return (
  <>
   <Button onClick={onOpeSAddQty} size='xs' bg='#009B90' color='white' _hover={{ background: '#02d1c2' }}>Tambah</Button>
   {/* ----- Modal tambah Produk ke Transaction List ----- */}
   <Modal isOpen={isOpenAddQty} onClose={onCloseAddQty} size='lg'>
    <ModalOverlay />
    <ModalContent>
     <ModalHeader>Konfirmasi Pembayaran</ModalHeader>
     <ModalCloseButton />
     <ModalBody pb={6}>
      <Text>Apakah anda yakin ingin mengkonfirmasi pembayaran transaksi {noInvoice}?</Text>
     </ModalBody>
     <ModalFooter pt='5px'>
      <Button mr={3} colorScheme='red' onClick={onCloseAddQty}>
       Batal
      </Button>
      <Button colorScheme='whatsapp' mr={3} onClick={() => {
       async function submit() {
        await confirmPayment();
        onClosePaymentOk();
        onClosePayment();
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