import {
  Flex, Box, Input, InputGroup, InputRightElement, Button, useDisclosure,
  Select, Icon, Text, Center, CheckboxGroup, Checkbox, Stack, useMediaQuery,
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader,
  DrawerBody
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { axiosInstance } from '../../lib/api';
import { BiSearchAlt } from 'react-icons/bi';
import { RiListCheck } from 'react-icons/ri';
import { BsFilterLeft } from 'react-icons/bs';
import { IoCartOutline } from "react-icons/io5";
import NextImage from 'next/image'
import ProductCard from './prouctcard/ProductCard';
import SideFilterCategory from './filter/filtercategory/SideFilterCategory';

export default function ProductListing() {
  const { isOpen: isOpenCategory, onOpen: onOpenCategory, onClose: onCloseCategory } = useDisclosure()
  const autoRender = useSelector((state) => state.automateRendering)
  const [filtermobile] = useMediaQuery('(min-width: 1059px)')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const [category, setCategory] = useState([])
  const [product, setProduct] = useState([])

  // ---------- Fetching Category ---------- //
  async function fetchCategory() {
    try {
      // axiosInstance.get(`/comment/post/${id}?page=${startComment}&limit=${5}`)
      axiosInstance.get(`/category`)
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
    return category.map((val, index) => {
      return (
        <SideFilterCategory key={index}
          idcategory={val.id}
          category={val.category}
        />
      )
    })
  }

  // ---------- Fetching Product ---------- //
  async function fetchProduct() {
    try {
      // axiosInstance.get(`/comment/post/${id}?page=${startComment}&limit=${5}`)
      axiosInstance.get(`/products`)
        .then((res) => {
          setProduct(res.data.result)
          const temp = res.data.result
          console.log(temp)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderProduct = () => {
    return product.map((val, index) => {
      return (
        <ProductCard key={index}
          productId={val.id}
          productCode={val.product_code}
          productName={val.product_name}
          isiPerkemasan={val.isi_perkemasan}
          isDeleted={val.is_deleted}
          // productCategory={ }
          productImage={val.Product_imgs[0]?.img_product}
          stock={val.Product_stocks[0]?.stock}
          unit={val.Product_stocks[0]?.Unit?.unit_name}
          firstPrice={val.Product_stocks[0]?.first_price}
          sellingPrice={val.Product_stocks[0]?.selling_price}
          converted={val.Product_stocks[0]?.converted}
        />
      )
    })
  }

  useEffect(() => {
    fetchCategory()
    fetchProduct()
  }, []);

  // useEffect(() => {
  //   fetchCategory()
  // }, [autoRender]);

  return (
    <>
      <Flex flexWrap={'wrap'} justifyContent={'center'}>
        <Box className='filter' mr='10px'>
          <Box w='220px' m='10px' mb='20px' borderWidth='1px' boxShadow='md' bg='white' borderRadius='7px'>
            <Box alignItems={'center'} h='50px' borderTopRadius='7px' align='center' bg='#009B90' display='flex'>
              <Box h='25px' w='30px' ml='10px'>
                <Icon boxSize='6' as={BsFilterLeft} color='white' />
              </Box>
              <Box h='25px'>
                <Text mx='10px' fontWeight='bold' color='white'>
                  Urut Berdasarkan
                </Text>
              </Box>
            </Box>
            <Box p='15px'>
              <Select onChange={(event) => formik.setFieldValue("filter", event.target.value)}
              // defaultValue={userSelector.gender}
              >
                <option value='Lainnya'>Nama A-Z</option>
                <option value='Laki-laki'>Nama Z-A</option>
                <option value='Perempuan'>Harga Tertinggi</option>
                <option value='Perempuan'>Harga Terendah</option>
              </Select>
            </Box>
          </Box>

          <Box w='220px' m='10px' borderWidth='1px' boxShadow='md' bg='white' borderRadius='7px'>
            <Box alignItems={'center'} h='50px' borderTopRadius='7px' align='center' bg='#009B90' display='flex'>
              <Box h='25px' w='30px' ml='10px'>
                <Icon boxSize='6' as={RiListCheck} color='white' />
              </Box>
              <Box h='25px'>
                <Text mx='10px' fontWeight='bold' color='white'>
                  Filter Kategori
                </Text>
              </Box>
            </Box>
            <Box px='20px' py='10px'>
              {renderCategory()}
            </Box>
          </Box>
        </Box>

        <Box mx='5px' my='10px' maxW='810px'>
          <Box display='flex' justifyContent='space-between' mb='10px'>
            <Box display='flex' alignSelf='center' ml='10px'>
              <Text alignSelf='center' mr='10px'>Show</Text>
              <Select size='sm' bg='white' borderRadius='5px' onChange={(event) => formik.setFieldValue("filter", event.target.value)}
              // defaultValue={userSelector.gender}
              >
                <option value='12'>12</option>
                <option value='20'>20</option>
              </Select>
            </Box>
            <Box mx='10px'>
              <InputGroup >
                <Input required placeholder="Cari Produk" bg='white'
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)} />
                <InputRightElement>
                  <Icon
                    fontSize="xl"
                    as={BiSearchAlt}
                    sx={{ _hover: { cursor: "pointer" } }}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Box>

          <Box display='flex' justifyContent='space-evenly' hidden={filtermobile ? true : false}  >
            <Button onClick={onOpenCategory} w='180px' size='md' borderRadius='8px' bg='#009B90'
              _hover={{ background: '#02d1c2' }}>
              <Icon boxSize='5' as={RiListCheck} color='white' />
              <Text mx='10px' fontWeight='bold' color='white'>
                Filter Kategori
              </Text>
            </Button>

            <Drawer onClose={onCloseCategory} placement='top' isOpen={isOpenCategory} size='full'>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton color='white' />
                <DrawerHeader bg='#009B90' color='white'>Filter Kategori</DrawerHeader>
                <DrawerBody>
                  <Box px='20px' py='10px'>
                    {renderCategory()}
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>

            <Button onClick={onOpen} size='md' w='180px' borderRadius='8px' bg='#009B90'
              _hover={{ background: '#02d1c2' }}>
              <Icon boxSize='5' as={BsFilterLeft} color='white' />
              <Text mx='10px' fontWeight='bold' color='white'>
                Urut Berdasarkan
              </Text>
            </Button>

            <Drawer onClose={onClose} placement='top' isOpen={isOpen} size='full'>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton color='white' />
                <DrawerHeader bg='#009B90' color='white'>Urut Berdasarkan</DrawerHeader>
                <DrawerBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Consequat nisl vel pretium lectus quam id. Semper quis lectus
                    nulla at volutpat diam ut venenatis. Dolor morbi non arcu risus
                    quis varius quam quisque. Massa ultricies mi quis hendrerit dolor
                    magna eget est lorem. Erat imperdiet sed euismod nisi porta.
                    Lectus vestibulum mattis ullamcorper velit.
                  </p>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>

          <Box display='flex' flexWrap={'wrap'} justifyContent='center'>
            {/* <ProductCard /> */}
            {renderProduct()}

            {/* -------------------- jangan dihapus -------------------- */}
            <Box w='180px' m='10px'>
            </Box>
            <Box w='180px' m='10px'>
            </Box>
            <Box w='180px' m='10px'>
            </Box>

          </Box>
        </Box>
      </Flex>
    </>
  )
}