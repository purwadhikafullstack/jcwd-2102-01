import {
  Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
  MenuDivider, Text, Icon, useDisclosure, Link, Modal,
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
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { axiosInstance } from '../../../../lib/api';
import qs from "qs";
import * as Yup from "yup";

export default function Buttoneditprod({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState([])
  const autoRender = useSelector((state) => state.automateRendering)
  //    const {editCategory,editMargin,editFirstprice,editTotalsold,editIsiperkemasan,editConverted,editSellingprice,editCapitalprice,editStock,editKomposisi,editWeight,editPeringatan,editProductname,editImage,editCode, editKegunaan,editKemasan,editGolongan,editCarasimpan,editNomor_ijin_edar, editCara_pakai,editId} = data
  const { id, product_code, product_name, kegunaan, kemasan, golongan, cara_simpan, nomor_ijin_edar, cara_pakai, peringatan, weight, komposisi, stock, capital_price, selling_price, converted, isi_perkemasan, total_sold, first_price, margin, Product_stocks, image_url, Product_images, Product_stock, Product_description, Product_categories } = data
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null)
  const [imageShow, setImageShow] = useState(null)
  const dispatch = useDispatch()
  //  const [editInput, setEditInput] = useState(false)
  async function fetchrenderCat() {
    try {
      await axiosInstance.get("/category/").then((res) => {
        setCategory(res.data.result);

      })
    } catch (err) {
      console.log(err);
    }
  }
  // state bberubah kao ada onchange 
  // pada saat looping defaultvalue tidak merubah state 
  // gmn cara supaya pada saat looping state berubah 
  // berarti gw harus setstate pada saat byka modal
  const formik = useFormik({
    initialValues: {
      product_name: product_name, //ini values harus sesuai dengan yang ada di dalam data (props yang u panggil diatas)
      // setelah itu harus dilihat dengan menggunakan conslole.log masing2 dari data dan bodynya, contoh dari kondisi sekarang adalah 
      // initial value nama dan kode produk dapat berjalan karena memang terbuka dalam table produk namun di dalam data
      // isinya dari kolom laoin merupakan isi dari table yang berbeda dan informasi tersebut dapat dilihat di dalam 
      //console.log dari data
      image_url: Product_images.image_url,
      product_code: product_code,
      kegunaan: Product_description.kegunaan,
      kemasan: Product_description.kemasan,
      golongan: Product_description.golongan,
      cara_simpan: Product_description.cara_simpan,
      nomor_ijin_edar: Product_description.nomor_ijin_edar,
      cara_pakai: Product_description.cara_pakai,
      peringatan: Product_description.peringatan,
      weight: Product_description.weight,
      komposisi: Product_description.komposisi,
      stock: Product_stocks[0].stock,
      capital_price: Product_stocks[0].capital_price,
      selling_price: Product_stocks[0].selling_price,
      converted: Product_stocks[0].converted,
      isi_perkemasan: Product_stocks[0].isi_perkemasan,
      total_sold: Product_stocks[0].total_sold,
      first_price: Product_stocks[0].first_price,
      margin: Product_stocks[0].margin,
      category: Product_categories[0].category,
    },
    enableReinitialize: true,
    // validationSchema: Yup.object().shape({
    //     product_name:Yup.string().required("Edit Product Name is required"), //ini nama initial values bebas lu masukn apa aja
    //     image_url:Yup.string().required("Edit Image is required"),
    //     product_code:Yup.string().required("Edit Product Code is required"),
    //     kegunaan:Yup.string().required("Edit Kegunaan is required"),
    //     kemasan:Yup.string().required("Edit Kemasan is required"),
    //     golongan:Yup.string().required("Edit Golongan is required"),
    //     cara_simpan:Yup.string().required("Edit Cara Simpan is required"),
    //     nomor_ijin_edar:Yup.string().required("Edit Nomor Ijin Edar is required"),
    //     cara_pakai:Yup.string().required("Edit Cara Pakai is required"),
    //     peringatan:Yup.string().required("Edit Peringatan is required"),
    //     weight:Yup.string().req1uired("Edit Weight is required"),
    //     komposisi:Yup.string().required("Edit Komposisi is required"),
    //     stock:Yup.string().required("Edit Stock is required"),
    //     capital_price:Yup.string().required("Edit Capital Price is required"),
    //     selling_price:Yup.string().required("Edit Selling Price is required"),
    //     converted:Yup.string().required("Edit Converted is required"),
    //     isi_perkemasan:Yup.string().required("Edit isi Perkemasan is required"),
    //     total_sold:Yup.string().required("Edit Total Sold is required"),
    //     first_price:Yup.string().required("Edit First Price is required"),
    //     margin:Yup.string().required("Edit Margin is required"),
    //     // category:Yup.string().required("Edit Category is required"),
    //  }),
    // validateOnChange: false,
    onSubmit: async (values) => {
      const formData = new FormData();
      const { product_name, product_code, kegunaan, kemasan, golongan, cara_simpan, nomor_ijin_edar, cara_pakai, peringatan, weight, komposisi, stock, capital_price, selling_price, converted, isi_perkemasan, total_sold, first_price, margin, category } = formik.values
      //   alert(change_product)
      try {

        console.log(data)

        formData.append("product_name", product_name)
        formData.append("image_url", selectedFile)
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

        let body = {
          product_name: values.product_name,
          // image_url: values.Image,
          product_code: values.product_code,
          kegunaan: values.kegunaan,
          kemasan: values.kemasan,
          golongan: values.golongan,
          cara_simpan: values.cara_simpan,
          nomor_ijin_edar: values.nomor_ijin_edar,
          cara_pakai: values.cara_pakai,
          peringatan: values.peringatan,
          weight: values.weight,
          komposisi: values.komposisi,
          stock: values.stock,
          capital_price: values.capital_price,
          selling_price: values.selling_price,
          converted: values.converted,
          isi_perkemasan: values.isi_perkemasan,
          total_sold: values.total_sold,
          first_price: values.first_price,
          margin: values.margin,
          category: values.category,
        }

        await axiosInstance.patch("/products/" + id, formData).then(() => {
          //qs.stringfy ngubah data ke bentuk json

          // setEditInput(false)
          // dispatch({
          //     type: "FETCH_RENDER",
          //     payload: { value: !autoRender.value }
          //   })
          toast({
            title: `Product has been edited`,
            description: "Berhasil mengedit produk",
            status: "success",
            isClosable: true,
          })
          console.log(body)

        })
      } catch (err) {
        // console.log(editId);
        console.log(err);
      }
    }
  })
  const renderpostCat = () => {
    return (

      <Select placeholder='Select option'
        onChange={(e) => formik.setFieldValue("id_category", e.target.value)}
        defaultValue={formik.values.category}>
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
  useEffect(() => {
    fetchrenderCat()
  }, [
    // autoRender.value
  ])
  return (
    <>
      <Button onClick={onOpen}>Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width="200px" mt="20px">
              <Text>Ganti nama Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              {formik.values.product_name}
              <Input placeholder="Ganti Nama Jenis Product"
                onChange={(e) => {
                  formik.setFieldValue("product_name", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={product_name} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti Kode Product </Text>
              {formik.values.product_code}

            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti Kode Product"
                onChange={(e) => {
                  formik.setFieldValue("product_code", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={product_code} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti Kegunaan Product </Text>
            </Box>
            {formik.values.kegunaan}
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti Kegunaan Product"
                onChange={(e) => {
                  formik.setFieldValue("kegunaan", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.kegunaan} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti Kemasan Product </Text>
            </Box>

            <Box width="200px" mt="20px">
              <Input placeholder="Ganti kemasan Product"
                onChange={(e) => {
                  formik.setFieldValue("kemasan", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.kemasan} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti Golongan Product </Text>
            </Box>
            {formik.values.golongan}
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti Golongan Product"
                onChange={(e) => {
                  formik.setFieldValue("golongan", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.golongan} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti Cara Simpan Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti cara penyimpanan Product"
                onChange={(e) => {
                  formik.setFieldValue("cara_simpan", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.cara_simpan} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti Nomor Ijin Edar Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti Nomor Ijin Edar Product"
                onChange={(e) => {
                  formik.setFieldValue("nomor_ijin_edar", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.nomor_ijin_edar} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti Cara Pakai Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti cara pemakaian Product"
                onChange={(e) => {
                  formik.setFieldValue("cara_pakai", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.cara_pakai} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti peringatan Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti peringatan untuk Product"
                onChange={(e) => {
                  formik.setFieldValue("peringatan", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.peringatan} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti weight Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti berat dari Product"
                onChange={(e) => {
                  formik.setFieldValue("weight", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.weight} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti Komposisi Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti Komposisi Product"
                onChange={(e) => {
                  formik.setFieldValue("komposisi", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.komposisi} />
            </Box>

            <Box width="200px" mt="20px">
              <Text>Ganti stock Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti banyak stock dari Product"
                onChange={(e) => {
                  formik.setFieldValue("stock", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.stock} />
            </Box>


            <Box width="200px" mt="20px">
              <Text>Ganti Capital Price Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti Modal Product"
                onChange={(e) => {
                  formik.setFieldValue("capital_price", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.capital_price} />
            </Box>


            <Box width="200px" mt="20px">
              <Text>Ganti Harga Jual Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti harga jual Product"
                onChange={(e) => {
                  formik.setFieldValue("selling_price", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.selling_price} />
            </Box>


            <Box width="200px" mt="20px">
              <Text>Ganti konversi Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti konversi Product"
                onChange={(e) => {
                  formik.setFieldValue("converted", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.converted} />
            </Box>


            <Box width="200px" mt="20px">
              <Text>Ganti Isi Perkemasan Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti isi perkemasan Product"
                onChange={(e) => {
                  formik.setFieldValue("isi_perkemasan", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.isi_perkemasan} />
            </Box>


            <Box width="200px" mt="20px">
              <Text>Ganti total penjualan Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti banyak penjualan dari Product"
                onChange={(e) => {
                  formik.setFieldValue("total_sold", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.total_sold} />
            </Box>


            <Box width="200px" mt="20px">
              <Text>Ganti harga awal Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti harga awal Product"
                onChange={(e) => {
                  formik.setFieldValue("first_price", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.first_price} />
            </Box>


            <Box width="200px" mt="20px">
              <Text>Ganti margin Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti margin Product"
                onChange={(e) => {
                  formik.setFieldValue("margin", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={formik.values.margin} />
            </Box>


            <Box width="200px" mt="20px">
              <Text>Ganti category Product </Text>
            </Box>
            <Box width="200px" mt="20px">
              {/* <Input placeholder="Ganti category Product"
                 onChange={(e) => {
                     formik.setFieldValue("category", e.target.value); //harus seuai sama field yang lu tulis di init value
                    }} defaultValue={formik.values.category}/> */}
              {renderpostCat()}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} m='1 px' onClick={() => {
              async function submit() {
                await formik.handleSubmit();
                onClose();
              }
              submit()
            }}>Simpan</Button>
            <Button variant='ghost' onClick={onClose}>
              Tutup
            </Button>
            <Button onClick={() => {
              console.log(data)
            }}>
              check
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

