import {
  Box, Input, Flex, Avatar, AvatarBadge, HStack, Stack, Link, IconButton, Button, Menu, Tooltip,
  MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, Modal, ModalCloseButton, ModalOverlay, ModalHeader, ModalBody, ModalContent
  , Icon, Text, Accordion, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton, Image,
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, DrawerFooter, DrawerHeader, Center
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import NextImage from 'next/image';
import logo from '../../assets/img/healthymedLogo.png'
import jsCookie from "js-cookie";
import auth_types from "../../redux/reducers/auth/type";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { MdOutlineCategory, MdUploadFile, MdCategory, MdPersonAddAlt, MdPersonAdd } from 'react-icons/md';
import { AiFillBell, AiFillSetting, AiOutlineBell, AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiLoginCircleLine, RiLoginCircleFill, RiHistoryLine } from "react-icons/ri";
import { IoSettingsOutline, IoCartOutline, IoNotificationsOutline, IoLogOutOutline, IoStorefrontOutline, IoStorefrontSharp } from "react-icons/io5"
import { BiAddToQueue, BiHelpCircle } from "react-icons/bi";
import { axiosInstance } from '../../lib/api';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import CartUser from './cartuser/CartUser';
import SideFilterCategory from '../productlisting/filter/filtercategory/SideFilterCategory';
import AddRecipe from '../addrecipes/AddRecipe';

export default function NavBarSignIn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = useDisclosure()
  const { isOpen: isOpenRecipe, onOpen: onOpenRecipe, onClose: onCloseRecipe } = useDisclosure()
  const dispatch = useDispatch();
  const router = useRouter();
  const userSelector = useSelector((state) => state.auth);
  const autoRender = useSelector((state) => state.automateRendering)
  const [category, setCategory] = useState([])
  const [cart, setCart] = useState([])
  const [cartLength, setCartLength] = useState([])
  const [cartSubTotal, setCartSubTotal] = useState(0)

  // -------------------- Untuk Logout -------------------- //
  function btnlogout() {
    jsCookie.remove("auth_token");
    dispatch({
      type: auth_types.AUTH_LOGOUT
    })
    router.push("/")
  }

  // --------------- Fetching Category --------------- //
  async function fetchCategory() {
    try {
      axiosInstance.get(`/category`)
        .then((res) => {
          setCategory(res.data.result)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderCategoryMobile = () => {
    return category.map((val, index) => {
      return (
        <>
          <Link href={`/productlist?category1=` + val.category} style={{ textDecoration: "none" }}>
            <HStack _hover={{ background: '#ccdefc' }}>
              <Center display='flex' justifyContent='center' h='40px' w='58px'>
              </Center>
              <Box display='flex' w='full' fontWeight='semibold'>
                <SideFilterCategory key={index}
                  idcategory={val.id}
                  category={val.category}
                />
              </Box>
            </HStack>
          </Link>
        </>
      )
    })
  }

  const renderCategoryWeb = () => {
    return category.map((val, index) => {
      return (
        <>
          <Link href={`/productlist?category1=` + val.category} style={{ textDecoration: "none" }}>
            <MenuItem>
              <SideFilterCategory key={index}
                idcategory={val.id}
                category={val.category}
              /></MenuItem>
          </Link>
        </>
      )
    })
  }

  // --------------- Fetching Cart --------------- //
  async function fetchCart() {
    try {
      axiosInstance.get(`/transaction/api/v1/Carts/${userSelector.id}`)
        .then((res) => {
          setCart(res.data.result)
          // console.log(res.data.result);
          console.log(res.data.result.length);
          setCartLength(res.data.result.length)
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

  const renderCartNavbar = () => {
    return cart.map((val, index) => {
      a += val.total_price;
      console.log(a)
      return (
        <>
          <CartUser key={index}
            image={val.Product.Product_images[0].image_url}
            productName={val.Product.product_name}
            qtyBuy={val.buy_quantity}
            price={val.price}
            totalPrice={val.total_price}
            idCart={val.id}
            idProduct={val.Product.product_code}
            idUser={val.id_user}
          />
        </>
      )
    })
  }

  useEffect(() => {
    fetchCategory()
    fetchCart()

  }, [router.isReady]);

  useEffect(() => {
    fetchCart()
  }, [autoRender]);

  return (
    <>
      <Box bg='#ffffff' borderBottomWidth='1px' boxShadow='md' px={4} className='topnavbar' zIndex={111}>
        {/* -------------------- NavBar Website -------------------- */}
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton bg='#ffffff'
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Link href='/' >
            <HStack spacing={8} alignItems={'center'} _hover={{ cursor: "pointer" }}>
              <Center><NextImage src={logo} width='180px' height='40px' /></Center>
            </HStack>
          </Link>

          <Flex alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>

              <LinkNext href='/'>
                <Button background='white'
                  style={router.pathname == '/' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                  Beranda
                </Button>
              </LinkNext>

              <Link href='/productlist' className='Button-Navbar' style={{ textDecoration: "none" }}>
                <Button background='white'
                  style={router.pathname == '/productlist' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                  Produk
                </Button>
              </Link>

              <Menu>
                <MenuButton as={Button}
                  background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                  Kategori
                </MenuButton>
                <MenuList>
                  {renderCategoryWeb()}
                </MenuList>
              </Menu>

              <Link onClick={onOpen}>
                <Button background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                  <Icon boxSize='6' as={IoNotificationsOutline} />
                </Button>
              </Link>

              <Link onClick={onOpenRecipe}>
                <Tooltip label='Upload Resep'>
                  <Button background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                    <Icon boxSize='6' as={MdUploadFile} />
                  </Button>
                </Tooltip>
              </Link>
              <Modal isOpen={isOpenRecipe} onClose={onCloseRecipe} size='lg'>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Unggah Resep Dokter</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Box mb='10px'>
                      <Text fontSize='sm' fontWeight='bold' color='#213360'>Tak perlu antri dan obat akan dikirimkan langsung ke lokasi anda</Text>
                      <Text fontSize='sm' color='#213360'>Foto tidak boleh lebih dari 1mb</Text>
                    </Box>
                    <AddRecipe onClose={onCloseRecipe} />
                  </ModalBody>
                </ModalContent>
              </Modal>

              <Link onClick={onOpenCart} >
                <Button background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16} mr='8px'>
                  {/* <Icon boxSize='6' as={IoCartOutline} /> */}
                  <Avatar _hover={{ color: '#00ACEE' }} icon={<Icon boxSize='6' as={IoCartOutline} />} bg='white'>
                    {cartLength <= 0 ? (
                      <></>
                    ) : (
                      <AvatarBadge
                        boxSize="1.5rem"
                        bg={'teal.400'}
                        color="white"
                        p="4px"
                        fontSize={'0.7rem'}
                      >
                        {cartLength}
                      </AvatarBadge>
                    )}
                  </Avatar>
                </Button>
              </Link>
              <Drawer isOpen={isOpenCart} placement='right' onClose={onCloseCart}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton color='white' size='lg' />
                  <DrawerHeader bg='#009B90' color='white'>
                    <Flex alignContent='center'>
                      <Center >
                        <Icon boxSize='6' as={IoCartOutline} mr='10px' />
                      </Center>
                      <Text>Keranjang</Text>
                    </Flex>
                  </DrawerHeader>
                  <DrawerBody>
                    {cart.length == 0 ?
                      <Box align='center'>
                        <Image src='/cart2.png' objectFit='contain' w='400px' h='300px' />
                        <Text textAlign='center' fontWeight='bold'>Keranjang anda kosong</Text>
                        <Text textAlign='center' fontWeight='bold' color='#009B90' w='150px' _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={() => router.push('/productlist')}>
                          Belanja Sekarang
                        </Text>
                      </Box>
                      :
                      <>
                        <Box maxH='450px' className='scrollCart' mt='10px'>
                          {renderCartNavbar()}
                        </Box >
                        <Box display='flex' mt='10px' justifyContent='space-between'>
                          <Text fontWeight='bold'>
                            Total Belanja :
                          </Text>
                          <Text fontWeight='semibold'>
                            Rp {cartSubTotal.toLocaleString()}
                          </Text>
                        </Box>
                      </>
                    }
                  </DrawerBody>
                  <DrawerFooter>
                    <Button w='full' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px' size='md' my='5px'
                      _hover={{ bg: '#009B90', color: 'white' }} disabled={cart.length == 0 ? true : false}
                      onClick={() => router.push('/transactions/mycart')}>
                      Order Sekarang
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </HStack>

            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar ml='10px' name={userSelector.first_name + userSelector.last_name} size={'sm'} src={`http://${userSelector.image_url}`} />
              </MenuButton>

              <MenuList>
                <MenuItem>
                  <Avatar size={'sm'} src={`http://${userSelector.image_url}`} />
                  <Text ml='10px' fontWeight='bold'>{userSelector.username}</Text>
                </MenuItem>

                <MenuDivider />
                <LinkNext href="/transactions/alltransactions">
                  <MenuItem><Icon boxSize='6' as={RiHistoryLine} /><Text ml='10px'>Pembelian</Text></MenuItem>
                </LinkNext>
                <LinkNext href="/profilesetting">
                  <MenuItem>
                    <Icon boxSize='6' as={router.pathname == "/profilesetting" ? AiFillSetting : IoSettingsOutline} />
                    <Text ml='10px'>Pengaturan</Text>
                  </MenuItem>
                </LinkNext>
                <MenuItem><Icon boxSize='6' as={BiHelpCircle} /><Text ml='10px'>Bantuan</Text></MenuItem>
                <MenuDivider />
                <MenuItem onClick={btnlogout}><Icon boxSize='6' as={IoLogOutOutline} /><Text ml='10px'>Log Out</Text></MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* -------------------- NavBar Mobile -------------------- */}
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link href='./' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='6' as={router.pathname == '/' ? AiFillHome : AiOutlineHome} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Beranda
                  </Box>
                </HStack>
              </Link>

              <Link href='./productlist' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='6' as={router.pathname == '/productlist' ? IoStorefrontSharp : IoStorefrontOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Produk
                  </Box>
                </HStack>
              </Link>

              <Accordion defaultIndex={[1]} borderRadius={5} borderColor='white' allowMultiple _hover={{ background: '#E8F5FD' }}>
                <AccordionItem >
                  <h2>
                    <AccordionButton justifyContent='space-between' _hover={{ background: '#E8F5FD' }} borderRadius={5}>
                      <HStack ml='-15px' color='#4c4c4d' >
                        <Center display='flex' justifyContent='center' h='40px' w='50px'>
                          <Icon boxSize='6' as={MdOutlineCategory} />
                        </Center>
                        <Box display='flex' w='100px' fontWeight='bold' >
                          Kategori
                        </Box>
                      </HStack>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={2} p='0px'>
                    {renderCategoryMobile()}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Link onClick={onOpenRecipe} borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='6' as={MdUploadFile} />
                  </Center>
                  <Box display='flex' w='full' fontWeight='bold'>
                    Upload Resep
                  </Box>
                </HStack>
              </Link>

              <Link href='/transactions/mycart' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='6' as={router.pathname == '/register' ? MdPersonAdd : IoCartOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Keranjang
                  </Box>
                </HStack>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}