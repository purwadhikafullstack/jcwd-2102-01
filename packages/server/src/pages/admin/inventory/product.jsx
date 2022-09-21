import {
 Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, Button, Center, VStack
} from '@chakra-ui/react';
import AdminNavBar from "../../components/admin/sidebar/AdminNavBar";
import SideBar from "../../components/admin/sidebar/sidebar";
import AdmFooter from '../../components/admin/admfooter/admfooter';

export default function dashboard() {
 return (
  <Flex bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
   <SideBar />
   <Box >
    <AdminNavBar />
    <Flex flexWrap={'wrap'} p='15px'>

     {/* <Box m='10px' h='300px' w='300px'> Dashboard </Box>
     <Box m='10px' h='300px' w='300px'>  </Box>
     <Box m='10px' h='300px' w='300px'>  </Box>
     <Box m='10px' h='300px' w='300px'>  </Box> */}

    </Flex>
    <AdmFooter />

   </Box>

  </Flex>

 )
}