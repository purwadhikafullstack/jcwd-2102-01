import {
  Flex, Box, Text, Button, InputGroup, InputLeftElement, Icon,
  InputRightElement, Input, Tooltip, Divider
} from '@chakra-ui/react';
import Footer from '../../../components/footer/Footer';
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import Metatag from '../../../components/metatag/Metatag';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ProductCartList from './ProductCartList';
import { axiosInstance } from '../../../lib/api';

export default function CartTrasanctions() {
  const userSelector = useSelector((state) => state.auth);
  const autoRender = useSelector((state) => state.automateRendering)
  const dispatch = useDispatch();
  const router = useRouter();
  const [cart, setCart] = useState([])
  const [cartLength, setCartLength] = useState([])
  const [cartSubTotal, setCartSubTotal] = useState(0)
  const [addressLength, setAddressLength] = useState()

  // ---------- Fetching Address ---------- //
  async function fetchAddress() {
    try {
      axiosInstance.get(`address/user/` + userSelector.id)
        .then((res) => {
          const temp = res.data.result
          setAddressLength(temp.length)
          console.log(temp)
          console.log('address length' + temp.length)
        })
    } catch (err) {
      console.log(err)
    }
  };

  // --------------- Fetching Cart --------------- //
  async function fetchCart() {
    try {
      axiosInstance.get(`/transaction/getCart/${userSelector.id}`)
        .then((res) => {
          setCart(res.data.result)
          setCartLength(res.data.result.length)
          // console.log(res.data.result);
          // console.log(res.data.result[1].Product.Product_stocks[0].Unit.unit_name);
        })
    } catch (err) {
      console.log(err)
    }
  };

  let a = 0;

  useEffect(() => {
    // alert(a)
    setCartSubTotal(a);
  }, [cart])

  const renderCartList = () => {
    return cart.map((val, index) => {
      a += val.total_price;
      // console.log(a)

      return (
        <>
          <ProductCartList key={index}
            image={val.Product.Product_images[0].image_url}
            productName={val.Product.product_name}
            qtyBuy={val.buy_quantity}
            price={val.price}
            totalPrice={val.total_price}
            idCart={val.id}
            firstPrice={val.Product.Product_stocks[0].first_price}
            unit={val.Product.Product_stocks[0].Unit.unit_name}
            idProduct={val.Product.product_code}
            idUser={val.id_user}
          />
        </>
      )
    })
  }

  const orderNow = async () => {
    if (addressLength == 0) {
      await router.push(`/transactions/mycart/addAddress`);
    } else {
      await router.push(`/transactions/myorder`);
    }
  }

  useEffect(() => {
    fetchCart()
    fetchAddress()
  }, [router.isReady]);

  useEffect(() => {
    fetchCart()
    fetchAddress()
  }, [autoRender]);


  return (
    <Box>
      <Text mx='15px' mb='5px' fontWeight='bold' fontSize='2xl' color='#213360'>
        Keranjang Saya
      </Text>

      <Box display='flex' justifyContent='center' flexWrap={'wrap'}>

        {/* -------------------- Cart List -------------------- */}
        <Box minW='370px' w={'55vw'} mx='15px' my='10px' p='25px' px='20px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
          {renderCartList()}
        </Box>

        {/* -------------------- Total Order -------------------- */}
        <Box h='250px' p='25px' minW='370px' w={'22vw'} mx='15px' mt='10px' mb='20px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
          <Text fontWeight='bold' fontSize='lg'>
            Total
          </Text>
          <Box display='flex' mt='20px' justifyContent='space-between' >
            <Text fontWeight='semibold'>
              Sub Total Belanja
            </Text>
            <Text fontWeight='semibold'>
              Rp {cartSubTotal.toLocaleString()}
            </Text>
          </Box>
          <Divider my='20px' />
          <Box display='flex' mt='20px' justifyContent='space-between' >
            <Text fontWeight='bold'>
              Total Belanja
            </Text>
            <Text fontWeight='bold'>
              Rp {cartSubTotal.toLocaleString()}
            </Text>
          </Box>
          <Box mt='20px' display='flex' justifyContent='flex-end' >
            <Button w='full' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px'
              _hover={{ bg: '#009B90', color: 'white' }} disabled={userSelector.id ? false : true}
              onClick={() => orderNow()}>
              Order Sekarang
            </Button>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}