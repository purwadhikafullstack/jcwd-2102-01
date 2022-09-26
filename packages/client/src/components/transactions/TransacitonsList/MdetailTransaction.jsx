import {
 Box, Text, Avatar, Link, FormLabel, Textarea, AvatarBadge, Flex, Input, Select, InputLeftElement, InputGroup,
 Modal, ModalCloseButton, Icon, Tooltip, ModalOverlay, ModalHeader, ModalBody, useDisclosure, ModalFooter,
 FormControl, Button, useToast, FormHelperText, ModalContent, Center, useMediaQuery, Image,
 Divider, Tabs, TabList, TabPanel, TabPanels, Tab, InputRightElement, Drawer, DrawerBody, DrawerHeader, DrawerCloseButton, DrawerContent, DrawerOverlay
} from '@chakra-ui/react';
import { BiDetail } from "react-icons/bi";
import bank_bca from '../../../assets/img/metode_pembayaran/bank_bca.png'
import logo from '../../../assets/img/healthymedLogo.png'
import NextImage from 'next/image';
import ProductOrderList from '../payment/ProductOrderList';
import { RiFileCopyFill } from 'react-icons/ri';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";

export default function MdetailTransaction(props) {
 const { idDet, productCodeDet, noInvoiceDet, dateCreatedDet, statusDet, grandTotalDet, qtyBuyDet, unitDet, productNameDet, productImageDet, idUserDet } = props
 const { isOpen: isOpenDetail, onOpen: onOpenDetail, onClose: onCloseDetail } = useDisclosure()
 const { isOpen: isOpenPayment, onOpen: onOpenPayment, onClose: onClosePayment } = useDisclosure()
 const toast = useToast();

 return (
  <>
   <Button onClick={onOpenDetail} variant='link' color='#009B90'>
    <Icon boxSize='5' as={BiDetail} color='#009B90' mr='5px' />
    <Text fontWeight='semibold' fontSize='sm' textColor='#009B90'>
     Lihat Detail Transaksi
    </Text>
   </Button>

   <Modal isOpen={isOpenDetail} onClose={onCloseDetail} size='2xl'>
    <ModalOverlay />
    <ModalContent borderRadius='10px'>
     <ModalHeader bg='#009B90' color='white' borderTopRadius='10px'>Detail Transaksi</ModalHeader>
     <ModalCloseButton color='white' size='lg' />
     <ModalBody>
      <Box>
       <Center my='10px'>
        <NextImage src={logo} width='180px' height='40px' />
       </Center>

       {/* -------------------- Batas Pembayaran -------------------- */}
       <Box display='flex' flexWrap='wrap' my='10px' p='20px' justifyContent='center' boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
        <Box w='300px'>
         <Text fontWeight='semibold' color='#737A8D' fontSize='sm'>
          Batas Akhir Pembayaran
         </Text>
         <Text fontWeight='semibold' color='#213360'>
          Kamis, 21 Maret 2022, 20.45 WIB
         </Text>
        </Box>
        <Center display='flex' justifyContent='flex-end'>
         <Center w='30px' h='30px' m='10px' borderRadius='5px' bg='#FF6B6B' color='white'>
          <Text>
           20
          </Text>
         </Center>
         <Center borderRadius='5px' color='#FF6B6B'>
          <Text fontWeight='bold'>
           :
          </Text>
         </Center>
         <Center w='30px' h='30px' m='10px' borderRadius='5px' bg='#FF6B6B' color='white'>
          <Text>
           20
          </Text>
         </Center>
         <Center borderRadius='5px' color='#FF6B6B'>
          <Text fontWeight='bold'>
           :
          </Text>
         </Center>
         <Center w='30px' h='30px' m='10px' borderRadius='5px' bg='#FF6B6B' color='white'>
          <Text>
           20
          </Text>
         </Center>

        </Center>
       </Box>

       {/* -------------------- Ringkasan Order -------------------- */}
       <Box justifyContent='space-between'>
        <Box mb='10px' display='flex' justifyContent='space-between'>
         <Text fontWeight='bold' fontSize='lg' color='#213360'>
          Ringkasan Order
         </Text>
        </Box>

        <Box my='10px'>
         <Box display='flex' >
          <Text fontWeight='semibold' color='#213360' w='160px'>
           No Transaksi
          </Text>:
          <Text fontWeight='semibold' color='#213360' ml='5px'>
           Tanggal / Nomor Invoice
          </Text>
         </Box>
         <Box display='flex' >
          <Text fontWeight='semibold' color='#213360' w='160px'>
           Nama Penerima
          </Text>:
          <Text fontWeight='semibold' color='#213360' ml='5px'>
           Wira Chanra
          </Text>
         </Box>
         <Box display='flex' >
          <Text fontWeight='semibold' color='#213360' w='160px'>
           Alamat
          </Text>:
          <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
           Jl. Dewi Sartika
          </Text>
         </Box>
         <Box display='flex' >
          <Text fontWeight='semibold' color='#213360' w='160px'>
           Kurir
          </Text>:
          <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
           JNE
          </Text>
         </Box>
        </Box>

        <Box>
         <ProductOrderList />
         <ProductOrderList />
         <ProductOrderList />
         <ProductOrderList />
        </Box>

        <Divider />
        <Box mt='10px'>
         <Box display='flex' justifyContent='space-between'>
          <Text fontWeight='semibold' color='#213360'>
           Total
          </Text>
          <Text fontWeight='semibold' color='#213360'>
           {/* Rp {totalOrder.toLocaleString()} */}
           Rp 2000000
          </Text>
         </Box>
         <Box display='flex' justifyContent='space-between' mt='7px'>
          <Text fontWeight='semibold' color='#213360'>
           Biaya Pengiriman
          </Text>
          <Text fontWeight='semibold' color='#213360'>
           {/* Rp {shippingCost.toLocaleString()} */}
           Rp 2000000
          </Text>
         </Box>
         <Box display='flex' justifyContent='space-between' mt='7px'>
          <Text fontWeight='semibold' color='#213360'>
           Total Pembayaran
          </Text>
          <Text fontWeight='semibold' color='#213360'>
           {/* Rp {totalPaid.toLocaleString()} */}
           Rp 2000000
          </Text>
         </Box>
        </Box>

        {/* -------------------- Bank -------------------- */}
        <Box my='25px' p='20px' px='30px' boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
         <Box mb='10px' justifyContent='space-between' display='flex'>
          <Text fontWeight='bold' fontSize='lg' color='#213360'>
           Rekening BCA
          </Text>
          <NextImage src={bank_bca} width='80px' height='23px' />
         </Box>
         <Divider />
         <Box my='10px'>
          <Text fontSize='2xl' fontWeight='bold' color='#213360'>
           PT. HEALTHYMED INDONESIA
          </Text>
          <Text color='#737A8D' fontSize='sm' fontWeight='semibold'>
           Nomor Rekening BCA.
          </Text>
          <Box display='flex' justifyContent='space-between'>
           <Text fontSize='2xl' fontWeight='bold' color='#213360'>
            80777082261130123
           </Text>
           {/* <Tooltip label='Salin' fontSize='sm' > */}
           <Button variant='link' color='#009B90' _hover={{ textDecoration: 'none' }} size='sm'
            onClick={() => {
             navigator.clipboard.writeText(`80777082261130123`)
             // setLinkCopy(true)
             toast({
              title: "Berhasil Salin No.Rekening",
              status: "success",
              isClosable: true,
             })
            }}>
            <Text fontWeight='bold'>Salin</Text> &nbsp;
            <Icon boxSize={4} as={RiFileCopyFill} />
           </Button>
          </Box>
         </Box>
         <Box >
          <Text fontWeight='semibold' color='#737A8D' fontSize='sm'>
           Total Pembayaran
          </Text>
          <Text fontSize='xl' fontWeight='bold' color='#213360'>
           Rp 20.0000
           {/* Rp {totalPaid.toLocaleString()} */}
          </Text>
         </Box>

         {/* ----- Upload Bukti Transfer ----- */}
         <Box mt='20px'>
          <Button onClick={onOpenPayment} variant='link' color='#009B90' _hover={{ textDecoration: 'none' }} size='sm'>
           <Icon boxSize={4} as={RiFileCopyFill} /> &nbsp;
           <Text fontWeight='bold'> Upload Bukti Transfer</Text>
          </Button>

          <Modal isOpen={isOpenPayment} onClose={onClosePayment} size='lg'>
           <ModalOverlay />
           <ModalContent>
            <ModalHeader>Unggah Bukti Pembayaran</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
             {/* <UploadPayment /> */}
            </ModalBody>
           </ModalContent>
          </Modal>
         </Box>
        </Box>

       </Box>
      </Box>
     </ModalBody>
     <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onCloseDetail}>
       Close
      </Button>
      <Button variant='ghost'>Secondary Action</Button>
     </ModalFooter>
    </ModalContent>
   </Modal>
  </>

 )
}