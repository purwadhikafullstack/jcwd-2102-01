import { Flex, Spinner } from '@chakra-ui/react';
import Footer from '../../../components/footer/Footer';
import NavBar from "../../../components/navbar/NavBar"
import NavBarSignIn from "../../../components/navbar/NavBarSignIn"
import Metatag from '../../../components/metatag/Metatag';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Payment from '../../../components/transactions/payment/Payment';

export default function paymentPage() {
  const userSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  const url = "http://localhost:3000" + router.pathname;

  useEffect(() => {
    if (userSelector.id) {
      // setIsLoading(true);
      setIsLoading(false);
    } else {
      router.push("/");
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
        <Metatag title={"Pembayaran Transaksi"} description={"Pembayaran Transaksi Healthymed"}
          url={url} type="website">
          <NavBarSignIn />
          <Flex flexWrap={'wrap'} minH={'80vh'} justifyContent={'center'} py='20px' bgGradient='linear(to-t, #ffffff 50%, #ddf1f9 )' >
            <Payment />
          </Flex >
          <Footer />
        </Metatag>
      }
    </>
  )
}