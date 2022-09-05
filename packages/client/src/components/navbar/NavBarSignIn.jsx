import {
  Box, Input, Flex, Avatar, HStack, Link, IconButton, Button, Menu, Tooltip,
  MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure,
  Stack, Icon, Text, Accordion, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton,
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, DrawerFooter, DrawerHeader, Center
} from '@chakra-ui/react';
import LinkNext from 'next/link';
import Image from 'next/image';
import logo from '../../assets/img/healthymedLogo.png'
import jsCookie from "js-cookie";
import auth_types from "../../redux/reducers/auth/type";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { MdOutlineCategory, MdUploadFile, MdCategory, MdPersonAddAlt, MdPersonAdd } from 'react-icons/md';
import { AiFillBell, AiFillSetting, AiOutlineBell, AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiLoginCircleLine, RiLoginCircleFill, RiHistoryLine } from "react-icons/ri";
import { IoSettingsOutline, IoNotificationsOutline, IoLogOutOutline, IoStorefrontOutline, IoStorefrontSharp } from "react-icons/io5"
import { BiAddToQueue, BiHelpCircle } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export default function NavBarSignIn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = useDisclosure()
  const dispatch = useDispatch();
  const router = useRouter();
  const userSelector = useSelector((state) => state.auth);

  // -------------------- Untuk Logout -------------------- //
  function btnlogout() {
    jsCookie.remove("auth_token");
    dispatch({
      type: auth_types.AUTH_LOGOUT
    })
    router.push("/")
  }

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

              <Link onClick={onOpen}>
                <Button background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                  <Icon boxSize='6' as={IoNotificationsOutline} />
                </Button>
              </Link>

              <Link onClick={onOpen}>
                <Tooltip label='Upload Resep'>
                  <Button background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16}>
                    <Icon boxSize='6' as={MdUploadFile} />
                  </Button>
                </Tooltip>
              </Link>

              <Link onClick={onOpenCart} >
                <Button background='white' _hover={{ background: '#E8F5FD', color: '#00ACEE', borderBottomWidth: '3px', borderBottomColor: '#3B9AE1' }} borderRadius={0} h={16} mr='8px'>
                  <Icon boxSize='6' as={IoCartOutline} />
                </Button>
              </Link>
              <Drawer isOpen={isOpenCart} placement='right' onClose={onCloseCart}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Keranjang</DrawerHeader>
                  <DrawerBody>
                    <Input placeholder='Type here...' />
                  </DrawerBody>
                  <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme='blue'>Save</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </HStack>

            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar ml='10px' size={'sm'} src={`http://${userSelector.image_url}`} />
              </MenuButton>

              <MenuList>
                <MenuItem>
                  <Avatar size={'sm'} src={`http://${userSelector.image_url}`} />
                  <Text ml='10px' fontWeight='bold'>{userSelector.username}</Text>
                </MenuItem>

                <MenuDivider />
                <MenuItem><Icon boxSize='6' as={RiHistoryLine} /><Text ml='10px'>History Transaksi</Text></MenuItem>
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

              <Link href='./' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='6' as={MdUploadFile} />
                  </Center>
                  <Box display='flex' w='full' fontWeight='bold'>
                    Upload Resep
                  </Box>
                </HStack>
              </Link>

              <Link href='./' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
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