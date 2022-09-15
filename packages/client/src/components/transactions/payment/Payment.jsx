import {
  Flex, Box, Text, Button, InputGroup, InputLeftElement, Icon, useDisclosure,
  InputRightElement, Input, Tooltip, Divider, useToast, Link,
  Modal, ModalOverlay, ModalHeader, ModalBody, ModalCloseButton, ModalContent, Stack, Center
} from '@chakra-ui/react';
import Image from 'next/image';
import bank_bca from '../../../assets/img/metode_pembayaran/bank_bca.png'
import { axiosInstance } from '../../../lib/api';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import ProductOrderList from './ProductOrderList';
import { RiFileCopyFill } from 'react-icons/ri';

export default function Payment() {
  const userSelector = useSelector((state) => state.auth);
  const autoRender = useSelector((state) => state.automateRendering)
  const toast = useToast();
  const router = useRouter();
  const [cart, setCart] = useState([])
  const [cartSubTotal, setCartSubTotal] = useState(0)
  const [cartWeight, setCartWeight] = useState(0)
  const [totalSeluruh, setTotalSeluruh] = useState()

  // --------------- Fetching Cart --------------- //
  async function fetchCart() {
    try {
      axiosInstance.get(`/transaction/getCart/${userSelector.id}`)
        .then((res) => {
          setCart(res.data.result)
          // setCartLength(res.data.result.length)
          // console.log(res.data.result);
          // console.log(res.data.result[1].Product.Product_stocks[0].Unit.unit_name);
        })
    } catch (err) {
      console.log(err)
    }
  };

  // ---------- ambil data subtotal dan total berat produk ---------- //
  let subTotal = 0;
  let totalWeight = 0;

  useEffect(() => {
    // alert(a)
    setCartWeight(totalWeight)
    setCartSubTotal(subTotal);
  }, [cart])

  // ---------- Render cart list ---------- //
  const renderCartList = () => {
    return cart.map((val, index) => {
      subTotal += val.total_price;
      totalWeight += (val.buy_quantity * val.Product.Product_description.weight)
      // console.log(subTotal)
      // console.log(totalWeight)
      return (
        <>
          <ProductOrderList key={index}
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
    }
    )
  }

  useEffect(() => {
    fetchCart()
  }, [router.isReady]);

  useEffect(() => {
    fetchCart()
  }, [autoRender]);

  return (
    <Box px='20px'>
      <Text fontWeight='bold' fontSize='2xl' color='#213360'>
        Menunggu Pembayaran
      </Text>

      {/* -------------------- Batas Pembayaran -------------------- */}
      <Box display='flex' px='30px' flexWrap='wrap' my='10px' p='20px' justifyContent='center' boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
        <Box w='360px'>
          <Text fontWeight='semibold' color='#737A8D' fontSize='sm'>
            Batas Akhir Pembayaran
          </Text>
          <Text fontWeight='semibold' color='#213360'>
            Kamis, 21 Maret 2022, 20.45 WIB
          </Text>
        </Box>
        <Center w='360px' display='flex'>
          <Center w='30px' h='30px' m='10px' borderRadius='5px' bg='#FF6B6B' color='white'>
            <Text>
              20
            </Text>
          </Center>
          <Center borderRadius='5px' color='#FF6B6B'>
            <Text fontWeight='bold'>
              :
            </Text>
          </Center>
          <Center w='30px' h='30px' m='10px' borderRadius='5px' bg='#FF6B6B' color='white'>
            <Text>
              20
            </Text>
          </Center>
          <Center borderRadius='5px' color='#FF6B6B'>
            <Text fontWeight='bold'>
              :
            </Text>
          </Center>
          <Center w='30px' h='30px' m='10px' borderRadius='5px' bg='#FF6B6B' color='white'>
            <Text>
              20
            </Text>
          </Center>

        </Center>
      </Box>

      {/* -------------------- Ringkasan Order -------------------- */}
      <Box my='25px' p='20px' px='30px' justifyContent='space-between' boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
        <Box mb='10px'>
          <Text fontWeight='bold' fontSize='lg' color='#213360'>
            Ringkasan Order
          </Text>
        </Box>
        <Box>
          {renderCartList()}
        </Box>
        <Divider />
        <Box display='flex' mt='10px'>
          <Text fontWeight='semibold' color='#213360'>
            Total Pembayaran
          </Text>
        </Box>
      </Box>

      {/* -------------------- Bank -------------------- */}
      <Box my='25px' p='20px' px='30px' boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
        <Box mb='10px' justifyContent='space-between' display='flex'>
          <Text fontWeight='bold' fontSize='lg' color='#213360'>
            Rekening BCA
          </Text>
          <Image src={bank_bca} width='80px' height='23px' />
        </Box>
        <Divider />
        <Box my='10px'>
          <Text fontSize='2xl' fontWeight='bold' color='#213360'>
            PT. HEALTHYMED INDONESIA
          </Text>
          <Text color='#737A8D' fontSize='sm' fontWeight='semibold'>
            Nomor Rekening BCA.
          </Text>
          <Box display='flex' justifyContent='space-between'>
            <Text fontSize='2xl' fontWeight='bold' color='#213360'>
              80777082261130123
            </Text>
            {/* <Tooltip label='Salin' fontSize='sm' > */}
            <Button variant='link' color='#009B90' _hover={{ textDecoration: 'none' }} size='sm'
              onClick={() => {
                navigator.clipboard.writeText(`80777082261130123`)
                // setLinkCopy(true)
                toast({
                  title: "Berhasil Salin No.Rekening",
                  status: "success",
                  isClosable: true,
                })
              }}>
              <Text fontWeight='bold'>Salin</Text> &nbsp;
              <Icon boxSize={4} as={RiFileCopyFill} />
            </Button>

          </Box>
        </Box>
        <Box >
          <Text fontWeight='semibold' color='#737A8D' fontSize='sm'>
            Total Pembayaran
          </Text>
          <Text fontSize='xl' fontWeight='bold' color='#213360'>
            Rp 1.000.000
          </Text>
        </Box>

        {/* ----- Upload Bukti Transfer ----- */}
        <Box mt='20px'>
          <Button variant='link' color='#009B90' _hover={{ textDecoration: 'none' }} size='sm'>
            <Icon boxSize={4} as={RiFileCopyFill} /> &nbsp;
            <Text fontWeight='bold'> Upload Bukti Transfer</Text>
          </Button>
        </Box>
      </Box>

      <Box display='flex' mb='5px'>
        <Button w='full' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px' m='10px'
          _hover={{ bg: '#009B90', color: 'white' }} >
          Batalkan Pesanan
        </Button>
        <Button w='full' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px' m='10px'
          _hover={{ bg: '#009B90', color: 'white' }} >
          Cek Status Pembayaran
        </Button>
      </Box>

      <Divider />

      {/* ----- Cara Pembayaran -----  */}
      <Box my='25px'>
        <Text fontSize='xl' fontWeight='bold' color='#213360'>
          Cara Pembayaran
        </Text>
        <Text my='20px' fontSize='lg' fontWeight='bold' color='#213360'>
          ATM BCA
        </Text>
        <Text maxW='720px'>
          1. Masukkan Kartu ATM BCA & PIN. <br />
          2. Pilih menu Transaksi Lainnya {'>'} Transfer {'>'} ke Rekening BCA.<br />
          3. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti No rekening, Nama dan Total Tagihan.<br />
          4. Pastikan nama kamu dan Total Tagihannya benar.<br />
          5. Jika sudah benar, klik Ya.<br />
          6. Simpan struk transaksi sebagai bukti pembayaran.<br />
        </Text>
      </Box>

    </Box>
  )
}