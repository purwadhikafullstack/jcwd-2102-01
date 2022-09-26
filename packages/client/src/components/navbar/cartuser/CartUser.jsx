import {
 Box, Text, Button, Tooltip, Icon, Image, useDisclosure, Link,
 Modal, ModalOverlay, useToast, ModalContent, ModalHeader, ModalCloseButton, ModalBody
} from "@chakra-ui/react"
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../lib/api';

export default function CartUser(props) {
 const { image, productName, qtyBuy, price, totalPrice, idCart, idProduct, idUser } = props
 const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
 const autoRender = useSelector((state) => state.automateRendering)
 const dispatch = useDispatch();
 const toast = useToast();

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
  <Box borderBottomWidth='2px' display='flex' boxShadow='base' mb='10px' mr='6px' borderWidth='1px' borderRadius='10px' _hover={{ boxShadow: 'lg' }}>
   <Box w='82px' h='82px'>
    <Link href={`/productdetails/${idProduct}`}>
     <Image objectFit='cover' src={`http://${image}`} width='82px' height='82px' borderLeftRadius='10px' />
    </Link>
   </Box>
   <Box w='190px' ml='3px'>
    <Link href={`/productdetails/${idProduct}`} _hover={{ color: '#009B90' }}>
     <Text fontSize='sm' h='40px' fontWeight='semibold'>{productName.substring(0, 32)}{productName.length >= 32 ? '...' : null}</Text>
    </Link>
    <Box display='flex' justifyContent='space-between'>
     <Box>
      <Text fontSize='sm'>{qtyBuy} x Rp {price?.toLocaleString()}</Text>
      <Text fontSize='sm'>Total : Rp {totalPrice?.toLocaleString()}</Text>
     </Box>
     <Tooltip label='Hapus Produk' fontSize='sm' >
      <Button variant='link' color='#009B90' size='sm' _hover={{ color: 'red' }} onClick={onOpenDelete}>
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
   </Box >
  </Box >
 )
}