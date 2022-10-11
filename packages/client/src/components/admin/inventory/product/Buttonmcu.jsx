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

export default function Buttonmcu(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [units, setUnits] = useState([])
  const autoRender = useSelector((state) => state.automateRendering)
  //    const {editCategory,editMargin,editFirstprice,editTotalsold,editIsiperkemasan,editConverted,editSellingprice,editCapitalprice,editStock,editKomposisi,editWeight,editPeringatan,editProductname,editImage,editCode, editKegunaan,editKemasan,editGolongan,editCarasimpan,editNomor_ijin_edar, editCara_pakai,editId} = data
  // const {id, product_code, product_name, kegunaan, kemasan, golongan, cara_simpan, nomor_ijin_edar, cara_pakai, peringatan, weight, komposisi, stock, capital_price, selling_price, converted, isi_perkemasan, total_sold, first_price, margin, Product_stocks,image_url,  Product_images, Product_stock,Product_description, Product_categories} = data
  const { id, product_code, unit_name, product_name, kegunaan, kemasan, golongan, cara_simpan, nomor_ijin_edar, cara_pakai, peringatan, weight, komposisi, stock, capital_price, selling_price, converted, isi_perkemasan, total_sold, first_price, margin, Product_stocks, image_url, Unit, Product_images, Product_description, Product_categories } = props
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null)
  const [imageShow, setImageShow] = useState(null)
  const dispatch = useDispatch()
  //  console.log(stock);
  //  const [editInput, setEditInput] = useState(false)
  async function fetchrenderUnit(res) {
    try {
      await axiosInstance.get("/products/api/v1/units").then((res) => {
        setUnits(res.data.result);
      })
    } catch (err) {
      console.log(err);

    }
  }
  const formik = useFormik({
    initialValues: {
      // product_name:product_name,
      unit_name: unit_name,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      // const formData = new FormData();
      const { product_name, unit_name, id_unit, id_unit2, id_product, stock, isi_perkemasan, capital_price, selling_price, converted } = formik.values
      try {
        let body = {
          // product_name :values.product_name,
          stock: values.stock,
          id_product: values.id_produduct,
          isi_perkemasan: values.isi_perkemasan,
          id_unit: values.id_unit,
          id_unit2: values.id_unit2,
          capital_price: values.capital_price,
          selling_price: values.selling_price
        }
        //  }catch{
        toast({
          title: `Product has been edited`,
          description: "Berhasil mengedit produk",
          status: "success",
          isClosable: true,
        })
        console.log(body)

      }
      catch (err) {
        // console.log(editId);
        console.log(err);
      }
    }
  })
  // })
  // state bberubah kao ada onchange 
  // pada saat looping defaultvalue tidak merubah state 
  // gmn cara supaya pada saat looping state berubah 
  // berarti gw harus setstate pada saat byka modal

  const rendermcu = () => {
    return (

      <Select placeholder='Select option'
        onChange={(e) => formik.setFieldValue("id_unit", e.target.value)}
        defaultValue={formik.values.user_name}>
        {units?.map((val, index) => {
          // if()
          return (
            <>
              <option key={index} value={val.id}>{val.unit_name}</option>
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
  //   const rendermcu = () => {
  //     return unit.map((val, index)=>{
  //         if(val.unit == "Bottle")
  //         { null }
  //          else 
  //         {return(<option key={index} value={val.id}>{val.unit_name}</option>)}
  //     })
  // } 
  useEffect(() => {
    fetchrenderUnit()
  }, [
    // autoRender.value
  ])
  return (
    <>
      <Button onClick={onOpen}>Convertion
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konversi Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Box width="200px" mt="20px">
              <Text>Jumlah Stock</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Text>{Product_stocks[0].stock}</Text>
            </Box>

            <Box width="200px" mt="20px">
              <Text>Unit Produk</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Text>{Product_stocks[0].Unit.unit_name}</Text>
            </Box>

            <Box width="200px" mt="20px">
              <Text>isi Satuan</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Text>{Product_stocks[0].isi_perkemasan}</Text>
            </Box>

            <Box width="200px" mt="20px">
              <Text>Konversi Unit</Text>
            </Box>
            <Box width="200px" mt="20px">
              {rendermcu()}
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
            {/* <Button onClick={()=>{
                console.log(data)
            }}>
                check 
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

