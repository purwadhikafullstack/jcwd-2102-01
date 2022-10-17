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

import { axiosInstance } from '../../../../lib/api';
import qs from "qs";
import * as Yup from "yup";

export default function Buttonedit(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState([])
  const autoRender = useSelector((state) => state.automateRendering)
  const { editCategory, editId } = props
  const toast = useToast();
  const dispatch = useDispatch()
  //  const [editInput, setEditInput] = useState(false)


  const formik = useFormik({
    initialValues: {
      change_category: `${category}`,
    },
    validationSchema: Yup.object().shape({
      change_category: Yup.string().required("Edit Category is required")
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { change_category } = formik.values
      // alert(change_category)
      try {
        let body = {
          category: change_category,
        }

        await axiosInstance.patch("/category/api/v1/Category/" + editId, qs.stringify(body)).then(() => {


          // setEditInput(false)
          dispatch({
            type: "FETCH_RENDER",
            payload: { value: !autoRender.value }
          })
          toast({
            title: `Category has been edited`,
            description: "Berhasil mengedit category",
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

  return (
    <>
      <Button onClick={onOpen}>Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width="200px" mt="20px">
              <Text>Ganti nama Category </Text>
            </Box>
            <Box width="200px" mt="20px">
              <Input placeholder="Ganti Jenis Kategori"
                onChange={(e) => {
                  formik.setFieldValue("change_category", e.target.value); //harus seuai sama field yang lu tulis di init value
                }} defaultValue={editCategory} />
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

