import {
  Box, Text, Avatar, Link, AvatarBadge, Flex, Input, Select, InputLeftElement, InputGroup,
  Modal, ModalCloseButton, Icon, Tooltip, ModalOverlay, ModalHeader, ModalBody, useDisclosure,
  FormControl, Button, useToast, FormHelperText, ModalContent,
  Divider
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
import ShowAddress from './ShowAddress';

export default function ProfileSetting() {
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure()
  const { isOpen: isOpenAlamat, onOpen: onOpenAlamat, onClose: onCloseAlamat } = useDisclosure()
  const { isOpen: isOpenChangePass, onOpen: onOpenChangePass, onClose: onCloseChangePass } = useDisclosure()
  const { isOpen: isOpenEditProf, onOpen: onOpenEditProf, onClose: onCloseEditProf } = useDisclosure()
  const [addressFetch, setAddressFetch] = useState([])
  const [addressLength, setAddressLength] = useState()
  const userSelector = useSelector((state) => (state.auth))
  const autoRender = useSelector((state) => state.automateRendering)
  const toast = useToast();
  const dispatch = useDispatch()
  const router = useRouter();
  const image = userSelector.image_url;

  let todayYear = new Date().getFullYear()
  let minYear = todayYear - 100;
  let maxYear = todayYear - 10

  const formik = useFormik({
    initialValues: {
      full_name: `${userSelector.full_name}`,
      username: `${userSelector.username}`,
      email: `${userSelector.email}`,
      birth: `${userSelector.birth}`,
      gender: `${userSelector.gender}`,
      // phone_no: `${userSelector.phone_no}`,
      id: userSelector.id,
    },
    validationSchema: Yup.object().shape({
      // username: Yup.string().required("Username is required"),
      full_name: Yup.string().required("Nama wajib diisi").min(3, 'Nama anda terlalu pendek!').
        max(50, 'Nama tidak boleh lebih dari 50 karakter').
        matches(/^[aA-zZ\s]+$/, "hanya boleh diisi huruf").trim(),
      birth: Yup.date().required("tanggal wajib diisi").
        max(`${maxYear}-12-12`, `Tanggal lahir tidak bisa lewat dari tahun ${maxYear}`).
        min(`${minYear}-01-01`, `Tanggal lahir tidak bisa dibawah dari tahun ${minYear}`),
      email: Yup.string().required("email wajib diisi").email('Format harus email')
    }),
    validateOnChange: false,
    onSubmit: async () => {
      // dispatch(userEdit(values, formik.setSubmitting))
      const { full_name, email, birth, gender, phone_no } = formik.values

      let msg = ""
      try {
        let body = {
          full_name: full_name,
          // username: username,
          email: email,
          birth: birth,
          gender: gender,
          // phone_no: phone_no,
        };
        const res = await axiosInstance.patch(`/user/edit/${userSelector.id}`, qs.stringify(body));

        // msg = res.data.message
        // console.log(res.data.message);
        // console.log(res.data.user);
        // dispatch({
        //   type: "AUTH_LOGIN",
        //   payload: res.data.user
        // })
        dispatch({
          type: "FETCH_RENDER",
          payload: { value: !autoRender.value }
        })
        toast({
          title: "Berhasil mengedit user profil",
          status: "success",
          isClosable: true,
        })
      } catch (err) {
        console.log(err);
        toast({
          title: "maaf email sudah dipakai pengguna lain",
          status: "error",
          isClosable: true,
        })
      }
      formik.setSubmitting(false);
    }
  })

  // ---------- Fetching Address ---------- //
  async function fetchAddress() {
    try {
      // axiosInstance.get(`/ comment / post / ${ id } ? page = ${ startComment } & limit=${ 5}`)
      axiosInstance.get(`address/user/` + userSelector.id)
        .then((res) => {
          setAddressFetch(res.data.result)
          const temp = res.data.result
          setAddressLength(temp.length)
          console.log(temp)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderAddress = () => {
    return addressFetch.map((val, index) => {
      return (
        <ShowAddress key={index}
          idalamat={val.id}
          namaPenerima={val.receiver_name}
          phonePenerima={val.receiver_phone}
          alamat={val.address}
          provinsi={val.province}
          provinsiId={val.province_id}
          city={val.city_name}
          city_id={val.city_id}
          postalCode={val.postal_code}
          defaultAddress={val.User?.default_address}
        />
      )
    })
  }
  useEffect(() => {
    fetchAddress()
    // console.log(addressLength)
  }, [autoRender]);

  return (
    <>
      <Box maxH='400px' w={'375px'} m='30px' mt='0px' mb='20px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
        {/* -------------------- User Profile Picture and data -------------------- */}
        <Box display='flex' justifyContent='center' m='5px' mt='20px'>
          <Avatar name={userSelector.full_name} size='xl' src={`http://${userSelector.image_url}`} >
            <Link onClick={userSelector.is_verified == 0 ?
              () =>
                toast({
                  title: `Pembatasan Akses`,
                  description: 'Akun anda belum terverifikasi segera verifikasi ulang agar bisa menambah foto profile',
                  position: 'top',
                  status: 'error',
                  isClosable: true,
                })
              :
              onOpenProfile}>
              <AvatarBadge boxSize='1.25em'
                backgroundPosition="center"
                backgroundSize='cover'
                backgroundRepeat="no-repeat"
                backgroundImage="url(/iconcp.jpg)" />
            </Link>
          </Avatar >
          <Modal isOpen={isOpenProfile} onClose={onCloseProfile} size='md'>
            <ModalOverlay />
            <ModalProfPicture onClose={onCloseProfile} />
          </Modal>
        </Box >
        <Box display='flex' justifyContent="center" alignContent='center' mt='20px' >
          <Box display='flex' borderBottomWidth='1px' justifyContent="center">
            <Text color='#0778a3' fontWeight='bold' fontSize='lg' >{userSelector.full_name}</Text>
            {
              userSelector.is_verified == 0 ? null : <Icon ml='5px' boxSize={4} alignSelf='center' color='#00ACEE' as={GoVerified} />
            }
          </Box>
        </Box>
        <Box display='flex' justifyContent="center" mb='10px'>
          <Text fontSize='sm' fontWeight='semibold' mt={0} color='#4c4c4d'>{userSelector.username}</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' borderBottomWidth='2px' borderTopWidth='2px' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Transaksi Sukses</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>0</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' borderBottomWidth='2px' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Proses</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>0</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' borderBottomWidth='2px' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Pengiriman</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>0</Text>
        </Box>
        <Box h='50px' display='flex' align='center'
          justifyContent='space-between' px='20px'>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>Transaksi Batal</Text>
          <Text alignSelf='center' fontWeight='semibold' color='#4c4c4d'>0</Text>
        </Box>
      </Box >

      {/* -------------------- User Profile Setting -------------------- */}
      <Flex Flex wrap={'wrap'} alignContent='center' justifyContent='space-evenly' boxShadow='md' maxW='700px' bg='#ffffff' borderWidth='1px' borderRadius="10px" p='10px' >
        <Box w='280px' mt='0px'>
          <Text fontWeight='bold' color='#0778a3' fontSize='xl' my='7px'>
            Pengaturan Profil
          </Text>
        </Box >
        <Box h='0px' w='280px'></Box>

        {/* -------------------- Full Name -------------------- */}
        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' color='#4c4c4d' my='7px'>
            Nama Lengkap
          </Text>
          {/* {formik.values.full_name} */}
          <FormControl isInvalid={formik.errors.full_name}>
            <Input type='text' maxLength='50'
              defaultValue={userSelector.full_name}
              onChange={(event) => formik.setFieldValue("full_name", event.target.value)}></Input>
            <FormHelperText color='red'>{formik.errors.full_name}</FormHelperText>
          </FormControl>
        </Box>

        {/* -------------------- Username -------------------- */}
        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Username
          </Text>
          {/* {formik.values.username} */}
          <FormControl isInvalid={formik.errors.username}>
            <Input type='text' disabled
              defaultValue={userSelector.username}
            // onChange={(event) => formik.setFieldValue("username", event.target.value)}
            ></Input>
            <FormHelperText color='red'>{formik.errors.username}</FormHelperText>
          </FormControl>
        </Box>

        {/* -------------------- Tanggal Lahir -------------------- */}
        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Tanggal Lahir
          </Text>
          {formik.values.birth}
          <FormControl isInvalid={formik.errors.birth}>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="date"
              defaultValue={userSelector.birth}
              onChange={(event) => formik.setFieldValue("birth", event.target.value)}
            />
            <FormHelperText color='red'>{formik.errors.birth}</FormHelperText>
          </FormControl>
        </Box>

        {/* -------------------- Email -------------------- */}
        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            E-mail
          </Text>
          <FormControl isInvalid={formik.errors.email}>
            <Input type='email' maxLength='120'
              defaultValue={userSelector.email}
              onChange={(event) => formik.setFieldValue("email", event.target.value)}
            />
            <FormHelperText color='red'>{formik.errors.email}</FormHelperText>
          </FormControl>
        </Box>

        {/* -------------------- Gender -------------------- */}
        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Jenis Kelamin
          </Text>
          {/* {formik.values.gender} */}
          <FormControl isInvalid={formik.errors.gender}>
            <Select onChange={(event) => formik.setFieldValue("gender", event.target.value)}
              defaultValue={userSelector.gender}
            >
              <option value='Lainnya'>Lainnya</option>
              <option value='Laki-laki'>Laki-laki</option>
              <option value='Perempuan'>Perempuan</option>
            </Select>
          </FormControl>
        </Box>

        {/* -------------------- Phone Number -------------------- */}
        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d'>
            Nomor Handphone
          </Text>
          {/* {formik.values.phone_no} */}
          <FormControl isInvalid={formik.errors.phone_no}>
            <InputGroup>
              <InputLeftElement>
                <Text>+62</Text>
              </InputLeftElement>
              <Input type='number' disabled placeholder='Nomor Handphone'
                defaultValue={userSelector.phone_no}
              // onChange={(event) => formik.setFieldValue("phone_no", event.target.value)}
              ></Input>
            </InputGroup>
            <FormHelperText color='red'>{formik.errors.phone_no}</FormHelperText>
          </FormControl>
        </Box>

        {/* -------------------- Address -------------------- */}
        <Box w='88%' mt='10px'>
          <Box display='flex' justifyContent='space-between' borderBottomWidth='2px'>
            <Text fontWeight='bold' my='7px' color='#4c4c4d'>
              Daftar Alamat User
            </Text>
            <Tooltip label='Tambah alamat Maksimal 3 alamat' fontSize='sm' >
              <Button variant='link' disabled={addressLength == 3 ? true : false} colorScheme='twitter' mr='5px' my='5px' size='sm' onClick={onOpenAlamat}>
                <Icon boxSize={4} as={BiPlusMedical} />
              </Button>
            </Tooltip>
            <Modal isOpen={isOpenAlamat} onClose={onCloseAlamat} size='md'>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Tambah alamat pengiriman</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <MaddAddress onClose={onCloseAlamat} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
          {renderAddress()}
        </Box>
        {/* <Box w='280px' mt='10px'>
        </Box> */}

        <Box w='280px' mt='10px'>
          <Text fontWeight='bold' my='7px' color='#4c4c4d' >
            <Button borderColor='#009B90' borderRadius='9px' bg='white'
              disabled={userSelector.is_verified == 0 ? true : false}
              onClick=
              {
                // userSelector.is_verified == 0 ?
                //   () =>
                //     toast({
                //       title: `Pembatasan Akses`,
                //       description: 'Akun anda belum terverifikasi segera verifikasi ulang untuk mengganti kata sandi',
                //       position: 'top',
                //       status: 'error',
                //       isClosable: true,
                //     })
                //   :
                onOpenChangePass
              }
              borderWidth='2px' size='sm' my='5px'
              _hover={{ bg: '#009B90', color: 'white' }}>
              Ganti Kata sandi</Button>
            {/* <Link onClick={onOpenChangePass} _hover={{ color: '#00ACEE' }}>
              Ganti Kata sandi
            </Link> */}
          </Text>
          <Modal isOpen={isOpenChangePass} onClose={onCloseChangePass} size='md'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader >Ganti Kata sandi</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6} >
                <MchangePassword />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>

        <Box w='280px' mt='10px' mb='15px'>
        </Box>
        <Box w='280px' mt='10px' mb='15px'>
          <FormControl>
            <Button colorScheme='twitter' onClick={onOpenEditProf}>Simpan Perubahan</Button>
          </FormControl>
        </Box>
        {/* ---------- Simpan Perubahan ---------- */}
        <Modal isOpen={isOpenEditProf} onClose={onCloseEditProf} size='sm'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Simpan Perubahan Profil</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box justifyContent={'space-between'}>
                <Text>Anda yakin ingin melakukan perubahan data anda?</Text>
              </Box>
              <Box mt='10px' display='flex' justifyContent='flex-end'>
                <Button mr={3} colorScheme='twitter' onClick={() => {
                  async function submit() {
                    await formik.handleSubmit();
                    onCloseEditProf();
                  }
                  submit()
                }}>
                  Simpan
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box w='280px' mt='10px'>
        </Box>
      </Flex >
    </>
  )
}