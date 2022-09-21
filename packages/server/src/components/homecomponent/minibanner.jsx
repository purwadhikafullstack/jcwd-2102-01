import {
 Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay, Center
} from '@chakra-ui/react';
import banner from '../../assets/img/bg.png'
import Image from 'next/image';
import minibanner1 from '../../assets/img/minibanner1.png'
import minibanner2 from '../../assets/img/minibanner2.png'
import minibanner3 from '../../assets/img/minibanner3.png'
import minibanner4 from '../../assets/img/minibanner4.png'

export default function HomeMiniBanner() {
 return (
  <Box display='flex' flexWrap='wrap' my='20px' justifyContent='center' >

   <Box display='flex' w='360px' h='150px' mx='5px' my='10px' bg='#FFB156'
    borderRadius='16px' borderWidth='1px' boxShadow='md' >
    <Center borderLeftRadius='16px' overflow='hidden' >
     <Image src={minibanner1} height='215px' width='260px' />
    </Center>
    <Box borderRightRadius='16px' w='200px' alignSelf='center' p='5px'>
     <Text fontWeight='bold' color='#213360'>Program Hamil</Text>
     <Text fontSize='sm' fontWeight='semibold'>Wujudkan rumah tanggamu dengan si buah hati</Text>
    </Box>
   </Box>

   <Box display='flex' w='360px' h='150px' mx='5px' my='10px' bg='#92C3D1'
    borderRadius='16px' borderWidth='1px' boxShadow='md' >
    <Box display='flex' borderLeftRadius='16px' overflow='hidden' justifyContent='flex-end'>
     <Image src={minibanner2} height='150px' width='260px' />
    </Box>
    <Box borderRightRadius='16px' w='200px' alignSelf='center' p='5px'>
     <Text fontWeight='bold' fontSize='sm' color='#213360'>Kebutuhan Idul Fitri</Text>
     <Text fontSize='sm' fontWeight='semibold'>Lengkapi kebutuhan gizi & asupan saat puasa</Text>
    </Box>
   </Box>

   <Box display='flex' w='360px' h='150px' mx='5px' my='10px' bg='#FFC4C4'
    borderRadius='16px' borderWidth='1px' boxShadow='md' >
    <Box display='flex' borderLeftRadius='16px' overflow='hidden' justifyContent='flex-end'>
     <Image src={minibanner3} height='150px' width='260px' />
    </Box>
    <Box borderRightRadius='16px' w='200px' alignSelf='center' p='5px'>
     <Text fontWeight='bold' color='#213360'>Perawatan Kulit</Text>
     <Text fontSize='sm' fontWeight='semibold'>Penuhi nutrisi kulit anda</Text>
    </Box>
   </Box>


  </Box >
 )
}