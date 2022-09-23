import { Flex, Spinner } from '@chakra-ui/react';
import Footer from '../../../components/footer/Footer';
import NavBar from "../../../components/navbar/NavBar"
import NavBarSignIn from "../../../components/navbar/NavBarSignIn"
import Metatag from '../../../components/metatag/Metatag';
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MaddAddressCart from '../../../components/profilesetting/maddressadd/maddaddresscart';
import CartTrasanctions from '../../../components/transactions/CartTransactions';

export default function CartAddAddress() {
  const userSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const url = "http://localhost:3000/" + router.pathname;
  const [isLoading, setIsLoading] = useState(true)
  const [addressLength, setAddressLength] = useState()
  const [cartLength, setCartLength] = useState()

  // // ---------- Fetching Address ---------- //
  // async function fetchAddress() {
  //  try {
  //   // axiosInstance.get(`/ comment / post / ${ id } ? page = ${ startComment } & limit=${ 5}`)
  //   axiosInstance.get(`address/user/` + userSelector.id)
  //    .then((res) => {
  //     const temp = res.data.result
  //     setAddressLength(temp.length)
  //     // console.log(temp)
  //     // console.log('address length' + temp.length)
  //    })
  //  } catch (err) {
  //   console.log(err)
  //  }
  // };

  // // --------------- Fetching Cart --------------- //
  // async function fetchCart() {
  //  try {
  //   axiosInstance.get(`/transaction/getCart/${userSelector.id}`)
  //    .then((res) => {
  //     // setCart(res.data.result)
  //     // console.log(res.data.result);
  //     // console.log(res.data.result.length);
  //     setCartLength(res.data.result.length)
  //    })
  //  } catch (err) {
  //   console.log(err)
  //  }
  // };

  // useEffect(() => {
  //  fetchAddress()
  //  fetchCart()
  //  console.log(addaddressLength);
  //  console.log(cartLength);
  // }, [router.isReady]);

  // useEffect(() => {
  //  if (addressLength == 0 && cartLength == 0) {
  //   router.push("/productlist");
  //  } else if (addressLength >= 0 && cartLength == 0) {
  //   router.push("/productlist");
  //  } else if (addressLength >= 0 && cartLength >= 0) {
  //   router.push("/transactions/myorder");
  //  } else {
  //   setIsLoading(false);
  //  }
  // }, [userSelector?.id]);

  return (
    <>
      {/* {isLoading ?
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg='#F7FAFC' >
     <Spinner thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl' /> &nbsp; loading...
    </Flex>
    : */}
      <Metatag title={"Tambah alamat pengiriman"} description={"Tambah alamat pengiriman"}
        url={url} type="website">
        {userSelector.id ? <NavBarSignIn /> : <NavBar />}
        <Flex flexWrap={'wrap'} minH={'80vh'} justifyContent={'center'} py='20px' bgGradient='linear(to-t, #ffffff 50%, #ddf1f9 )' >

          <MaddAddressCart />

        </Flex >
        <Footer />
      </Metatag>
      {/* } */}
    </>
  )
}