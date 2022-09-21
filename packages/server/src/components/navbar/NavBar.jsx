import {
  Box, Flex, HStack, Link, IconButton, Button,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure,
  Stack, Icon, Text, Accordion, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton, Center
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MdOutlineCategory, MdCategory, MdPersonAddAlt, MdPersonAdd } from 'react-icons/md';
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiLoginCircleLine, RiLoginCircleFill } from "react-icons/ri";
import { IoStorefrontOutline, IoStorefrontSharp } from "react-icons/io5"
import { axiosInstance } from '../../lib/api';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../../assets/img/healthymedLogo.png'
import SideFilterCategory from '../productlisting/filter/filtercategory/SideFilterCategory';

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [category, setCategory] = useState([])
  // --------------- Fetching Category --------------- //
  async function fetchCategory() {
    try {
      axiosInstance.get(`/category`)
        .then((res) => {
          setCategory(res.data.result)
          console.log(res.data.result)
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

  useEffect(() => {
    fetchCategory()
  }, [router.isReady]);

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
              <Center><Image src={logo} width='180px' height='40px' /></Center>
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

              <LinkNext href='/login'>
                <Button colorScheme='twitter' size='sm'>
                  Sign in
                </Button>
              </LinkNext>

              <LinkNext href='/register'>
                <Button colorScheme='gray' size='sm'>
                  Daftar
                </Button>
              </LinkNext>
            </HStack>
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
                <AccordionItem>
                  <h2>
                    <AccordionButton justifyContent='space-between' _hover={{ background: '#E8F5FD' }} borderRadius={5}>
                      <HStack ml='-15px' color='#4c4c4d'>
                        <Center display='flex' justifyContent='center' h='40px' w='50px'>
                          <Icon boxSize='6' as={MdOutlineCategory} />
                        </Center>
                        <Box display='flex' w='100px' fontWeight='bold'>
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

              <Link href='./login' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='6' as={router.pathname == '/login' ? RiLoginCircleFill : RiLoginCircleLine} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Sign in
                  </Box>
                </HStack>
              </Link>

              <Link href='./register' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='6' as={router.pathname == '/register' ? MdPersonAdd : MdPersonAddAlt} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Daftar
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