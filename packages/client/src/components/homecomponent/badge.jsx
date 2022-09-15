import {
 Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay, Center
} from '@chakra-ui/react';
import banner from '../../assets/img/bg.png'
import Image from 'next/image';
import NextLink from 'next/link'
import jaminan1 from '../../assets/img/jaminan1.png'
import jaminan2 from '../../assets/img/jaminan2.png'
import jaminan3 from '../../assets/img/jaminan3.png'

export default function HomeBadge() {
 return (
  <Box m='15px' mb='15px' w='1090px'>
   <Box display='flex' justifyContent='space-between' mb='10px'>
    <Text fontWeight='bold' fontSize='lg'>Jaminan Untuk Anda</Text>
   </Box>

   <Box display='flex' flexWrap='wrap' mt='15px' mb='30px' justifyContent='center' >

    <Box display='flex' w='350px' h='168px' mr='5px' my='10px' bg='#F6FAFB' borderRadius='16px' borderWidth='1px' boxShadow='md'>
     <Center borderLeftRadius='16px' w='150px' h='168px'>
      <Image src={jaminan1} height='100px' width='80px' />
     </Center>
     <Box alignSelf='center' w='200px'>
      <Text fontWeight='bold' color='#213360'>100% Obat Asli</Text>
      <Text fontSize='sm'>Semua produk yang kami jual dijamin asli  & kualitas terbaik untuk anda.</Text>
     </Box>
    </Box>
    <Box display='flex' w='350px' h='168px' mx='5px' my='10px' bg='#F6FAFB' borderRadius='16px' borderWidth='1px' boxShadow='md'>
     <Center borderLeftRadius='16px' w='150px' h='168px'>
      <Image src={jaminan2} height='100px' width='70px' />
     </Center>
     <Box alignSelf='center' w='200px'>
      <Text fontWeight='bold' color='#213360'>Dijamin Hemat</Text>
      <Text fontSize='sm'>Kami menjamin akan mengembalikan uang dari selisih perbedaan harga.</Text>
     </Box>
    </Box>
    <Box display='flex' w='350px' h='168px' mx='5px' my='10px' bg='#F6FAFB' borderRadius='16px' borderWidth='1px' boxShadow='md'>
     <Center borderLeftRadius='16px' w='150px' h='168px'>
      <Image src={jaminan3} height='75px' width='100px' />
     </Center>
     <Box alignSelf='center' w='200px'>
      <Text fontWeight='bold' color='#213360'>Gratis Ongkir </Text>
      <Text fontSize='sm'>Tak perlu antre, Kami kirim ke alamat Anda bebas biaya ongkos kirim!</Text>
     </Box>
    </Box>
   </Box >

  </Box>
 )
}