import {
  Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
  MenuDivider, Text, Icon, useDisclosure, Link, Modal,

  FormLabel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalProfPicture,
  ModalBody,
  ModalFooter, Button, Center, FormControl, Stack, HStack, VStack, Select, useNumberInput,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast
} from '@chakra-ui/react';
import AdminNavBar from "../../sidebar/AdminNavBar";
import SideBar from "../../sidebar/sidebar";
import AdmFooter from '../../admfooter/admfooter';
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { axiosInstance } from '../../../../lib/api';
import qs from "qs";
import * as yup from "yup";

export default function Buttonadd(props) {
  const { catadd, imgadd, idadd } = props
  const [imageShow, setImageShow] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [category, setCategory] = useState([])
  const [units, setUnits] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFileRef = useRef(null)
  const dispatch = useDispatch()
  const toast = useToast();
  const autoRender = useSelector((state) => state.automateRendering)

  async function fetchrenderUnit() {
    try {
      await axiosInstance.get("/products/api/v1/units").then((res) => {
        setUnits(res.data.result);

      })
    } catch (err) {
      console.log(err);
    }
  }

  const renderpostUnit = () => {
    return (

      <Select placeholder='Select option'
        onChange={(e) => formik.setFieldValue("id_unit", e.target.value)}>

        {units?.map((val, index) => {
          return (
            <>
              <option value={val.id}>{val.unit_name}</option>
              {/* <option value={val.id=2}>{val.unit_name}</option>
            <option value={val.id=3}>{val.unit_name}</option> */}
            </>
          )
        }
        )
        }

      </Select>
    )

  }

  async function fetchrenderCat() {
    try {
      await axiosInstance.get("/category/").then((res) => {
        setCategory(res.data.result);

      })
    } catch (err) {
      console.log(err);
    }
  }

  const renderpostCat = () => {
    return (

      <Select placeholder='Select option'
        onChange={(e) => formik.setFieldValue("id_category", e.target.value)}>
        {category?.map((val, index) => {
          return (
            <>
              <option value={val.id}>{val.category}</option>
              {/* <option value={val.id=2}>{val.unit_name}</option>
            <option value={val.id=3}>{val.unit_name}</option> */}
            </>
          )
        }
        )
        }

      </Select>
    )

  }


  const formik = useFormik({
    initialValues: {
      product_name: "", //ini nama initial values bebas lu masukn apa aja
      image: "",
      product_code: "",
      kegunaan: "",
      kemasan: "",
      golongan: "",
      cara_simpan: "",
      nomor_ijin_edar: "",
      cara_pakai: "",
      peringatan: "",
      weight: "",
      komposisi: "",
      stock: "",
      capital_price: "",
      selling_price: "",
      converted: "",
      isi_perkemasan: "",
      total_sold: "",
      first_price: "",
      margin: "",
      category: "",
      unit_name: "",
      id_unit: "",
      id_category: "",
    },
    onSubmit: async () => {
      const formData = new FormData();
      const { product_name } = formik.values //ini ikutin initial value
      const { product_code } = formik.values
      const { kegunaan } = formik.values
      const { kemasan } = formik.values
      const { golongan } = formik.values
      const { cara_simpan } = formik.values
      const { nomor_ijin_edar } = formik.values
      const { cara_pakai } = formik.values
      const { peringatan } = formik.values
      const { weight } = formik.values
      const { komposisi } = formik.values
      const { stock } = formik.values
      const { capital_price } = formik.values
      const { selling_price } = formik.values
      const { converted } = formik.values
      const { isi_perkemasan } = formik.values
      const { total_sold } = formik.values
      const { first_price } = formik.values
      const { margin } = formik.values
      const { category } = formik.values
      const { unit_name } = formik.values
      const { id_unit } = formik.values
      const { id_category } = formik.values




      try {
        formData.append("product_name", product_name) //yang kiri nama kolom yang kanan nama formik.values
        formData.append("product_code", product_code)
        formData.append("kegunaan", kegunaan)
        formData.append("kemasan", kemasan)
        formData.append("golongan", golongan)
        formData.append("cara_simpan", cara_simpan)
        formData.append("nomor_ijin_edar", nomor_ijin_edar)
        formData.append("cara_pakai", cara_pakai)
        formData.append("peringatan", peringatan)
        formData.append("weight", weight)
        formData.append("komposisi", komposisi)
        formData.append("stock", stock)
        formData.append("capital_price", capital_price)
        formData.append("selling_price", selling_price)
        formData.append("converted", converted)
        formData.append("isi_perkemasan", isi_perkemasan)
        formData.append("total_sold", total_sold)
        formData.append("first_price", first_price)
        formData.append("margin", margin)
        formData.append("category", category)
        formData.append("unit_name", unit_name)
        formData.append("image", selectedFile)
        formData.append("id_unit", id_unit)
        formData.append("id_category", id_category)


        // let body={
        //     product_name: product,
        // }
        alert(formik.values.id_category)
        alert(formik.values.id_unit)
        axiosInstance.post("/products/api/v1/product", formData).then(() => {
          //   dispatch({
          //     type: "FETCH_RENDER",
          //     payload: { value: !autoRender.value }
          //   })

          toast({
            title: "Succes",
            description: "Berhasil menambah product",
            status: "success",
            // isClosable: false,
          })
        })
      } catch (err) {
        console.log(err);
        toast({
          title: "Error",
          description: err.toString(),
          status: "error",
          // isClosable: false,
        })
      }
    }
  })

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0])
    const uploaded = event.target.files[0];
    setImageShow(URL.createObjectURL(uploaded))
  }


  useEffect(() => {
    fetchrenderUnit(), fetchrenderCat()
  }, [
    // autoRender.value
  ])
  return (

    <Button onClick={onOpen}>Tambah Product
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambahkan Jenis Produk baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width="200px" mt="20px">
              <Text>Nama Produk baru</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Masukan Jenis Produk"
                onChange={(e) => {
                  formik.setFieldValue("product_name", e.target.value); //nama set field values harus disamakan dengan nama props yang ditulis di initial values
                }}></Input>
            </Box>

            <Box width="200px" mt="20px">
              <Text>Code Produk baru</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Masukan Kode Produk"
                onChange={(e) => {
                  formik.setFieldValue("product_code", e.target.value);
                }}></Input>
            </Box>

            <Box width="200px" mt="20px">
              <Text>Kegunaan Produk baru</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Masukan Kegunaan Produk"
                onChange={(e) => {
                  formik.setFieldValue("kegunaan", e.target.value);
                }}></Input>
            </Box>

            <Box width="200px" mt="20px">
              <Text>Nama Kemasan baru</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Masukan Jenis Produk"
                onChange={(e) => {
                  formik.setFieldValue("kemasan", e.target.value);
                }}></Input>
            </Box>

            <Box width="200px" mt="20px">
              <Text>Golongan</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Masukan Golongan Produk"
                onChange={(e) => {
                  formik.setFieldValue("golongan", e.target.value);
                }}></Input>
            </Box>

            <Box width="200px" mt="20px">
              <Text>Cara simpan produk</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Masukan Cara penyimpanan Produk"
                onChange={(e) => {
                  formik.setFieldValue("cara_simpan", e.target.value);
                }}></Input>
            </Box>
            <Box>


              <Box width="200px" mt="20px">
                <Text>Nomor ijin edar Produk baru</Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan nomor ijin edar Produk"
                  onChange={(e) => {
                    formik.setFieldValue("nomor_ijin_edar", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Cara pakai Produk baru</Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan Cara Pakai Produk"
                  onChange={(e) => {
                    formik.setFieldValue("cara_pakai", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Peringatan Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan Peringatan untuk Produk"
                  onChange={(e) => {
                    formik.setFieldValue("peringatan", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Berat Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan Berat dari Produk"
                  onChange={(e) => {
                    formik.setFieldValue("weight", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Komposisi Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan komposisi resep dari Produk"
                  onChange={(e) => {
                    formik.setFieldValue("komposisi", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Stock Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan Stock Produk"
                  onChange={(e) => {
                    formik.setFieldValue("stock", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Unit </Text>
              </Box>
              {/* <Box width="200px" mt="20px"> */}
              {renderpostUnit()}
              {/* </Box> */}

              <Box width="200px" mt="20px">
                <Text>Modal Produk</Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan Modal awal untuk Produk"
                  onChange={(e) => {
                    formik.setFieldValue("capital_price", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Harga Jual Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan harga jual untuk Produk"
                  onChange={(e) => {
                    formik.setFieldValue("selling_price", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Konversi untuk Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Jenis konversi untuk Produk"
                  onChange={(e) => {
                    formik.setFieldValue("converted", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Isi perkemasan dari Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan isi perkemasan untuk Produk"
                  onChange={(e) => {
                    formik.setFieldValue("isi_perkemasan", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>total penjualan Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan total penjualan untuk Produk"
                  onChange={(e) => {
                    formik.setFieldValue("total_sold", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Harga awal Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan harga awal untuk Produk"
                  onChange={(e) => {
                    formik.setFieldValue("first_price", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Margin Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                <Input placeholder="Masukan margin penjualan untuk Produk"
                  onChange={(e) => {
                    formik.setFieldValue("margin", e.target.value);
                  }}></Input>
              </Box>

              <Box width="200px" mt="20px">
                <Text>Categori Produk </Text>
              </Box>
              <Box width="200px" mt="20px">
                {renderpostCat()}
              </Box>




            </Box>
            <FormControl>
              <FormLabel> Image </FormLabel>
              <Box>
                <Box w='400px' h='300px' rounded='lg' >
                  {/* {imageShow !==
                      <NextImage src={uploadLoading} rounded='lg' />
                      &&  */}
                  {/* <Image src={imageShow} objectFit='cover' w='400px' h='300px' rounded='lg' />} */}
                </Box>
                <Input type='file' onChange={handleFile}
                  accept={"image/png, image/jpg, image/jpeg"} ref={inputFileRef} />
                <Button background='#72FFFF' mt='5px' size='sm' onClick={() => inputFileRef.current.click()} >Upload Image</Button>
                <Button size='sm' mt='5px' ml='5px' background='#FFB4B4' onClick={() => {
                  setImageShow(null)
                  setSelectedFile(null)
                }}>Cancel</Button>
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} m='1 px' onClick=
              {() => {
                async function submit() {
                  await formik.handleSubmit();
                  // onClose();
                }
                submit()
              }}>Simpan</Button>
            <Button variant='ghost' onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Button>
  )
}