import {
 Box, Text, Avatar, Link, FormLabel, Textarea, AvatarBadge, Flex, Input, Select, InputLeftElement, InputGroup,
 Modal, ModalCloseButton, Icon, Tooltip, ModalOverlay, ModalHeader, ModalBody, useDisclosure, ModalFooter,
 FormControl, Button, useToast, FormHelperText, ModalContent, Center, useMediaQuery, Image,
 Divider, TableContainer, Table, Thead, Tr, Th, Td, Tbody, Tfoot, Drawer, DrawerBody, DrawerHeader, DrawerCloseButton, DrawerContent, DrawerOverlay
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
 const { recipeImage } = props
 const { isOpen: isOpenServe, onOpen: onOpenServe, onClose: onCloseServe } = useDisclosure()
 const { isOpen: isOpenServeOk, onOpen: onOpeSserveOk, onClose: onCloseServeOk } = useDisclosure()

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
    <ModalContent>
     <ModalHeader>Proses Pesanan</ModalHeader>
     <ModalCloseButton />
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
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>
        <Box display='flex' fontSize='sm'>
         <Text fontWeight='semibold' color='#213360' minW='160px'>
          Nama Pembeli
         </Text>:
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>
        <Box display='flex' fontSize='sm'>
         <Text fontWeight='semibold' color='#213360' minW='160px'>
          Nama Penerima
         </Text>:
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>
        <Box display='flex' fontSize='sm'>
         <Text fontWeight='semibold' color='#213360' minW='160px'>
          Alamat Penerima
         </Text>:
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>
        <Box display='flex' fontSize='sm'>
         <Text fontWeight='semibold' color='#213360' minW='160px'>
          Catatan
         </Text>:
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>
        <Box display='flex' fontSize='sm'>
         <Text fontWeight='semibold' color='#213360' minW='160px'>
          Ringkasan Pesanan
         </Text>:
         <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
          {/* {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}. */}
         </Text>
        </Box>

        <Box mt='5px' h='300px' maxW='460px' overflow='scroll' >
         {/* ----- table transaction list */}
         <TableContainer borderTopRadius='8px'>
          <Table size='sm' variant='striped' colorScheme='cyan'>
           <Thead bg='#213360' color='white' fontWeight='bold' >
            <Tr>
             <Th maxW='150px' color='white' textAlign='center'>Nama Prouk</Th>
             <Th textAlign='center' color='white'>Harga</Th>
             <Th textAlign='center' color='white' maxW='140px'>Qty</Th>
             <Th textAlign='center' color='white'>Total Harga</Th>
             <Th textAlign='center' color='white'>Act</Th>
            </Tr>
           </Thead>
           <Tbody fontWeight='semibold'>
            <Tr>
             <Td>Obat 1</Td>
             <Td textAlign='right'>Rp 1000.000</Td>
             <Td textAlign='right'>100 botol</Td>
             <Td textAlign='right'>Rp 100.000</Td>
            </Tr>
            <Tr>
             <Td>Obat 1</Td>
             <Td textAlign='right'>Rp 1000.000</Td>
             <Td textAlign='right'>100 botol</Td>
             <Td textAlign='right'>Rp 100.000</Td>
            </Tr>
            <Tr>
             <Td>Obat 1</Td>
             <Td textAlign='right'>Rp 1000.000</Td>
             <Td textAlign='right'>100 botol</Td>
             <Td textAlign='right'>Rp 100.000</Td>
            </Tr>
            <Tr>
             <Td>Obat 1</Td>
             <Td textAlign='right'>Rp 1000.000</Td>
             <Td textAlign='right'>100 botol</Td>
             <Td textAlign='right'>Rp 100.000</Td>
            </Tr>
            <Tr>
             <Td>Obat 1</Td>
             <Td textAlign='right'>Rp 1000.000</Td>
             <Td textAlign='right'>100 botol</Td>
             <Td textAlign='right'>Rp 100.000</Td>
            </Tr>
            <Tr>
             <Td>Obat 1</Td>
             <Td textAlign='right'>Rp 1000.000</Td>
             <Td textAlign='right'>100 botol</Td>
             <Td textAlign='right'>Rp 100.000</Td>
            </Tr>
           </Tbody>
           <Tfoot bg='#213360' color='white' fontWeight='bold'>
            <Tr>
             <Th textAlign='center' color='white' maxW='150px'>Nama Prouk</Th>
             <Th textAlign='center' color='white'>Harga</Th>
             <Th textAlign='center' color='white' maxW='140px'>Qty</Th>
             <Th textAlign='center' color='white'>Total Harga</Th>
             <Th textAlign='center' color='white'>Act</Th>
            </Tr>
           </Tfoot>
          </Table>
         </TableContainer>
        </Box>

       </Box>
      </Flex>
      <Box>
       <Text fontWeight='bold'>Daftar Produk :</Text>
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