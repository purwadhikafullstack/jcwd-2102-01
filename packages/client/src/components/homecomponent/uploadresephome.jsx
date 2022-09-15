import {
 Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay
} from '@chakra-ui/react';
import banner from '../../assets/img/bg.png'
import Image from 'next/image';

export default function HomeUploadResep() {
 return (
  <Box display='flex' m='30px' mb='15px' h='168px' w='80vw' bg='white'
   borderWidth='1px' boxShadow='md' borderRadius='16px'>
   <Box w='40vw' borderLeftRadius='16px'
    backgroundImage="url(/uploadresep2.png)"
    backgroundPosition="center"
    backgroundSize='cover'
    backgroundRepeat="no-repeat"
   ></Box>
   <Box borderRadius='16px' display='flex' ml='10px'>
    <Box alignSelf='center' >
     <Text fontWeight='bold'>Punya resep dokter?</Text>
     <Text>Tak perlu mengantri dan obat langsung dikirimkan ke lokasi anda!</Text>
     <Button colorScheme='twitter' w='150px' mt='10px'>Upload resep</Button>
    </Box>
    <Box alignSelf='center'>
    </Box>
   </Box>
  </Box >
 )
}