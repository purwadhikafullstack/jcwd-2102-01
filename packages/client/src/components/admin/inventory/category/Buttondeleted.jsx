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
import * as yup from "yup";


export default function Buttondeleted(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState([])
  const autoRender = useSelector((state) => state.automateRendering)
  const { iddelete } = props
  const toast = useToast()
  const dispatch = useDispatch()

  async function deleteCategory() {
    try {
      await axiosInstance.delete("/category/api/v1/Category/" + iddelete)
      dispatch({
        type: "FETCH_RENDER",
        payload: { value: !autoRender.value }
      })

      toast({
        title: "Success",
        description: "Berhasil menghapus category",
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
  // console.log(id);
  return (
    <>
      <Button onClick={onOpen}>Delete</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Category ini?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Button colorScheme='blue' mr={3} m='1 px' onClick={() => {
              async function submit() {
                await deleteCategory();
                onClose();
              } submit()
            }}>Delete</Button>
            <Button variant='ghost' onClick={onClose}>
              Tutup
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}
