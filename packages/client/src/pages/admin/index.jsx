import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import AdminNavBar from "../../components/admin/sidebar/AdminNavBar";
import SideBar from "../../components/admin/sidebar/sidebar";
import AdmFooter from '../../components/admin/admfooter/admfooter';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

export default function Dashboard() {
 const userSelector = useSelector((state) => state.auth);
 const [isLoading, setIsLoading] = useState(true);
 const router = useRouter();
 const url = "http://localhost:3000" + router.pathname;

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
  <>
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
     <Flex bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
      <SideBar />
      <Box >
       <AdminNavBar />
       <Flex flexWrap={'wrap'} p='30px'>
        <Box>
         <Text fontWeight='bold' fontSize='2xl' mb='20px'>
          Dashboard
         </Text>
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
    </>
   }
  </>

 )
}