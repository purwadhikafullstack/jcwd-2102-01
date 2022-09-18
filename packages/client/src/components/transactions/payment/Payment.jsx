import {
  Flex, Box, Text, Button, InputGroup, InputLeftElement, Icon, useDisclosure,
  InputRightElement, Input, Tooltip, Divider, useToast, Link, ModalFooter,
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
import qs from 'qs';
import UploadPayment from './UploadPayment';

export default function Payment() {
  const { isOpen: isOpenCancel, onOpen: onOpenCancel, onClose: onCloseCancel } = useDisclosure()
  const { isOpen: isOpenPayment, onOpen: onOpenPayment, onClose: onClosePayment } = useDisclosure()
  const userSelector = useSelector((state) => state.auth);
  const autoRender = useSelector((state) => state.automateRendering)
  const dispatch = useDispatch()
  const toast = useToast();
  const router = useRouter();
  const [transactionList, setTransactionList] = useState([])
  const [noInv, setNoInv] = useState()
  const [totalOrder, setTotalOrder] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [totalPaid, settotalPaid] = useState(0)
  const [address, setAddress] = useState()
  const [recieverName, setRecieverName] = useState()
  const [phoneReciever, setPhoneReciever] = useState()

  // --------------- Fetching Cart --------------- //
  async function fetchTransactionOrder() {
    try {
      const { noInvoice } = router.query

      await axiosInstance.post(`/transaction/api/v1/user/${userSelector.id}/invoice/${noInvoice}`)
        .then((res) => {
          setTransactionList(res.data.result[0].Transaction_lists)
          setNoInv(res.data.result[0].no_invoice)
          setTotalOrder(res.data.result[0].total_transaction)
          setShippingCost(res.data.result[0].shipping_cost)
          settotalPaid(res.data.result[0].total_paid)
          setAddress(res.data.result[0].Address.address)
          setRecieverName(res.data.result[0].Address.receiver_name)
          setPhoneReciever(res.data.result[0].Address.receiver_phone)
          // console.log(res.data.result);
          // console.log(res.data.result[0].Address);
          // console.log(res.data.result[1].Product.Product_stocks[0].Unit.unit_name);
        })
    } catch (err) {
      console.log(err)
    }
  };

  // ---------- Render cart list ---------- //
  const renderOrderList = () => {
    return transactionList.map((val, index) => {
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

  // ----- cancel transaction
  const cancelTransaction = async () => {
    try {
      const { noInvoice } = router.query

      let body = {
        transaction_status: "Dibatalkan"
      }
      await axiosInstance.patch("/transaction/api/v1/invoice/" + noInvoice, qs.stringify(body))
      dispatch({
        type: "FETCH_RENDER",
        payload: { value: !autoRender.value }
      })
      toast({
        title: "Succes",
        description: "berhasil membatalkan transaksi",
        status: "warning",
        isClosable: true,
      })
    } catch (err) {
      console.log(err);
    }
  }

  // ------ upload payment


  useEffect(() => {
    fetchTransactionOrder()
  }, [router.isReady]);

  useEffect(() => {
    fetchTransactionOrder()
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
        <Center w='360px' display='flex' justifyContent='flex-end'>
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
        <Box mb='10px' display='flex' justifyContent='space-between'>
          <Text fontWeight='bold' fontSize='lg' color='#213360'>
            Ringkasan Order
          </Text>
        </Box>

        <Box my='10px'>
          <Box display='flex' >
            <Text fontWeight='semibold' color='#213360' w='130px'>
              No Transaksi
            </Text>:
            <Text fontWeight='semibold' color='#213360' ml='5px'>
              {noInv}
            </Text>
          </Box>
          <Box display='flex' >
            <Text fontWeight='semibold' color='#213360' w='130px'>
              Nama Penerima
            </Text>:
            <Text fontWeight='semibold' color='#213360' ml='5px'>
              {recieverName} ({phoneReciever})
            </Text>
          </Box>
          <Box display='flex' >
            <Text fontWeight='semibold' color='#213360' w='130px'>
              Alamat
            </Text>:
            <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
              {address}
            </Text>
          </Box>
        </Box>

        <Box>
          {renderOrderList()}
        </Box>
        <Divider />
        <Box mt='10px'>
          <Box display='flex' justifyContent='space-between'>
            <Text fontWeight='semibold' color='#213360'>
              Total
            </Text>
            <Text fontWeight='semibold' color='#213360'>
              Rp {totalOrder.toLocaleString()}
            </Text>
          </Box>
          <Box display='flex' justifyContent='space-between' mt='7px'>
            <Text fontWeight='semibold' color='#213360'>
              Biaya Pengiriman
            </Text>
            <Text fontWeight='semibold' color='#213360'>
              Rp {shippingCost.toLocaleString()}
            </Text>
          </Box>
          <Box display='flex' justifyContent='space-between' mt='7px'>
            <Text fontWeight='semibold' color='#213360'>
              Total Pembayaran
            </Text>
            <Text fontWeight='semibold' color='#213360'>
              Rp {totalPaid.toLocaleString()}
            </Text>
          </Box>
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
            Rp {totalPaid.toLocaleString()}
          </Text>
        </Box>

        {/* ----- Upload Bukti Transfer ----- */}
        <Box mt='20px'>
          <Button onClick={onOpenPayment} variant='link' color='#009B90' _hover={{ textDecoration: 'none' }} size='sm'>
            <Icon boxSize={4} as={RiFileCopyFill} /> &nbsp;
            <Text fontWeight='bold'> Upload Bukti Transfer</Text>
          </Button>

          <Modal isOpen={isOpenPayment} onClose={onClosePayment} size='lg'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Unggah Bukti Pembayaran</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <UploadPayment />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>

      <Box display='flex' mb='5px'>
        <Button w='full' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px' m='10px'
          _hover={{ bg: '#009B90', color: 'white' }} onClick={() => onOpenCancel()}>
          Batalkan Pesanan
        </Button>
        <Modal isOpen={isOpenCancel} onClose={onCloseCancel} size='sm'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Batalkan Pesanan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box justifyContent={'space-between'}>
                <Text>Apakah anda yakin ingin membatalakan pesanan ini?</Text>
              </Box>
            </ModalBody>
            <ModalFooter pt='5px'>
              <Button colorScheme='blue' mr={3} onClick={onCloseCancel}>
                Tidak
              </Button>
              <Button mr={3} colorScheme='red' onClick={() => {
                async function submit() {
                  await cancelTransaction();
                  onCloseCancel();
                }
                submit()
              }}>
                Batalkan
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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