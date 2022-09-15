import { ReactNode } from 'react';
import {
  Box, Input,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue, Divider,
  Stack, Icon, Text, Accordion, VStack, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton,
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, DrawerFooter, DrawerHeader, Center
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { MdOutlineCategory, MdCategory, MdPersonAddAlt, MdPersonAdd } from 'react-icons/md';
import { AiFillBell, AiFillSetting, AiOutlineBell, AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiLoginCircleLine, RiLoginCircleFill, RiHistoryLine } from "react-icons/ri";
import { IoSettingsOutline, IoLogOutOutline, IoStorefrontOutline, IoStorefrontSharp } from "react-icons/io5"
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../../../assets/img/healthymedLogo.png'
import { FcLike } from "react-icons/fc";
import { BiAddToQueue, BiHelpCircle } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

const Links = ['Beranda', 'Produk', 'Kategori'];

const NavLink = ({ children }, { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function AdminNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = useDisclosure()
  const router = useRouter();

  return (
    <>
      <Box bg='white' borderBottomWidth='1px' boxShadow='md' px={4} className='topnavbar' zIndex={111}>
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
              {/* <Center><Image src={logo} width='180px' height='40px' /></Center> */}
            </HStack>
          </Link>

          <Flex alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}

              <Link onClick={onOpenCart} >
                <Button background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16} mr='8px'>
                  <Icon boxSize='7' as={IoMdNotificationsOutline} />
                </Button>
              </Link>

            </HStack>
            <Menu>
              <MenuButton style={{ textDecoration: "none" }}
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Box display='flex' >

                  <Avatar mx='10px' alignSelf='center'
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <Box textAlign='left' >
                    <Text >Wira Chanra</Text>
                    <Text fontSize='xs'>Admin</Text>
                  </Box>
                </Box>
              </MenuButton>

              <MenuList>
                <LinkNext href="/profile">
                  <MenuItem><Icon boxSize='6' as={router.pathname == "/profile" ? AiFillSetting : IoSettingsOutline} /><Text ml='10px'>Pengaturan</Text></MenuItem>
                </LinkNext>
                <MenuItem><Icon boxSize='6' as={BiHelpCircle} /><Text ml='10px'>Bantuan</Text></MenuItem>
                <MenuDivider />
                <MenuItem ><Icon boxSize='6' as={IoLogOutOutline} /><Text ml='10px'>Log Out</Text></MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>

              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              <Link href='./home' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='8' as={router.pathname == '/home' ? AiFillHome : AiOutlineHome} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Beranda
                  </Box>
                </HStack>
              </Link>

              <Link href='./productlist' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='8' as={router.pathname == '/produk' ? IoStorefrontSharp : IoStorefrontOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Produk
                  </Box>
                </HStack>
              </Link>

              <Accordion defaultIndex={[0]} borderColor='white' allowMultiple _hover={{ background: '#E8F5FD' }}>
                <AccordionItem>
                  <h2>
                    <AccordionButton justifyContent='space-between'>
                      <HStack ml='-15px' color='#4c4c4d'>
                        <Center display='flex' justifyContent='center' h='40px' w='50px'>
                          <Icon boxSize='8' as={MdOutlineCategory} />
                        </Center>
                        <Box display='flex' w='100px' fontWeight='bold'>
                          Kategori
                        </Box>
                      </HStack>

                      {/* <Box flex='1' textAlign='left'>
                        Kategori
                      </Box> */}

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
                    <Icon boxSize='8' as={router.pathname == '/login' ? RiLoginCircleFill : FaRegHeart} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Upload Resep
                  </Box>
                </HStack>
              </Link>

              <Link href='./register' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='8' as={router.pathname == '/register' ? MdPersonAdd : IoCartOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Keranjang
                  </Box>
                </HStack>
              </Link>

              <Divider />
              <Link href='./profilesetting' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='8' as={router.pathname == '/register' ? MdPersonAdd : IoCartOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    History Belanja
                  </Box>
                </HStack>
              </Link>
              <Link href='./profilesetting' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='8' as={router.pathname == '/register' ? MdPersonAdd : IoCartOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Pengaturan
                  </Box>
                </HStack>
              </Link>
              <Link href='./profilesetting' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='8' as={router.pathname == '/register' ? MdPersonAdd : IoCartOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Bantuan
                  </Box>
                </HStack>
              </Link>

              <Divider />
              <Link href='./register' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='8' as={IoLogOutOutline} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Logout
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