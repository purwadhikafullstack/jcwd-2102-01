import { Flex, Spinner } from '@chakra-ui/react';
import Footer from '../../../components/footer/Footer';
import NavBar from "../../../components/navbar/NavBar"
import NavBarSignIn from "../../../components/navbar/NavBarSignIn"
import Metatag from '../../../components/metatag/Metatag';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import CartTrasanctions from '../../../components/transactions/CartTransactions';

export default function MyCart() {
  const userSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  const url = "http://localhost:3000/" + router.pathname;

  useEffect(() => {
    if (!userSelector?.id) {
      router.push("/login")
    }
    else {
      setIsLoading(false);
    }
  }, [userSelector?.id]);

  return (
    <>
      {isLoading ?
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg='#F7FAFC' >
          <Spinner thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl' /> &nbsp; loading...
        </Flex>
        :
        <Metatag title={"Daftar Produk Healthymed"} description={"Daftar Produk Healthymed"}
          url={url} type="website">
          {userSelector.id ? <NavBarSignIn /> : <NavBar />}
          <Flex flexWrap={'wrap'} minH={'80vh'} justifyContent={'center'} py='20px' bgGradient='linear(to-t, #ffffff 50%, #ddf1f9 )' >

            <CartTrasanctions />
          </Flex >
          <Footer />
        </Metatag>
      }
    </>
  )
}