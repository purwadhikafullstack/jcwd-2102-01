import {
 Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay
} from '@chakra-ui/react';
import NextLink from 'next/link'
import banner from '../../assets/img/bg.png'
import Image from 'next/image';
import ProductCard from '../productlisting/prouctcard/ProductCard';

export default function HomePrduct() {
 return (
  <Box m='15px' mb='15px' w='1090px'>
   <Box display='flex' justifyContent='space-between' mb='10px'>
    <Text fontWeight='bold' fontSize='lg'>Produk Populer</Text>
    <NextLink href='/productlist'>
     <Text fontWeight='bold' color='#009B90' fontSize='sm' _hover={{ cursor: "pointer", color: '#224B0C' }}>Lihat semua produk</Text>
    </NextLink>
   </Box>

   <Box display='flex' justifyContent='space-between' >
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />

   </Box>
  </Box >
 )
}