import {
  Box, Flex, Heading, FormControl, Input, InputGroup, InputRightAddon, Icon, FormLabel, FormHelperText, Avatar, HStack, Button, Menu, MenuButton, MenuList, MenuItem,
  MenuDivider, Select, Text, useToast, useDisclosure, Link, Modal, ModalOverlay, Divider, InputRightElement, Progress, Textarea
} from '@chakra-ui/react';
// import {  Select, } from "chakra-react-select";
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import LinkNext from 'next/link';
import { axiosInstance } from '../../../lib/api';
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import qs from 'qs';
import * as Yup from "yup";

export default function MeditAddress(props) {
  const { onClose, idalamatEd, namaPenerimaEd, PhoneEd, alamatEd, provinsiEd, provinsiIdEd, cityEd, city_idEd, postalCodeEd, defaultAddressEd } = props
  const [cityRajaOngkir, setCityRajaOngkir] = useState([])
  const [provinceRajaOngkir, setProvinceRajaOngkir] = useState([])
  const [city, setCity] = useState()
  const [province, setProvince] = useState()
  const [postalCode, setPostalCode] = useState()
  const [addressUser, setAddressUser] = useState()
  const autoRender = useSelector((state) => state.automateRendering)
  const userSelector = useSelector((state) => state.auth)
  const toast = useToast();
  const dispatch = useDispatch()


  // --------------- Simpan data Alamat Baru --------------- //
  const formik = useFormik({
    initialValues: {
      receiver_name: `${namaPenerimaEd}`,
      receiver_phone: `${PhoneEd}`,
      address: `${alamatEd}`,
      province: `${provinsiEd}`,
      province_id: `${provinsiIdEd}`,
      city_name: `${cityEd}`,
      city_id: `${city_idEd}`,
      postal_code: `${postalCodeEd}`,
    },
    onSubmit: async () => {
      const { receiver_name, receiver_phone, address, province_id, city_id, postal_code, default_address } = formik.values
      try {
        let body = {
          receiver_name: receiver_name,
          receiver_phone: receiver_phone,
          address: address,
          province: province,
          province_id: province_id,
          city_name: city,
          city_id: city_id,
          postal_code: postal_code,
        }

        await axiosInstance.patch("/address/" + idalamatEd, qs.stringify(body))
        dispatch({
          type: "FETCH_RENDER",
          payload: { value: !autoRender.value }
        })
        toast({
          title: `Berhasil Menambah alamat baru`,
          status: "success",
          isClosable: true,
        })
      } catch (err) {
        console.log(err);
      }
      formik.setSubmitting(false)
    }
  });

  // --------------- Fetching Province Raja Ongkir --------------- //
  async function fetchProvinceRajaOngkir() {
    try {
      const res = await axios.get('https://api.rajaongkir.com/starter/province', {
        headers: { 'key': '461415f8b280e7996178dd23957c633e' }
      })
      setProvinceRajaOngkir(res.data.rajaongkir.results)
      // console.log(res.data.rajaongkir.results)
    } catch (err) {
      console.log(err)
    }
  };

  const renderProvinceRajaOngkir = () => {
    return provinceRajaOngkir.map((val, index) => {
      return (
        <option value={val.province_id}>{val.province}</option>
      )
    })
  }

  // ---------- Buat ambil nama Provinsi ---------- //
  async function setTheProvinceName() {
    try {
      const res = await axios.get('https://api.rajaongkir.com/starter/province?id=' + formik.values.province_id, {
        headers: { 'key': '461415f8b280e7996178dd23957c633e' }
      })
      setProvince(res.data.rajaongkir.results.province)
      // console.log(res.data.rajaongkir.results.province)
    } catch (err) {
      console.log(err)
    }
  };

  // ---------- Fetching City Raja Ongkir ---------- //
  async function fetchCityRajaOngkir() {
    let res
    try {
      res = await axios.get(`https://api.rajaongkir.com/starter/city?province=${formik.values.province_id}`, {
        headers: { 'key': '461415f8b280e7996178dd23957c633e' }
      })
      setCityRajaOngkir(res.data.rajaongkir.results)
      // console.log(res.data.rajaongkir.results)
    } catch (err) {
      console.log(err)
    }
  };

  const renderCityRajaOngkir = () => {
    return cityRajaOngkir.map((val, index) => {
      return (
        <option value={val.city_id}>{val.city_name}</option>
      )
    })
  }

  const renderPostCodeRajaOngkir = () => {
    return cityRajaOngkir.map((val, index) => {
      return (
        <option value={val.postal_code}>{val.postal_code}</option>
      )
    })
  }

  // ---------- Buat ambil nama Kota ---------- //
  async function setTheCityName() {
    try {
      const res = await axios.get('https://api.rajaongkir.com/starter/city?id=' + formik.values.city_id, {
        headers: { 'key': '461415f8b280e7996178dd23957c633e' }
      })
      setCity(res.data.rajaongkir.results.city_name)
      setTypeCity(res.data.rajaongkir.results.type)
      setPostalCode(res.data.rajaongkir.results.postal_code)
      // console.log(res.data.rajaongkir.results.province)
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchProvinceRajaOngkir()
    fetchCityRajaOngkir()
  }, []);

  useEffect(() => {
    setTheProvinceName()
    fetchCityRajaOngkir()
  }, [formik.values.province_id]);

  useEffect(() => {
    setTheCityName()
  }, [formik.values.city_id]);

  return (
    <>
      <Box display='flex'>
        <Box>
          {/* -------------------- receiver_name -------------------- */}
          <FormControl isInvalid={formik.errors.receiver_name}>
            {/* {formik.values.receiver_name} */}
            <FormLabel display='flex'>Nama Penerima<Text color='red'>*</Text></FormLabel>
            <Input defaultValue={namaPenerimaEd}
              placeholder='Nama Penerima'
              required
              type="text"
              maxLength={"120"}
              onChange={(event) =>
                formik.setFieldValue("receiver_name", event.target.value)
              }
            />
            <FormHelperText color="red">
              {formik.errors.receiver_name}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box ml='10px'>
          {/* -------------------- receiver_name -------------------- */}
          <FormControl isInvalid={formik.errors.receiver_phone}>
            {/* {formik.values.receiver_phone} */}
            <FormLabel display='flex'>Nomor HP penerima<Text color='red'>*</Text></FormLabel>
            <Input defaultValue={PhoneEd}
              placeholder='Nomor HP'
              required
              type="number"
              maxLength={"120"}
              onChange={(event) =>
                formik.setFieldValue("receiver_phone", event.target.value)
              }
            />
            <FormHelperText color="red">
              {formik.errors.receiver_phone}
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>

      {/* -------------------- Address -------------------- */}
      <FormControl isInvalid={formik.errors.address}>
        {/* {formik.values.address} */}
        <FormLabel display='flex'>Alamat Lengkap<Text color='red'>*</Text></FormLabel>
        <Textarea
          placeholder='ex: jl. Hangtuah'
          required
          type="text"
          defaultValue={alamatEd}
          maxLength={"300"}
          onChange={(event) =>
            formik.setFieldValue("address", event.target.value)
          }
        />
        <FormHelperText color="red">
          {formik.errors.address}
        </FormHelperText>
      </FormControl>

      {/* -------------------- Province -------------------- */}
      <FormControl isInvalid={formik.errors.province_id} marginTop={"10px"}>
        <FormLabel display='flex'>Provinsi<Text color='red'>*</Text></FormLabel>
        {/* {formik.values.province_id} */}
        <Select onChange={(event) => formik.setFieldValue("province_id", event.target.value)}
          defaultValue={provinsiEd}>
          <option value={provinsiIdEd}>{provinsiEd}</option>
          {renderProvinceRajaOngkir()}
        </Select>
        <FormHelperText color="red">
          {formik.errors.province_id}
        </FormHelperText>
      </FormControl>

      {/* -------------------- City -------------------- */}
      <FormControl isInvalid={formik.errors.city_id} marginTop={"10px"} >
        <FormLabel display='flex'>Kota / Kabupaten <Text color='red'>*</Text></FormLabel>
        {/* {formik.values.city_id} */}
        <Select onChange={(event) => formik.setFieldValue("city_id", event.target.value)}
          defaultValue={cityEd}>
          <option value={city_idEd}>{cityEd}</option>
          {renderCityRajaOngkir()}
        </Select>
        <FormHelperText color="red">
          {formik.errors.city_id}
        </FormHelperText>
      </FormControl>

      {/* -------------------- Postal Code -------------------- */}
      <FormControl isInvalid={formik.errors.postal_code} marginTop={"10px"}>
        <FormLabel display='flex'>Kode Post<Text color='red'>*</Text></FormLabel>
        {/* {formik.values.postal_code} */}
        <Select onChange={(event) => formik.setFieldValue("postal_code", event.target.value)}
          defaultValue={postalCodeEd}>
          <option value={postalCodeEd}>{postalCodeEd}</option>
          {renderPostCodeRajaOngkir()}
        </Select>
        <FormHelperText color="red">
          {formik.errors.postal_code}
        </FormHelperText>
      </FormControl>

      <Button
        // onClick=
        // {() => {
        //   async function submit() {
        //     await formik.handleSubmit();
        //     onClose();
        //   }
        //   submit()
        // }}
        onClick={formik.handleSubmit}
        disabled={formik.values.address && formik.values.province_id
          && formik.values.city_id ? false : true}
        colorScheme='twitter' mt={'10px'}>Simpan Perubahan</Button>
    </>
  )
}