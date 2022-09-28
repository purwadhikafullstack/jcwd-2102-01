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
import { BiDetail } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { BiSearchAlt, BiReset } from 'react-icons/bi';
import { axiosInstance } from '../../../lib/api';
import AdmMdetailTransaction from './AdmMdetailTransaction';
// import ModalProfPicture from './mchangepicture/ModalProfPict';
import * as Yup from "yup";
import qs from 'qs';
import ServeOrder from './ServeOrder';
// import UploadPayment from '../payment/UploadPayment';

export default function AdmTransactionCard(props) {
   const { id, productCode, products, noInvoice, dateCreated, status, totalOrder, grandTotal, qtyBuy, unit, productName, productImage, recipeImage, idRecipe, idUser,
      buyerName, namaPenerima, noHpPenerima, prov, city, district, addressReciever, courier, shippingCost, imagePayment, note, cancelDes } = props
   const { isOpen: isOpenCancel, onOpen: onOpenCancel, onClose: onCloseCancel } = useDisclosure()
   const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
   const { isOpen: isOpenPayment, onOpen: onOpenPayment, onClose: onClosePayment } = useDisclosure()
   const { isOpen: isOpenPaymentOk, onOpen: onOpenPaymentOk, onClose: onClosePaymentOk } = useDisclosure()
   const { isOpen: isOpenPaymentNo, onOpen: onOpenPaymentNo, onClose: onClosePaymentNo } = useDisclosure()
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
               cancel_description: note,
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

   // ----- Transaction will be process
   const confirmPayment = async () => {
      try {
         let body = {
            transaction_status: "Diproses"
         }
         await axiosInstance.patch("/transaction/api/v1/invoice/" + noInvoice, qs.stringify(body))
         dispatch({
            type: "FETCH_RENDER",
            payload: { value: !autoRender.value }
         })
         toast({
            title: "Succes",
            description: "Status Menunggu Konfirmasi Pembayaran berubah DiProses",
            status: "success",
            isClosable: true,
         })
      } catch (err) {
         console.log(err);
      }
   }

   // ----- Transaction will be process
   const rejectPayment = async () => {
      try {
         let body = {
            transaction_status: "Menunggu Pembayaran",
            cancel_description: "Bukti Pembayaran Anda ditolak"
         }
         await axiosInstance.patch("/transaction/api/v1/invoice/" + noInvoice, qs.stringify(body))
         dispatch({
            type: "FETCH_RENDER",
            payload: { value: !autoRender.value }
         })
         toast({
            title: "Succes",
            description: "Status Menunggu Konfirmasi Pembayaran berubah Menunggu Pembayaran",
            status: "success",
            isClosable: true,
         })
      } catch (err) {
         console.log(err);
      }
   }

   // ----- Transaction will be sent
   const confirmTransaction = async () => {
      try {
         let body = {
            transaction_status: "Dikirim"
         }
         await axiosInstance.patch("/transaction/api/v1/invoice/" + noInvoice, qs.stringify(body))
         dispatch({
            type: "FETCH_RENDER",
            payload: { value: !autoRender.value }
         })
         toast({
            title: "Succes",
            description: "Status Diproses berubah Dikirim",
            status: "success",
            isClosable: true,
         })
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <Box wrap={'wrap'} mb="20px" boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="7px" py='18px' px='25px' >
         <Box display='flex' justifyContent='space-between' >
            <Text fontSize='md' fontWeight='semibold'>
               {moment(dateCreated).format('dddd') == 'Monday' ? 'Senin' :
                  moment(dateCreated).format('dddd') == 'Tuesday' ? 'Selasa' :
                     moment(dateCreated).format('dddd') == 'Wednesday' ? 'Rabu' :
                        moment(dateCreated).format('dddd') == 'Thursday' ? 'Kamis' :
                           moment(dateCreated).format('dddd') == 'Friday' ? 'Jumat' :
                              moment(dateCreated).format('dddd') == 'Saturday' ? 'Sabtu' :
                                 'Minggu'}, &nbsp;
               {moment(dateCreated).format('DD MMMM YYYY')} {idRecipe == 1 ? "/ " + noInvoice : null}
            </Text>

            <Box py='2px' px='4px' display='flex' justifyContent='center' borderWidth='1px' borderRadius='6px'
               borderColor={status == 'Menunggu Pembayaran' || status == 'Menunggu Konfirmasi Pembayaran' ? '#CBAF4E' :
                  status == 'Diproses' ? '#757575' :
                     status == 'Dikirim' ? '#0677c7' :
                        status == 'Pesanan Dikonfirmasi' ? '#87DF9F' :
                           status == 'Resep Dokter' ? '#B032FF' : '#FF6B6B'}
               bg={status == 'Menunggu Pembayaran' || status == 'Menunggu Konfirmasi Pembayaran' ? '#FFDE6B4D' :
                  status == 'Diproses' ? '#ededed' :
                     status == 'Dikirim' ? '#bae2ff' :
                        status == 'Pesanan Dikonfirmasi' ? '#c2ffd3' :
                           status == 'Resep Dokter' ? '#EFD7FE' : '#fcd7d7'} >

               <Text fontSize='xs' textAlign='center' fontWeight='semibold'
                  color={status == 'Menunggu Pembayaran' || status == 'Menunggu Konfirmasi Pembayaran' ? '#CBAF4E' :
                     status == 'Diproses' ? '#757575' :
                        status == 'Dikirim' ? '#0677c7' :
                           status == 'Pesanan Dikonfirmasi' ? '#26c754' :
                              status == 'Resep Dokter' ? '#B032FF' : '#FF6B6B'}
               >{status}</Text>
            </Box>
         </Box>
         <Divider my='10px' />
         <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
            <Box display='flex' mr='20px'>
               {/* ------ jika transaksi dari resep dokter maka yg tampil resep dokter ------ */}
               {idRecipe == 1 ?
                  <NextLink href={`/productdetails/${productCode}`}>
                     <Image mr='20px' objectFit='cover' src={`http://${productImage}`} _hover={{ cursor: 'pointer' }} width='80px' height='80px' />
                  </NextLink>
                  :
                  <Image mr='20px' objectFit='cover' src={`http://${recipeImage}`} _hover={{ cursor: 'pointer' }} width='80px' height='80px' />
               }

               <Box w='250px' >
                  {idRecipe == 1 ?
                     <>
                        <Link href={`/productdetails/${productCode}`} style={{ textDecoration: 'none' }}>
                           <Text fontWeight='semibold' textColor='#213360' overflow='hidden'>
                              {productName?.substring(0, 50)}{!productName ? null : productName.length >= 32 ? '...' : null}
                           </Text>
                        </Link>
                        <Text fontWeight='semibold' textColor='#213360'>
                           {qtyBuy} x
                        </Text>
                     </> :
                     <Text fontWeight='semibold' fontSize='sm' textColor='#213360' maxW='300px' overflow='hidden'>
                        Catatan : {note}
                     </Text>
                  }
               </Box>
            </Box>
            <Box w='150px' mr='15px' >
               <Text fontWeight='semibold' fontSize='sm' textColor='#213360' overflow='hidden'>
                  Pembeli
               </Text>
               <Text textColor='#213360'>
                  {buyerName}
               </Text>
            </Box>
            <Box w='300px' mr='15px' >
               <Text fontWeight='semibold' fontSize='sm' textColor='#213360' overflow='hidden'>
                  Alamat
               </Text>
               <Text textColor='#213360'>
                  {addressReciever}
               </Text>
            </Box>
            <Box w='100px' mr='15px' >
               {idRecipe == 1 ?
                  <>
                     <Text fontWeight='semibold' fontSize='sm' textColor='#213360'>
                        Kurir
                     </Text>
                     <Text fontWeight='semibold' textColor='#213360'>
                        {courier}
                     </Text>
                  </>
                  :
                  null
               }
            </Box>
         </Box>
         {idRecipe == 1 ?
            <Box display='flex' justifyContent='space-between' mt='10px' bg='#F6FAFB' p='5px' borderRadius='8px'>
               <Text fontWeight='semibold' textColor='#213360'>
                  Total Belanja
               </Text>
               <Text fontWeight='semibold' textColor='#213360'>
                  Rp {grandTotal?.toLocaleString()}
               </Text>
            </Box> :
            null}
         <Divider my='10px' />
         <Box display='flex' justifyContent='flex-end' alignItems='center' flexWrap='wrap' >
            {status == 'Menunggu Pembayaran' ?
               <>
                  <Button onClick={() => onOpenCancel()} colorScheme='red' size='sm' borderRadius='7px' mr='10px' >
                     Tolak Pesanan
                  </Button>
               </> :
               status == 'Menunggu Konfirmasi Pembayaran' ?
                  <>
                     <Button onClick={() => onOpenPayment()} colorScheme='twitter' size='sm' borderRadius='7px' mr='6px' >
                        Pembayaran
                     </Button>
                     <Button onClick={() => onOpenCancel()} colorScheme='red' size='sm' borderRadius='7px' mr='7px' >
                        Tolak Pesanan
                     </Button>
                  </>

                  :
                  status == 'Diproses' ?
                     <>
                        <Button onClick={() => onOpenConfirm()} colorScheme='whatsapp' size='sm' borderRadius='7px' mr='10px' >
                           Kirim Produk
                        </Button>
                        <Button onClick={() => onOpenCancel()} colorScheme='red' size='sm' borderRadius='7px' mr='10px' >
                           Tolak Pesanan
                        </Button>
                     </>
                     :
                     status == 'Resep Dokter' ?
                        <>
                           <ServeOrder
                              recipeImage={recipeImage}
                           />
                        </>
                        : null
            }
            {/* ---------- Detail Transaksi ---------- */}
            <Box mt='5px'>
               <AdmMdetailTransaction
                  idDet={id}
                  productsDet={products}
                  noInvoiceDet={noInvoice}
                  dateCreatedDet={dateCreated}
                  statusDet={status}
                  grandTotalDet={grandTotal}
                  namaPenerimaDet={namaPenerima}
                  noHpPenerimaDet={noHpPenerima}
                  alamatPenerimaDet={addressReciever}
                  provDet={prov}
                  cityDet={city}
                  districtDet={district}
                  kurirDet={courier}
                  totalOrderDet={totalOrder}
                  shippingCostDet={shippingCost}
                  idUserDet={idUser}
                  noteDet={note}
                  cancelDet={cancelDes}
               />
            </Box>
         </Box>

         {/* ----- Cek bukti pembayaran -----  */}
         <Modal isOpen={isOpenPayment} onClose={onClosePayment} size='lg'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Cek Bukti Pembayaran</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <Center>
                     <Image mr='20px' objectFit='contain' src={`http://${imagePayment}`} width='300px' height='350px' />
                  </Center>
               </ModalBody>
               <ModalFooter pt='5px'>
                  <Button mr={3} colorScheme='red' onClick={() => onOpenPaymentNo()}>
                     Tolak Pembayaran
                  </Button>
                  <Button colorScheme='whatsapp' mr={3} onClick={() => onOpenPaymentOk()}>
                     Konfirmasi Pembayaran
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>

         {/* ----- Konfirmasi bukti pembayaran -----  */}
         <Modal isOpen={isOpenPaymentOk} onClose={onClosePaymentOk} size='lg'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Konfirmasi Pembayaran</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <Text>Apakah anda yakin ingin mengkonfirmasi pembayaran transaksi {noInvoice}?</Text>
               </ModalBody>
               <ModalFooter pt='5px'>
                  <Button mr={3} colorScheme='red' onClick={onClosePaymentOk}>
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

         {/* ----- Tolak bukti pembayaran -----  */}
         <Modal isOpen={isOpenPaymentNo} onClose={onClosePaymentNo} size='lg'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Tolak Bukti Pembayaran</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <Text>Apakah anda yakin ingin menolak pembayaran transaksi {noInvoice}?</Text>
               </ModalBody>
               <ModalFooter pt='5px'>
                  <Button mr={3} colorScheme='red' onClick={onClosePaymentNo}>
                     Batal
                  </Button>
                  <Button mr={3} colorScheme='red' onClick={() => {
                     async function submit() {
                        await rejectPayment();
                        onClosePaymentNo();
                        onClosePayment();
                     }
                     submit()
                  }}>
                     Tolak Pembayaran
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>

         <Modal isOpen={isOpenCancel} onClose={onCloseCancel} size='sm'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Tolak Pesanan</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Box justifyContent={'space-between'}>
                     <Text>Apakah anda yakin ingin menolak pesanan ini?</Text>
                  </Box>
                  <FormControl>
                     <FormLabel my='10px' display='flex'>Catatan <Text textColor='red'>*</Text></FormLabel>
                     <Textarea mb='20px' placeholder='Alasan menolak Transaksi . . .' maxLength='500'
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
                     Tolak
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>

         {/* ----- Modal Konfirmasi Pesanan -----  */}
         <Modal isOpen={isOpenConfirm} onClose={onCloseConfirm} size='sm'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Pengiriman Produk</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Box justifyContent={'space-between'}>
                     <Text>Produk akan di kirim ke Pembeli, Harap dilakukan pengecekkan produk sebelum melakukan pengiriman.</Text>
                  </Box>
               </ModalBody>
               <ModalFooter pt='5px'>
                  <Button colorScheme='red' mr={3} onClick={onCloseConfirm}>
                     Batal
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