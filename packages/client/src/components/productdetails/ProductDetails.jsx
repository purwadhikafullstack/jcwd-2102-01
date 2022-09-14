import {
  Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
  MenuDivider, Text, Image, Icon, useToast, useDisclosure, Link, Modal, Button, Center, FormControl, FormHelperText
} from '@chakra-ui/react';
import Footer from "../../components/footer/Footer"
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { axiosInstance } from "../../lib/api"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import qs from 'qs';
import * as Yup from "yup";
import NextImage from 'next/image'

export default function ProductDetailsComp(props) {
  const { productId, productCode, productName, isiPerkemasan, isDeleted, productCategory,
    productImage, stock, firstPrice, sellingPrice, converted, unit, berat, kegunaan, komposisi,
    kemasan, golongan, caraSimpan, nie, caraPakai, peringatan
  } = props
  const percentage = parseInt((firstPrice - sellingPrice) / firstPrice * 100);
  const [category, setCategory] = useState([])
  const [imageProduct, setImageProduct] = useState([])
  const [imageView, setImageView] = useState()
  const [qtyProduct, setQtyProduct] = useState(0)
  const dispatch = useDispatch()
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth)
  const autoRender = useSelector((state) => state.automateRendering)

  const formik = useFormik({
    initialValues: {
      quantity: ``,
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number().required("harap isi quantity").
        min(1, 'minimal quantity 1').max(stock, 'maaf stok tidak mencukupi')
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { quantity } = formik.values
      let msg = ''
      try {
        let body = {
          buy_quantity: quantity,
          price: parseFloat(sellingPrice),
          total_price: parseFloat(sellingPrice) * parseFloat(quantity),
          // note : "", 
          id_user: userSelector.id,
          id_product: productId
        }

        let res = await axiosInstance.post(`/transaction/addCart/${userSelector.id}`, qs.stringify(body))
        msg = res.data.message;
        console.log(res.data.message);

        dispatch({
          type: "FETCH_RENDER",
          payload: { value: !autoRender.value }
        })

        if (msg == "Error: Maaf data keranjang anda melebihi produk stok" || msg == "Maaf produk stok tidak mencukupi") {
          toast({
            title: `Quantity beli Produk ${productName} di keranjang anda sudah melebihi stok / stok tiak mencukupi`,
            status: "error",
            isClosable: true,
          })
        } else {
          toast({
            title: `Berhasil Menambah ${formik.values.quantity} ${unit} Produk ${productName} ke keranjang`,
            status: "success",
            isClosable: true,
          })
        }

      } catch (err) {
        console.log(err);

      }
      formik.setSubmitting(false)
    }
  })

  // --------------- Incriment QTY --------------- //
  async function increment() {
    try {

      console.log(qtyProduct);
    } catch (err) {
      console.log(err)
    }
  };



  // --------------- Fetching Category Per Product --------------- //
  async function fetchCategory() {
    try {
      axiosInstance.get(`/category/idProduct/${productId}`)
        .then((res) => {
          setCategory(res.data.result)
          // const temp = res.data.result
          // console.log(temp)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderCategory = () => {
    return category.map((val) => {
      return (
        <Button borderColor='#009B90' borderRadius='15px' bg='white' borderWidth='2px' mr='5px' my='2px'
          _hover={{ bg: '#009B90', color: 'white' }} size='xs'>{val.Category?.category}</Button>
      )
    })
  }

  // ---------- Fetching Image Per Product ---------- //
  async function fetchImageProduct() {
    try {
      axiosInstance.get(`/products/productImage/${productId}`)
        .then((res) => {
          setImageProduct(res.data.result)
          const temp = res.data.result
          console.log(temp)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderImageProduct = () => {
    return imageProduct.map((val) => {
      return (
        <Box onClick={() => setImageView(val.image_url)} h='100px' w='100px' mt='5px' ml='5px' overflow='hidden' _hover={{ borderWidth: '1px', borderColor: '#009B90', cursor: 'pointer' }}>
          <Image objectFit='cover' src={`http://${val.image_url}`} width='100px' height='100px' />
        </Box>
      )
    })
  }

  useEffect(() => {
    fetchCategory()
    fetchImageProduct()
    // console.log(imageView);
  }, []);

  useEffect(() => {
    fetchImageProduct()
    // console.log(imageView);
  }, [imageView]);


  return (
    <>
      <Box m='5px'>
        <Box h='350px' w='350px' bg='white' borderRadius='8px'>
          {!imageView ?
            <Image objectFit='contain' src={`http://${productImage}`} width='350px' height='350px' />
            :
            <Image objectFit='contain' src={`http://${imageView}`} width='350px' height='350px' />
          }
        </Box>
        <Box display='flex' flexWrap='wrap' w='350px' mb='10px' justifyContent='space-evenly'>
          {renderImageProduct()}

          {/* ----- Jangan dihapus ----- */}
          <Box w='100px' mt='5px' ml='5px'></Box>
          <Box w='100px' mt='5px' ml='5px'></Box>
          <Box w='100px' mt='5px' ml='5px'></Box>
        </Box>
      </Box>

      <Box m='5px' p='5px'>
        <Box>
          <Text fontWeight='bold' fontSize='2xl' maxW='600px'>{productName}</Text>
          <Box display='flex'>
            {renderCategory()}
          </Box>
          {!firstPrice ? <></> :
            <Box display='flex' mt='5px'>
              <Text fontWeight='bold' fontSize='sm' color='#213360' textColor='#FF6B6B' mr='5px'>{percentage.toLocaleString()}%</Text>
              <Text fontWeight='semibold' fontSize='sm' color='#737A8D' as='s' >Rp {firstPrice?.toLocaleString()}</Text>
            </Box>}
          <Box display='flex'>
            <Text fontWeight='bold' fontSize='md' mt='5px'>Rp {sellingPrice?.toLocaleString()}</Text>
            <Text fontWeight='semibold' fontSize='sm' mt='5px'> &nbsp; / {unit}</Text>
          </Box>
          <Box display='flex' mt='15px' justifyContent='flex-start'>
            {formik.values.quantity}
            <FormControl isInvalid={formik.errors.quantity} w='160px'>
              <InputGroup w='150px' size='sm'>
                <InputLeftElement bg='#009B90' borderLeftRadius='5px' color='white'
                  onClick={() => setQtyProduct(qtyProduct == 0 ? 0 : qtyProduct - 1)}>
                  <Icon boxSize='5' as={HiMinusSm} sx={{ _hover: { cursor: "pointer" } }} />
                </InputLeftElement>
                <Input textAlign='center' type='number' borderRadius='5px' placeholder='qty' required bg='white'
                  onChange={(event) => formik.setFieldValue("quantity", event.target.value)}
                />formik.handleChange(event.target.name)(parseInt(event.target.value, 10))
                <InputRightElement bg='#009B90' borderRightRadius='5px' color='white'
                  // onClick={() => setQtyProduct(qtyProduct == stock ? stock : qtyProduct + 1)}>

                  onClick={(event) => formik.setFieldValue("quantity", event.target.valueAsNumber + 1)}>
                  <Icon boxSize='5' as={HiPlusSm} sx={{ _hover: { cursor: "pointer" } }} />
                </InputRightElement>
              </InputGroup>
              <FormHelperText color='red'>{formik.errors.quantity}</FormHelperText>
            </FormControl>
            <Box>
              <Text size='sm' alignSelf='end' ml='15px'>Sisa {stock} {unit}</Text>
            </Box>
          </Box>

          <Button w='200px' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px' my='25px'
            _hover={{ bg: '#009B90', color: 'white' }} onClick={formik.handleSubmit}>
            <Icon boxSize='6' as={IoCartOutline} mr='5px' />
            Keranjang</Button>
        </Box>

        <Box mb='15px' h='45px' display='flex' borderTopWidth='2px' borderBottomWidth='2px' >
          <Text fontWeight='bold' alignSelf='center'  >Deskripsi</Text>
        </Box>

        <Box display='flex' flexWrap='wrap' maxW='600px'>
          <Box w='250px' >
            <Text fontWeight='bold' fontSize='sm' mb='15px'>Indikasi / Kegunaan</Text>
          </Box>
          <Box w='350px'>
            <Text fontWeight='semibold' fontSize='sm' mb='15px'>{kegunaan}</Text>
          </Box>
          <Box w='250px'>
            <Text fontWeight='bold' fontSize='sm' mb='15px'>Berat</Text>
          </Box>
          <Box w='350px'>
            <Text fontWeight='semibold' fontSize='sm' mb='15px'>{berat} (gram)</Text>
          </Box>
          <Box w='250px'>
            <Text fontWeight='bold' fontSize='sm' mb='15px'>Kandungan / Komposisi</Text>
          </Box>
          <Box w='350px'>
            <Text fontWeight='semibold' fontSize='sm' mb='15px'>{komposisi}</Text>
          </Box>
          <Box w='250px'>
            <Text fontWeight='bold' fontSize='sm' mb='15px'>Kemasan</Text>
          </Box>
          <Box w='350px'>
            <Text fontWeight='semibold' fontSize='sm' mb='15px'>{kemasan}</Text>
          </Box>
          <Box w='250px'>
            <Text fontWeight='bold' fontSize='sm' mb='15px'>Golongan</Text>
          </Box>
          <Box w='350px'>
            <Text fontWeight='semibold' fontSize='sm' mb='15px'>{golongan}</Text>
          </Box>
          <Box w='250px'>
            <Text fontWeight='bold' fontSize='sm' mb='15px'>Nomor Izin Edar</Text>
          </Box>
          <Box w='350px'>
            <Text fontWeight='semibold' fontSize='sm' mb='15px'>{nie}</Text>
          </Box>
          <Box w='250px'>
            <Text fontWeight='bold' fontSize='sm' mb='15px'>Cara Pakai</Text>
          </Box>
          <Box w='350px'>
            <Text fontWeight='semibold' fontSize='sm' mb='15px'>{caraPakai}</Text>
          </Box>
          <Box w='250px'>
            <Text fontWeight='bold' fontSize='sm' mb='15px'>Cara Simpan</Text>
          </Box>
          <Box w='350px'>
            <Text fontWeight='semibold' fontSize='sm' mb='15px'>{caraSimpan}</Text>
          </Box>
          <Box w='250px'>
            <Text fontWeight='bold' fontSize='sm' mb='15px'>Peringatan</Text>
          </Box>
          <Box w='350px'>
            <Text fontWeight='semibold' fontSize='sm' mb='15px'>{peringatan}</Text>
          </Box>
        </Box>
      </Box>
    </>
  )
}