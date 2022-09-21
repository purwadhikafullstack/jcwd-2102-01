import {
   Box, Text, Avatar, Link, FormLabel, Textarea, AvatarBadge, Flex, Input, Select, InputLeftElement, InputGroup,
   Modal, ModalCloseButton, Icon, Tooltip, ModalOverlay, ModalHeader, ModalBody, useDisclosure, ModalFooter,
   FormControl, Button, useToast, FormHelperText, ModalContent, Center, useMediaQuery, Image,
   Divider, Tabs, TabList, TabPanel, TabPanels, Tab, InputRightElement, Drawer, DrawerBody, DrawerHeader, DrawerCloseButton, DrawerContent, DrawerOverlay
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
import { BiPlusMedical } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { BiSearchAlt, BiReset } from 'react-icons/bi';
import { axiosInstance } from '../../../lib/api';
// import ModalProfPicture from './mchangepicture/ModalProfPict';
import * as Yup from "yup";
import qs from 'qs';
import UploadPayment from '../payment/UploadPayment';
import MdetailTransaction from './MdetailTransaction';

export default function TransactionCard(props) {
   const { id, productCode, noInvoice, dateCreated, status, grandTotal, qtyBuy, unit, productName, productImage, idUser } = props
   const { isOpen: isOpenCancel, onOpen: onOpenCancel, onClose: onCloseCancel } = useDisclosure()
   const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
   const { isOpen: isOpenPayment, onOpen: onOpenPayment, onClose: onClosePayment } = useDisclosure()
   const dispatch = useDispatch()
   const userSelector = useSelector((state) => state.auth);
   const autoRender = useSelector((state) => state.automateRendering)
   const toast = useToast();
   const router = useRouter();

   // ----- cancel transaction
   const formik = useFormik({
      initialValues: {
         note: ``,
      },
      validationSchema: Yup.object().shape({
         note: Yup.string().required("Note wajib diisi").min(3, 'catatan anda terlalu pendek').
            matches(/^[aA-zZ\s]+$/, "hanya boleh diisi huruf").trim(),
      }),
      validateOnChange: false,
      onSubmit: async () => {
         const { note } = formik.values
         try {
            let body = {
               note: note,
               transaction_status: "Dibatalkan"
            };
            const res = await axiosInstance.patch("/transaction/api/v1/invoice/" + noInvoice, qs.stringify(body))

            dispatch({
               type: "FETCH_RENDER",
               payload: { value: !autoRender.value }
            })
            toast({
               title: "Succes",
               description: "berhasil membatalkan transaksi",
               status: "warning",
               isClosable: true,
            })
         } catch (err) {
            console.log(err);
         }
         formik.setSubmitting(false);
      }
   })

   // ----- Transaction Confirmation
   const confirmTransaction = async () => {
      try {
         let body = {
            transaction_status: "Pesanan Dikonfirmasi"
         }
         await axiosInstance.patch("/transaction/api/v1/invoice/" + noInvoice, qs.stringify(body))
         dispatch({
            type: "FETCH_RENDER",
            payload: { value: !autoRender.value }
         })
         toast({
            title: "Succes",
            description: "Pesanan telah berhasil di Konfirmasi",
            status: "success",
            isClosable: true,
         })
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <Box wrap={'wrap'} mb="15px" boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="7px" py='18px' px='25px' >
         <Box display='flex' justifyContent='space-between' >
            <Text fontSize='md' fontWeight='semibold'>
               {moment(dateCreated).format('dddd') == 'Monday' ? 'Senin' :
                  moment(dateCreated).format('dddd') == 'Tuesday' ? 'Selasa' :
                     moment(dateCreated).format('dddd') == 'Wednesday' ? 'Rabu' :
                        moment(dateCreated).format('dddd') == 'Thursday' ? 'Kamis' :
                           moment(dateCreated).format('dddd') == 'Friday' ? 'Jumat' :
                              moment(dateCreated).format('dddd') == 'Saturday' ? 'Sabtu' :
                                 'minggu'}, &nbsp;
               {moment(dateCreated).format('DD MMMM YYYY')} - {noInvoice}</Text>

            <Box py='2px' px='4px' display='flex' justifyContent='center' borderWidth='1px' borderRadius='6px'
               borderColor={status == 'Menunggu Pembayaran' || status == 'Menunggu Konfirmasi Pembayaran' ? '#CBAF4E' :
                  status == 'Diproses' ? '#757575' :
                     status == 'Dikirim' ? '#0677c7' :
                        status == 'Pesanan Dikonfirmasi' ? '#87DF9F' : '#FF6B6B'}
               bg={status == 'Menunggu Pembayaran' || status == 'Menunggu Konfirmasi Pembayaran' ? '#FFDE6B4D' :
                  status == 'Diproses' ? '#ededed' :
                     status == 'Dikirim' ? '#bae2ff' :
                        status == 'Pesanan Dikonfirmasi' ? '#c2ffd3' : '#fcd7d7'} >

               <Text fontSize='xs' textAlign='center' fontWeight='semibold'
                  color={status == 'Menunggu Pembayaran' || status == 'Menunggu Konfirmasi Pembayaran' ? '#CBAF4E' :
                     status == 'Diproses' ? '#757575' :
                        status == 'Dikirim' ? '#0677c7' :
                           status == 'Pesanan Dikonfirmasi' ? '#26c754' : '#FF6B6B'}
               >{status}</Text>
            </Box>
         </Box>
         <Divider my='10px' />
         <Box display='flex' justifyContent='space-between'>
            <Box display='flex'>
               <NextLink href={`/productdetails/${productCode}`}>
                  <Image mr='20px' objectFit='cover' src={`http://${productImage}`} _hover={{ cursor: 'pointer' }} width='80px' height='80px' />
               </NextLink>
               <Box>
                  <Link href={`/productdetails/${productCode}`} style={{ textDecoration: 'none' }}>
                     <Text fontWeight='semibold' fontSize='sm' textColor='#213360' maxW='250px' overflow='hidden'>
                        {productName?.substring(0, 50)}{productName.length >= 32 ? '...' : null}
                        {/* {productName} */}
                     </Text>
                  </Link>
                  <Text fontWeight='semibold' fontSize='sm' textColor='#213360'>
                     {qtyBuy} x
                  </Text>
               </Box>
            </Box>
            <Box w='100px'>
               <Text fontWeight='semibold' fontSize='sm' textColor='#213360'>
                  Total Bayar
               </Text>
               <Text fontWeight='semibold' fontSize='sm' textColor='#213360'>
                  Rp {grandTotal?.toLocaleString()}
               </Text>
            </Box>
         </Box>
         <Divider my='10px' />
         <Box display='flex' justifyContent='flex-end' alignItems='center'>
            {status == 'Menunggu Pembayaran' ?
               <>
                  <Button onClick={onOpenPayment} w='180px' size='sm' borderRadius='8px' bg='#009B90' mr='10px'
                     _hover={{ background: '#02d1c2' }}>
                     {/* <Icon boxSize='5' as={RiListCheck} color='white' /> */}
                     <Text mx='10px' fontWeight='bold' color='white'>
                        Upload Bukti Transfer
                     </Text>
                  </Button>
                  <Button onClick={() => onOpenCancel()} colorScheme='red' size='sm' borderRadius='7px' mr='10px' >
                     Batalkan
                  </Button>
               </> :
               status == 'Menunggu Konfirmasi Pembayaran' ?
                  <Button onClick={() => onOpenCancel()} colorScheme='red' size='sm' borderRadius='7px' mr='10px' >
                     Batalkan
                  </Button> :
                  status == 'Dikirim' ?
                     <Button onClick={() => onOpenConfirm()} colorScheme='whatsapp' size='sm' borderRadius='7px' mr='10px' >
                        Konfirmasi Pesanan
                     </Button> : null
            }

            {/* ---------- Detail Transaksi ---------- */}
            <MdetailTransaction />
         </Box>

         {/* ----- Upload bukti pembayaran -----  */}
         <Modal isOpen={isOpenPayment} onClose={onClosePayment} size='lg'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Unggah Bukti Pembayaran</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <UploadPayment
                     noInvoicePayment={noInvoice}
                     onClose={onClosePayment} />
               </ModalBody>
            </ModalContent>
         </Modal>

         {/* ----- Modal Batalkan Pesanan -----  */}
         <Modal isOpen={isOpenCancel} onClose={onCloseCancel} size='sm'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Batalkan Pesanan</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Box justifyContent={'space-between'}>
                     <Text>Apakah anda yakin ingin membatalakan pesanan ini?</Text>
                  </Box>
                  <FormControl>
                     <FormLabel my='10px' display='flex'>Catatan <Text textColor='red'>*</Text></FormLabel>
                     <Textarea mb='20px' placeholder='Alasan membatalkan Transaksi . . .' maxLength='500'
                        onChange={(e) => {
                           formik.setFieldValue("note", e.target.value)
                        }} />
                  </FormControl>
               </ModalBody>
               <ModalFooter pt='5px'>
                  <Button colorScheme='blue' mr={3} onClick={onCloseCancel}>
                     Tidak
                  </Button>
                  <Button mr={3} colorScheme='red' disabled={formik.values.note.length < 4 ? true : false} onClick={() => {
                     async function submit() {
                        await formik.handleSubmit();
                        onCloseCancel();
                     }
                     submit()
                  }}>
                     Batalkan
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>

         {/* ----- Modal Konfirmasi Pesanan -----  */}
         <Modal isOpen={isOpenConfirm} onClose={onCloseConfirm} size='sm'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Konfirmasi Pesanan</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Box justifyContent={'space-between'}>
                     <Text>Konfirmasi pesanan anda jika sudah diterima sesuai dengan alamat</Text>
                  </Box>
               </ModalBody>
               <ModalFooter pt='5px'>
                  <Button colorScheme='red' mr={3} onClick={onCloseConfirm}>
                     Tidak
                  </Button>
                  <Button mr={3} colorScheme='whatsapp' onClick={() => {
                     async function submit() {
                        await confirmTransaction();
                        onCloseConfirm();
                     }
                     submit()
                  }}>
                     Konfirmasi
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </Box >
   )
}