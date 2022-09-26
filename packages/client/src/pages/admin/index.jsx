import {
 Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, Button, Center, VStack
} from '@chakra-ui/react';
import AdminNavBar from "../../components/admin/sidebar/AdminNavBar";
import SideBar from "../../components/admin/sidebar/sidebar";
import AdmFooter from '../../components/admin/admfooter/admfooter';

export default function Dashboard() {
 return (
  <Flex bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
   <SideBar />
   <Box >
    <AdminNavBar />
    <Flex flexWrap={'wrap'} p='30px'>
     <Box>
      <Text fontWeight='bold' fontSize='2xl' mb='20px'>
       Data Produk
      </Text>
      <Button>Tambah Produk</Button>
     </Box>
     <Box>

     </Box>

     <Box m='10px' w='300px'></Box>
     <Box m='10px' w='300px'></Box>
     <Box m='10px' w='300px'></Box>
     <Box m='10px' w='300px'></Box>

    </Flex>
    <AdmFooter />

   </Box>

  </Flex>

 )
}