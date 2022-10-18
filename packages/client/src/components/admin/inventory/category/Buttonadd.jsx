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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFileRef = useRef(null)
  const dispatch = useDispatch()
  const toast = useToast();
  const autoRender = useSelector((state) => state.automateRendering)

  //    async function addCategory() {
  const formik = useFormik({
    initialValues: {
      category: "",
      image: "",

    },
    onSubmit: async () => {
      const formData = new FormData();
      const { category } = formik.values

      try {
        formData.append("category", category)
        formData.append("image", selectedFile)
        let body = {
          category: category,
        }

        axiosInstance.post("/category/api/v1/Category", formData).then(() => {
          dispatch({
            type: "FETCH_RENDER",
            payload: { value: !autoRender.value }
          })

          toast({
            title: "Succes",
            description: "Berhasil menambah category",
            status: "success",
            isClosable: true,
          })
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
  })

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0])
    const uploaded = event.target.files[0];
    setImageShow(URL.createObjectURL(uploaded))
  }


  return (

    <Button onClick={onOpen}>Tambah Category
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambahkan Jenis kategori baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width="200px" mt="20px">
              <Text>Nama Kategori baru</Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Masukan Jenis Kategori"
                onChange={(e) => {
                  formik.setFieldValue("category", e.target.value);
                }}></Input>
            </Box>
            <Box>

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
                  onClose();
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