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
} from '@chakra-ui/react';
import AdminNavBar from "../../../../components/admin/sidebar/AdminNavBar";
import SideBar from "../../../../components/admin/sidebar/sidebar";
import AdmFooter from '../../../../components/admin/admfooter/admfooter';
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useState } from 'react';
import { useEffect } from 'react';

import { axiosInstance } from '../../../../lib/api';
import qs from "qs";
import * as yup from "yup";
import Buttonadd from '../../../../components/admin/inventory/category/Buttonadd';
import Buttonedit from '../../../../components/admin/inventory/category/Buttonedit';
import Buttondeleted from '../../../../components/admin/inventory/category/Buttondeleted';

export default function category() {

  // const { isOpen: isOpenEditCat, onOpen: onOpenEditCat, onCLose: onCloseEditCat } = useDisclosure();
  // const { isOpen: isOpenDeleteCat, onOpen: onOpenDeleteCat, onClose: onCloseDeleteCat } = useDisclosure();
  // const { isOpen: isOpenEditProf, onOpen: onOpenEditProf, onClose: onCloseEditProf } = useDisclosure()
  const dispatch = useDispatch();
  const categorySelector = useSelector((state) => state.auth);
  const [hapus, setHapus] = useState([])
  const [category, setCategory] = useState([])
  const autoRender = useSelector((state) => state.automateRendering)
  const formik = useFormik({
    initialValues: {
      category: `${categorySelector.category}`,
    },
    validationSchema: yup.object().shape({
      category: yup.string().required("isi jenis kategori"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(cat)
    }
  })


  async function fetchCategory() {
    try {
      await axiosInstance.get("/category").then((res) => {
        //    dispatch({
        //   type: "FETCH_RENDER",
        //   payload: { value: !autoRender.value }
        // })
        setCategory(res.data.result);
        // const temp = res.data.result
        // console.log(temp)
        const temp = res.data.result
        console.log(temp)

      })
    } catch (err) {
      console.log(err);
    }
  };
  const rendergetCategory = () => {
    return category.map((val, index) => {
      return (
        <Tr>
          <Td>{val.id}</Td>

          <Td>{val.category}</Td>

          <Td><Buttonedit
            key={index}
            editId={val.id}
          /></Td>

          <Td><Buttondeleted
            key={index}
            iddelete={val.id}
          /></Td>
        </Tr>
      )
    })
  }


  useEffect(() => {
    fetchCategory()
  }, [
    // autoRender.value
  ])

  //   async function deleteCategory() {
  //     try {
  //       await axiosInstance.delete("/category/" + id)
  //       dispatch({
  //         type: "FETCH_RENDER",
  //         payload: { value: !autoRender.value }
  //       })
  //       toast({
  //         title: "Succes",
  //         description: "Berhasil menghapus category",
  //         status: "success",
  //         isClosable: true,
  //       })
  //     } catch (err) {
  //       console.log(err);
  //       toast({
  //         title: "Error",
  //         description: err.toString(),
  //         status: "error",
  //         isClosable: true,
  //       })
  //   }
  // }
  return (
    <>
      <Flex bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
        <SideBar />
        <Box>
          <AdminNavBar />
          <Flex flexWrap={'wrap'} p='15px'>
            <Box px='2'>
              <Buttonadd />
            </Box>

            <TableContainer>
              <Table variant='striped' colorScheme='teal'>
                <TableCaption>Table Category</TableCaption>
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Kategori</Th>
                    <Th>Edit</Th>
                    <Th> Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rendergetCategory()}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>No</Th>
                    <Th>Kategori</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Flex>
          <AdmFooter />

        </Box>

      </Flex>

    </>
  )
}
