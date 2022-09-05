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
import Image from 'next/image';
import logo from '../../assets/img/healthymedLogo.png'
import { useRouter } from 'next/router';

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

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

              <LinkNext href='/productlist' className='Button-Navbar' style={{ textDecoration: "none" }}>
                <Button background='white'
                  style={router.pathname == '/productlist' ? { textDecoration: "none", borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }
                    : { textDecoration: "none" }}
                  _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                  Produk
                </Button>
              </LinkNext>

              <Menu>
                <MenuButton as={Button}
                  background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                  Kategori
                </MenuButton>
                <MenuList>
                  <LinkNext href="/">
                    <MenuItem><Text size='sm' ml='5px' fontWeight='semibold'>Obat Sakit Kepala</Text></MenuItem>
                  </LinkNext>
                  <LinkNext href="/Obat Sakit Perut">
                    <MenuItem><Text size='sm' ml='5px' fontWeight='semibold'>Obat Sakit Perut</Text></MenuItem>
                  </LinkNext>
                  <LinkNext href="/Nutrisi">
                    <MenuItem><Text size='sm' ml='5px' fontWeight='semibold'>Nutrisi</Text></MenuItem>
                  </LinkNext>
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
                    <HStack _hover={{ background: '#ccdefc' }}>
                      <Center display='flex' justifyContent='center' h='40px' w='58px'>
                      </Center>
                      <Box display='flex' w='full' fontWeight='semibold'>
                        Obat Sakit Kepala
                      </Box>
                    </HStack>
                    <HStack _hover={{ background: '#ccdefc' }}>
                      <Center display='flex' justifyContent='center' h='40px' w='58px'>
                      </Center>
                      <Box display='flex' w='full' fontWeight='semibold'>
                        Obat Sakit Pinggang
                      </Box>
                    </HStack>
                    <HStack _hover={{ background: '#ccdefc' }}>
                      <Center display='flex' justifyContent='center' h='40px' w='58px'>
                      </Center>
                      <Box display='flex' w='full' fontWeight='semibold'>
                        Obat Sakit Perut
                      </Box>
                    </HStack>
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