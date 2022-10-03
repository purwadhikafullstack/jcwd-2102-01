import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import AdminNavBar from "../../../components/admin/sidebar/AdminNavBar";
import SideBar from "../../../components/admin/sidebar/sidebar";
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import AdmFooter from '../../../components/admin/admfooter/admfooter';
import Metatag from '../../../components/metatag/Metatag';
import AllTransactions from '../../../components/admin/transaction/AllTransactions';

export default function Transaction() {
 const userSelector = useSelector((state) => state.auth);
 const [isLoading, setIsLoading] = useState(true)
 const router = useRouter();
 const url = "http://localhost:3000/" + router.pathname;

 useEffect(() => {
  if (!userSelector?.id) {
   router.push("/login")
  }
  else if (userSelector?.id && userSelector.roles == "User") {
   router.push("/")
  }
  else {
   setIsLoading(false);
  }
 }, [userSelector?.id]);

 return (
  <Metatag title={"Admin | Daftar Transaksi"} description={"Daftar Transaksi"}
   url={url} type="website">
   {isLoading ?
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
     <Spinner thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl' /> &nbsp; loading...
    </Flex>
    :
    <>
     <Flex minW='500px'>
      <SideBar />
      <Box display='flex' flexDirection='column' justifyContent='space-between'>
       <Box  >
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
    </>}
  </Metatag >

 )
}