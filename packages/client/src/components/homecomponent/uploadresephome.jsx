import {
 Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalCloseButton, ModalOverlay, ModalHeader, ModalBody, ModalContent
} from '@chakra-ui/react';
import banner from '../../assets/img/bg.png'
import Image from 'next/image';
import AddRecipe from '../addrecipes/AddRecipe';

export default function HomeUploadResep() {
 const { isOpen: isOpenRecipe, onOpen: onOpenRecipe, onClose: onCloseRecipe } = useDisclosure()

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
     <Button onClick={onOpenRecipe} colorScheme='twitter' w='150px' mt='10px'>Upload resep</Button>
     <Modal isOpen={isOpenRecipe} onClose={onCloseRecipe} size='lg'>
      <ModalOverlay />
      <ModalContent>
       <ModalHeader>Unggah Resep Dokter</ModalHeader>
       <ModalCloseButton />
       <ModalBody pb={6}>
        <Box mb='10px'>
         <Text fontSize='sm' fontWeight='bold' color='#213360'>Tak perlu antri dan obat akan dikirimkan langsung ke lokasi anda</Text>
         <Text fontSize='sm' color='#213360'>Foto tidak boleh lebih dari 1mb</Text>
        </Box>
        <AddRecipe onClose={onCloseRecipe} />
       </ModalBody>
      </ModalContent>
     </Modal>
    </Box>
    <Box alignSelf='center'>
    </Box>
   </Box>
  </Box >
 )
}