import {
  Box, Flex, Avatar, HStack, Link, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure,
  Stack, Icon, Text, Accordion, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton, Center
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AiFillSetting, AiOutlineHome, AiFillHome } from "react-icons/ai";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5"
import { FaPills, FaRegClipboard } from 'react-icons/fa';
import { BsGraphUp } from 'react-icons/bs';
import { BiHelpCircle } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LinkNext from 'next/link';
import Image from 'next/image';
import jsCookie from "js-cookie";
import auth_types from "../../../redux/reducers/auth/type";
import logo from '../../../assets/img/healthymedLogo.png'

export default function AdminNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = useDisclosure()
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  const autoRender = useSelector((state) => state.automateRendering)
  const router = useRouter();

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
                    name={userSelector.first_name + userSelector.last_name} size='sm' src={`http://${userSelector.image_url}`}
                  />
                  <Box textAlign='left' >
                    <Text >{userSelector.first_name} {userSelector.last_name}</Text>
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
                <MenuItem onClick={btnlogout} ><Icon boxSize='6' as={IoLogOutOutline} /><Text ml='10px'>Log Out</Text></MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* ---------- Mobile Version ---------- */}
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link href='/home' borderRadius={5} style={{ textDecoration: "none" }} _hover={{ background: '#E8F5FD' }}>
                <HStack color='#4c4c4d'>
                  <Center display='flex' justifyContent='center' h='50px' w='50px'>
                    <Icon boxSize='8' as={router.pathname == '/home' ? AiFillHome : AiOutlineHome} />
                  </Center>
                  <Box display='flex' w='100px' fontWeight='bold'>
                    Dashboard
                  </Box>
                </HStack>
              </Link>

              <Accordion defaultIndex={[1]} borderColor='white' allowMultiple _hover={{ background: '#E8F5FD' }}>
                <AccordionItem>
                  <h2>
                    <AccordionButton justifyContent='space-between'>
                      <HStack ml='-15px' color='#4c4c4d'>
                        <Center display='flex' justifyContent='center' h='40px' w='50px'>
                          <Icon boxSize='8' as={FaPills} />
                        </Center>
                        <Box display='flex' w='100px' fontWeight='bold'>
                          Produk
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
                        Daftar Produk
                      </Box>
                    </HStack>
                    <LinkNext href='/admin/inventory/category'>
                      <HStack _hover={{ background: '#ccdefc' }}>
                        <Center display='flex' justifyContent='center' h='40px' w='58px'>
                        </Center>
                        <Box display='flex' w='full' fontWeight='semibold'>
                          Daftar Kategori
                        </Box>
                      </HStack>
                    </LinkNext>
                    <HStack _hover={{ background: '#ccdefc' }}>
                      <Center display='flex' justifyContent='center' h='40px' w='58px'>
                      </Center>
                      <Box display='flex' w='full' fontWeight='semibold'>
                        Stok History
                      </Box>
                    </HStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Accordion defaultIndex={[1]} borderColor='white' allowMultiple _hover={{ background: '#E8F5FD' }}>
                <AccordionItem>
                  <h2>
                    <AccordionButton justifyContent='space-between'>
                      <HStack ml='-15px' color='#4c4c4d' style={router.pathname == '/admin/transaction' ? { color: '#00ACEE' } : null}>
                        <Center display='flex' justifyContent='center' h='40px' w='50px'>
                          <Icon boxSize='8' as={FaRegClipboard} />
                        </Center>
                        <Box display='flex' w='100px' fontWeight='bold'>
                          Transaksi
                        </Box>
                      </HStack>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={2} p='0px'>
                    <LinkNext href='/admin/transaction'>
                      <HStack _hover={{ background: '#ccdefc' }}>
                        <Center display='flex' justifyContent='center' h='40px' w='58px'>
                        </Center>
                        <Box display='flex' w='full' fontWeight='semibold' style={router.query.status ? null : { color: '#00ACEE' }}>
                          <Text>Semua Transaksi</Text>
                        </Box>
                      </HStack>
                    </LinkNext>
                    <LinkNext href='?status=Menunggu Pembayaran'>
                      <HStack _hover={{ background: '#ccdefc' }}>
                        <Center display='flex' justifyContent='center' h='40px' w='58px'>
                        </Center>
                        <Box display='flex' w='full' fontWeight='semibold' style={router.query.status == 'Menunggu Pembayaran' ? { color: '#00ACEE' } : null}>
                          <Text>Pesanan Baru</Text>
                        </Box>
                      </HStack>
                    </LinkNext>
                    <LinkNext href='?status=Diproses'>
                      <HStack _hover={{ background: '#ccdefc' }}>
                        <Center display='flex' justifyContent='center' h='40px' w='58px'>
                        </Center>
                        <Box display='flex' w='full' fontWeight='semibold' style={router.query.status == 'Diproses' ? { color: '#00ACEE' } : null}>
                          <Text>Siap Dikirim</Text>
                        </Box>
                      </HStack>
                    </LinkNext>
                    <LinkNext href='?status=Dikirim'>
                      <HStack _hover={{ background: '#ccdefc' }}>
                        <Center display='flex' justifyContent='center' h='40px' w='58px'>
                        </Center>
                        <Box display='flex' w='full' fontWeight='semibold' style={router.query.status == 'Dikirim' ? { color: '#00ACEE' } : null}>
                          <Text>Dalam Pengiriman</Text>
                        </Box>
                      </HStack>
                    </LinkNext>
                    <LinkNext href='?status=Pesanan Dikonfirmasi'>
                      <HStack _hover={{ background: '#ccdefc' }}>
                        <Center display='flex' justifyContent='center' h='40px' w='58px'>
                        </Center>
                        <Box display='flex' w='full' fontWeight='semibold' style={router.query.status == 'Pesanan Dikonfirmasi' ? { color: '#00ACEE' } : null}>
                          <Text>Selesai</Text>
                        </Box>
                      </HStack>
                    </LinkNext>
                    <LinkNext href='?status=Dibatalkan'>
                      <HStack _hover={{ background: '#ccdefc' }}>
                        <Center display='flex' justifyContent='center' h='40px' w='58px'>
                        </Center>
                        <Box display='flex' w='full' fontWeight='semibold' style={router.query.status == 'Dibatalkan' ? { color: '#00ACEE' } : null}>
                          <Text>Dibatalkan</Text>
                        </Box>
                      </HStack>
                    </LinkNext>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Accordion defaultIndex={[1]} borderColor='white' allowMultiple _hover={{ background: '#E8F5FD' }}>
                <AccordionItem>
                  <h2>
                    <AccordionButton justifyContent='space-between'>
                      <HStack ml='-15px' color='#4c4c4d'>
                        <Center display='flex' justifyContent='center' h='40px' w='50px'>
                          <Icon boxSize='8' as={BsGraphUp} />
                        </Center>
                        <Box display='flex' w='100px' fontWeight='bold'>
                          Sales & Revenue
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
                        Ringkasan Statistik
                      </Box>
                    </HStack>
                    <HStack _hover={{ background: '#ccdefc' }}>
                      <Center display='flex' justifyContent='center' h='40px' w='58px'>
                      </Center>
                      <Box display='flex' w='full' fontWeight='semibold'>
                        Report Penjualan
                      </Box>
                    </HStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}