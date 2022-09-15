import {
 Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay
} from '@chakra-ui/react';
import NextLink from 'next/link'
import banner from '../../assets/img/bg.png'
import Image from 'next/image';

export default function HomeCategory() {
 return (
  <Box m='30px' mb='15px' h='160px' w='1090px' >
   <Box display='flex' justifyContent='space-between' mb='10px'>
    <Text fontWeight='bold' fontSize='lg'>Kategori</Text>
    <NextLink href='/productlist'>
     <Text fontWeight='bold' color='#009B90' fontSize='sm' _hover={{ cursor: "pointer", color: '#224B0C' }}>Lihat semua</Text>
    </NextLink>
   </Box>

   <Box display='flex' justifyContent='space-between' >
    <Box borderRadius='16px' w='130px' h='110px' display='flex' bg='white'
     borderWidth='1px' boxShadow='lg' alignSelf='center'>
     <Text>
      Obat-obatan
     </Text>
    </Box>
    <Box borderRadius='16px' w='130px' h='110px' display='flex' bg='white'
     borderWidth='1px' boxShadow='lg' alignSelf='center'>
     <Text>
      Obat-obatan
     </Text>
    </Box>
    <Box borderRadius='16px' w='130px' h='110px' display='flex' bg='white'
     borderWidth='1px' boxShadow='lg' alignSelf='center'>
     <Text>
      Obat-obatan
     </Text>
    </Box>
    <Box borderRadius='16px' w='130px' h='110px' display='flex' bg='white'
     borderWidth='1px' boxShadow='lg' alignSelf='center'>
     <Text>
      Obat-obatan
     </Text>
    </Box>
    <Box borderRadius='16px' w='130px' h='110px' display='flex' bg='white'
     borderWidth='1px' boxShadow='lg' alignSelf='center'>
     <Text>
      Obat-obatan
     </Text>
    </Box>
    <Box borderRadius='16px' w='130px' h='110px' display='flex' bg='white'
     borderWidth='1px' boxShadow='lg' alignSelf='center'>
     <Text>
      Obat-obatan
     </Text>
    </Box>
    <Box borderRadius='16px' w='130px' h='110px' display='flex' bg='white'
     borderWidth='1px' boxShadow='lg' alignSelf='center'>
     <Text>
      Obat-obatan
     </Text>
    </Box>
   </Box>
  </Box >
 )
}