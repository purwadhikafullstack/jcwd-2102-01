import {
 Flex, Box, Text, Button, InputGroup, InputLeftElement, Icon, useDisclosure,
 InputRightElement, Input, Tooltip, Divider, useToast, Link, Image,
 Modal, ModalOverlay, ModalHeader, ModalBody, ModalCloseButton, ModalContent
} from '@chakra-ui/react';
import Footer from '../../../components/footer/Footer';
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import Metatag from '../../../components/metatag/Metatag';
import { useRouter } from "next/router";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../lib/api';

export default function ProductCartList(props) {
 const { image, productName, qtyBuy, price, totalPrice, unit, firstPrice, idCart, idProduct, idUser } = props
 const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
 const autoRender = useSelector((state) => state.automateRendering)
 const dispatch = useDispatch();
 const toast = useToast();
 const percentage = parseInt((firstPrice - price) / firstPrice * 100);

 // -------------------- Delete Adress -------------------- //
 async function deleteCart() {
  try {
   await axiosInstance.delete("/transaction/" + idCart)
   dispatch({
    type: "FETCH_RENDER",
    payload: { value: !autoRender.value }
   })
   toast({
    title: "Succes",
    description: `Berhasil menghapus produk ${productName} dari keranjang `,
    status: "success",
    isClosable: true,
   })
  } catch (err) {
   console.log(err);
   toast({
    title: "Error",
    description: err.toString(),
    status: "error",
    isClosable: true,
   })
  }
 }

 return (
  <>
   {/* ---------- Start Product in Cart ---------- */}
   <Flex justifyContent='space-between'>
    <Box display='flex'>
     <Box minW='100px' minH='100px' overflow='hidden' borderWidth='1px' >
      <Link href={`/productdetails/${idProduct}`}>
       <Image objectFit='cover' src={`http://${image}`} width='100px' height='100px' />
      </Link>
     </Box>
     <Box ml='15px' >
      <Link href={`/productdetails/${idProduct}`}>
       <Text fontWeight='semibold' textColor='#213360'>
        {productName.substring(0, 32)}{productName.length >= 32 ? '...' : null}
       </Text>
      </Link>
      <Text fontWeight='semibold' fontSize='sm' textColor='#213360'>
       {qtyBuy} {unit}
      </Text>
     </Box>
    </Box>
    <Box w='150px' textAlign='right'>
     <Box display='flex' justifyContent='flex-end' flexWrap='wrap'>
      {!firstPrice ? <></> :
       <>
        <Text fontWeight='bold' fontSize='xs' textColor='#FF6B6B'  > {percentage}% </Text>
        <Text fontWeight='semibold' fontSize='xs' ml='5px' color='#737A8D' as='s'>Rp {firstPrice?.toLocaleString()}</Text>
       </>}
     </Box>
     <Text fontSize='sm' textColor='#213360' >
      Rp {price?.toLocaleString()}
     </Text>
     <Text fontSize='sm'>
      Total
     </Text>
     <Text fontSize='sm' fontWeight='semibold'>
      Rp {totalPrice.toLocaleString()}
     </Text>
    </Box>
   </Flex>
   <Box display='flex' borderBottomWidth='2px' justifyContent='flex-end' pb='10px' mb='10px' >
    <InputGroup w='150px' size='sm' mx='15px'>
     <InputLeftElement bg='#F6FAFB' borderWidth='1px' borderRightWidth='0px' borderLeftRadius='8px' color='#009B90' _hover={{ cursor: "pointer", bg: '#009B90', color: '#F6FAFB' }}>
      <Icon
       boxSize='5'
       as={HiMinusSm}
       sx={{ _hover: { cursor: "pointer" } }}
      />
     </InputLeftElement>
     <Input textAlign='center' type='number' borderRadius='8px' placeholder='QTY' required bg='#F6FAFB'
      onChange={(event) => formik.setFieldValue("password", event.target.value)} />
     <InputRightElement bg='#F6FAFB' borderWidth='1px' borderLeftWidth='0px' borderRightRadius='8px' color='#009B90' _hover={{ cursor: "pointer", bg: '#009B90', color: '#F6FAFB' }}>
      <Icon
       boxSize='5'
       as={HiPlusSm}
       sx={{ _hover: { cursor: "pointer" } }}
      />
     </InputRightElement>
    </InputGroup>
    <Tooltip label='Tambah Quantity' fontSize='sm' >
     <Button variant='link' color='#009B90' size='sm' _hover={{ color: 'orange' }}>
      <Icon boxSize={4} as={FaEdit} />
     </Button>
    </Tooltip>
    <Tooltip label='Hapus Produk' fontSize='sm' >
     <Button variant='link' color='#009B90' size='sm'
      onClick={onOpenDelete} _hover={{ color: 'red' }}>
      <Icon boxSize={4} as={FaTrashAlt} />
     </Button>
    </Tooltip>
    <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size='sm'>
     <ModalOverlay />
     <ModalContent>
      <ModalHeader>Hapus Produk Keranjang</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
       <Box justifyContent={'space-between'}>
        <Text>Apakah anda yakin ingin menghapus Produk {productName} ini dari keranjang?</Text>
       </Box>
       <Box mt='10px' display='flex' justifyContent='flex-end'>
        <Button mr={3} colorScheme='red' onClick={() => {
         async function submit() {
          await deleteCart();
          onCloseDelete();
         }
         submit()
        }}>
         Delete
        </Button>
       </Box>
      </ModalBody>
     </ModalContent>
    </Modal>
   </Box>
  </>
 )
}