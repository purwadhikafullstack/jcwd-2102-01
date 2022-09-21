import {
 Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay
} from '@chakra-ui/react';
import banner from '../../assets/img/bg.png'
import Image from 'next/image';

export default function Banner() {
 return (
  <Box display='flex' h='250px' w='100vw'
   backgroundPosition='center'
   backgroundSize='cover'
   backgroundRepeat="no-repeat"
   backgroundImage="url(/bg.jpg)">
   {/* <Image objectFit='cover' src={banner} /> */}
   <Box pl='20px' alignSelf='center' >
    <Text color='#213360' className='image-banner' fontSize='2xl' fontWeight='bold'>APOTEK ONLINE TERPERCAYA</Text>
    <Text color='#213360' fontSize='md' fontWeight='semibold'>beli obat, cek lab dan update informasi seputar kesehatan</Text>
   </Box>
  </Box >
 )
}