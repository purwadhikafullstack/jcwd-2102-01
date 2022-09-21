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

export default function ShowDefaultAddress(props) {
  const { idalamat, namaPenerima, phonePenerima, alamat, provinsi, kecamatan, provinsiId, city, city_id, postalCode, defaultAddress } = props
  const { isOpen: isOpenAlamatEdit, onOpen: onOpenAlamatEdit, onClose: onCloseAlamatEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
  const userSelector = useSelector((state) => state.auth)
  const autoRender = useSelector((state) => state.automateRendering)
  const [addressId, setAddressId] = useState(defaultAddress)
  const [defaultBtn, setDefaultBtn] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast();

  useEffect(() => {
    setAddressId(defaultAddress)
    // console.log(addressId);
  }, [defaultAddress]);

  return (
    <>
      <Box display='flex' borderWidth='1px' p='5px' px='10px' boxShadow='md' borderRadius='13px' bg='white'>
        <Box w='full'>
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

            <Box display='flex' fontSize='sm'>
              <Text fontWeight='semibold' w='90px' >Kecamatan:</Text>
              <Text >{kecamatan}</Text>
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
    </>
  )
}