import {
  Box, Text, Avatar, Link, AvatarBadge, Flex, Input, Select, InputLeftElement, InputGroup,
  Modal, ModalCloseButton, Icon, Tooltip, ModalOverlay, ModalHeader, ModalBody, useDisclosure,
  FormControl, Button, useToast, FormHelperText, ModalContent, Divider, Checkbox
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { BiPlusMedical } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { axiosInstance } from '../../lib/api';
import ModalProfPicture from './mchangepicture/ModalProfPict';
import * as Yup from "yup";
import qs from 'qs';
import MaddAddress from './maddressadd/maddaddress';
import MeditAddress from './maddressedit/meditaddress';
import MchangePassword from './mchangepassword/MchangePassword';

export default function ShowAddress(props) {
  const { idalamat, namaPenerima, phonePenerima, alamat, provinsi, provinsiId, city, city_id, postalCode, defaultAddress } = props
  const { isOpen: isOpenAlamatEdit, onOpen: onOpenAlamatEdit, onClose: onCloseAlamatEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
  const userSelector = useSelector((state) => state.auth)
  const autoRender = useSelector((state) => state.automateRendering)
  const [addressId, setAddressId] = useState(defaultAddress)
  const [defaultBtn, setDefaultBtn] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast();

  // -------------------- Delete Adress -------------------- //
  async function deleteAddress() {
    try {
      await axiosInstance.delete("/address/" + idalamat)
      dispatch({
        type: "FETCH_RENDER",
        payload: { value: !autoRender.value }
      })
      toast({
        title: "Succes",
        description: "Berhasil menghapus alamat",
        status: "success",
        isClosable: true,
      })
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: err.toString(),
        status: "error",
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    addressId
    console.log(addressId);
  }, [addressId]);




  // -------------------- Edit Address -------------------- //
  const formik = useFormik({
    initialValues: {
      default_address: { addressId },
    },
    onSubmit: async () => {
      const { default_address } = formik.values
      try {
        let body = {
          default_address: addressId,
          username: `${userSelector.username}`,
          email: `${userSelector.email}`
        }
        await axiosInstance.patch(`/user/edit/${userSelector.id}`, qs.stringify(body)).then((res) => {
          // setAddressId(idalamat)

          dispatch({
            type: "FETCH_RENDER",
            payload: { value: !autoRender.value }
          })
          toast({
            title: `Alamat utama berhasil diganti`,
            status: "success",
            isClosable: true,
          })
        })
      } catch (err) {
        console.log(err);
      }
    }
  })

  useEffect(() => {
    setAddressId(defaultAddress)
    // console.log(addressId);
  }, [defaultAddress]);

  return (
    <>
      <Box display='flex' _hover={{ background: '#ddf1f9' }}>
        <Box w='full'>
          <Box display='flex' justifyContent='space-between'>
            {idalamat == addressId ?
              <Button size='xs' borderColor='#009B90' bg='#009B90' color='white' borderRadius='13px'
                borderWidth='2px' mt='5px' _hover={{ bg: '#04d1c2', borderColor: '#04d1c2', color: 'white' }}
                onClick={() => {
                  async function submit() {
                    setAddressId(0);
                    formik.handleSubmit();
                  }
                  submit()
                }}>
                Default
              </Button>
              :
              <Tooltip label='Set jadi alamat utama' fontSize='sm' >
                <Button
                  onClick={() => {
                    async function submit() {
                      setAddressId(idalamat);
                      formik.handleSubmit();
                    }
                    submit()
                  }}
                  size='xs' borderColor='#009B90' borderRadius='13px' bg='white'
                  borderWidth='2px' mt='5px' _hover={{ bg: '#009B90', color: 'white' }}>
                  Choose
                </Button>
              </Tooltip>
              //  <Tooltip label='Set jadi alamat utama' fontSize='sm' >
              //   <Button onClick={() => { idalamat == addressId ? setAddressId(0) : setAddressId(idalamat) }} size='xs' borderColor='#009B90' borderRadius='13px' bg='white'
              //     borderWidth='2px' mt='5px' _hover={{ bg: '#009B90', color: 'white' }}>
              //     Default
              //   </Button>
              // </Tooltip> 
            }

            <Box>
              <Tooltip label='Edit alamat' fontSize='sm' >
                <Button variant='link' color='#EF5B0C' mr='5px' my='5px' size='sm' onClick={onOpenAlamatEdit}>
                  <Icon boxSize={4} as={FaEdit} />
                </Button>
              </Tooltip>
              <Modal isOpen={isOpenAlamatEdit} onClose={onCloseAlamatEdit} size='md'>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit alamat pengiriman</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <MeditAddress
                      idalamatEd={idalamat}
                      namaPenerimaEd={namaPenerima}
                      PhoneEd={phonePenerima}
                      alamatEd={alamat}
                      provinsiEd={provinsi}
                      provinsiIdEd={provinsiId}
                      cityEd={city}
                      city_idEd={city_id}
                      postalCodeEd={postalCode}
                      defaultAddressEd={defaultAddress}
                      onClose={isOpenAlamatEdit} />
                  </ModalBody>
                </ModalContent>
              </Modal>

              <Tooltip label='Hapus alamat' fontSize='sm' >
                <Button variant='link' color='#395B64' size='sm' _hover={{ color: 'red' }} onClick={onOpenDelete}>
                  <Icon boxSize={4} as={FaTrashAlt} />
                </Button>
              </Tooltip>
              {/* ---------- Simpan Post ---------- */}
              <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size='sm'>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Hapus Alamat</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Box justifyContent={'space-between'}>
                      <Text>Apakah anda yakin ingin menghapus alamat ini?</Text>
                    </Box>
                    <Box mt='10px' display='flex' justifyContent='flex-end'>
                      <Button mr={3} colorScheme='red' onClick={() => {
                        async function submit() {
                          await deleteAddress();
                          onCloseDelete();
                        }
                        submit()
                      }}>
                        Delete
                      </Button>
                    </Box>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </Box>

          <Box flexWrap='wrap' mt='5px'>
            <Box display='flex' color='#0778a3'>
              <Text fontWeight='semibold'>{namaPenerima}</Text>
              <Text fontWeight='semibold' ml='10px'>{phonePenerima}</Text>
            </Box>

            <Box display='flex' fontSize='sm'>
              <Text fontWeight='semibold' w='90px'>Alamat:</Text>
              <Text>{alamat}</Text>
            </Box>

            <Box display='flex' fontSize='sm'>
              <Text fontWeight='semibold' w='90px' >Provinsi:</Text>
              <Text >{provinsi}</Text>
            </Box>

            <Box display='flex' fontSize='sm'>
              <Text fontWeight='semibold' w='90px' >Kota/Kab:</Text>
              <Text >{city}</Text>
            </Box>

            <Box display='flex' justifyContent='space-between'>
              <Box display='flex' fontSize='sm'>
                <Text fontWeight='semibold' w='90px' >Kode Post:</Text>
                <Text>{postalCode}</Text>
              </Box>
            </Box>



          </Box>

        </Box>
      </Box>
      <Divider mt='7px' size='lg' borderWidth='1px' />
    </>
  )
}