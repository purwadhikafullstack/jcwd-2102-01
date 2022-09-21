import {
 Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
 MenuDivider, Text, Icon, useDisclosure, Link, Modal, Button, Center, VStack
} from '@chakra-ui/react';
import AdminNavBar from "../../../components/admin/sidebar/AdminNavBar";
import SideBar from "../../../components/admin/sidebar/sidebar";
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import AdmFooter from '../../../components/admin/admfooter/admfooter';
import Metatag from '../../../components/metatag/Metatag';
import AllTransactions from '../../../components/admin/transaction/AllTransactions';

export default function transaction() {
 const userSelector = useSelector((state) => state.auth);
 const [isLoading, setIsLoading] = useState(true)
 const router = useRouter();
 const url = "http://localhost:3000/" + router.pathname;
 return (
  <Metatag title={"Admin | Daftar Transaksi"} description={"Daftar Transaksi"}
   url={url} type="website">
   <Flex  >
    <SideBar />
    <Box display='flex' flexDirection='column' justifyContent='space-between'>
     <Box>
      <AdminNavBar />
      <Flex flexWrap={'wrap'} px='40px' py='15px' bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
       <Box>
        <Text fontWeight='bold' fontSize='2xl' mb='20px'>
         Semua Pesanan
        </Text>
        <Box>
         <AllTransactions />
        </Box>
       </Box>
       <Box m='10px' w='300px'></Box>
       <Box m='10px' w='300px'></Box>
       <Box m='10px' w='300px'></Box>
       <Box m='10px' w='300px'></Box>
      </Flex>
     </Box>

     <Box>
      <AdmFooter />
     </Box>

    </Box>
   </Flex>
  </Metatag >

 )
}