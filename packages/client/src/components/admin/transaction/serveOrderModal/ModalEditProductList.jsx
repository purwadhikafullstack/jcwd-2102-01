import {
  Box, Text, Modal, ModalCloseButton, Icon, Tooltip, ModalOverlay, ModalHeader, ModalBody, useDisclosure, ModalFooter,
  FormControl, Button, useToast, FormHelperText, ModalContent, NumberInput, NumberInputField,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from "formik";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { axiosInstance } from '../../../../lib/api';
import * as Yup from "yup";
import qs from 'qs';

export default function ModalEditProductList(props) {
  const { transactionId, orderListId, productName, totalPrice, price, buyQuantity, stokProduk, unitName } = props
  const { isOpen: isOpenOrderEdit, onOpen: onOpenOrderEdit, onClose: onCloseOrderEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
  const dispatch = useDispatch()
  const autoRender = useSelector((state) => state.automateRendering)
  const toast = useToast();

  // -------------------- edit Order -------------------- //
  const formik = useFormik({
    initialValues: {
      qtyBuy: ``,
    },
    validationSchema: Yup.object().shape({
      qtyBuy: Yup.string().required("quantity wajib diisi").
        max(buyQuantity, `Stok tidak mencukupi (sisa Stok ${stokProduk} ${unitName})`).
        min(1, `minimal quantity 1`),
    }),
    validateOnChange: false,
    onSubmit: async () => {
      // dispatch(userEdit(values, formik.setSubmitting))
      const { qtyBuy } = formik.values

      let msg = ""
      try {
        let body = {
          buy_quantity: qtyBuy,
          id_transaction: transactionId,
          total_price: parseFloat(totalPrice),
          price: parseFloat(price),
        };

        if (qtyBuy <= 0) {
          toast({
            title: "minimal quantity 1",
            status: "error",
            isClosable: true,
          })
        } else if (qtyBuy > stokProduk) {
          toast({
            title: "Stok tidak mencukupi",
            status: "error",
            isClosable: true,
          })
        } else {
          const res = await axiosInstance.post(`/transaction/api/v1/recipes/transactionList/${orderListId}`, qs.stringify(body));

          dispatch({
            type: "FETCH_RENDER",
            payload: { value: !autoRender.value }
          })
          toast({
            title: "Berhasil edit quantity Order",
            status: "success",
            isClosable: true,
          })
          onCloseOrderEdit()
        }
      } catch (err) {
        console.log(err);
      }
      formik.setSubmitting(false);
    }
  })

  // -------------------- Cancel Order -------------------- //
  const cancelOrder = async () => {
    try {
      let body = {
        id_transaction: transactionId,
        total_price: parseFloat(totalPrice),
      }
      let res = await axiosInstance.post(`/transaction/api/v2/recipes/transactionList/${orderListId}`, qs.stringify(body))
      // msg = res.data.message;
      // console.log(res.data.message);

      dispatch({
        type: "FETCH_RENDER",
        payload: { value: !autoRender.value }
      })
      toast({
        title: `anda Membatalkan order ${productName}`,
        status: "success",
        isClosable: true,
      })
    } catch (err) {
      console.log(err);
      toast({
        title: `error`,
        status: "error",
        isClosable: true,
      })
    }
  }

  return (
    <>
      {/* ----- Edit Produk ----- */}
      <Tooltip label='Edit Produk' fontSize='sm' >
        <Button variant='link' color='#009B90' _hover={{ color: 'orange' }} mr='5px' my='5px' size='sm' onClick={onOpenOrderEdit}>
          <Icon boxSize={4} as={FaEdit} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpenOrderEdit} onClose={onCloseOrderEdit} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Produk List</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box display='flex'>
              <Text fontWeight='semibold' color='#213360' minW='140px'>
                Nama Produk
              </Text>:
              <Text color='#213360' ml='5px' maxW='300px'>
                {productName}
              </Text>
            </Box>
            <Box display='flex'>
              <Text fontWeight='semibold' color='#213360' minW='140px'>
                Harga
              </Text>:
              <Text color='#213360' ml='5px' maxW='300px'>
                Rp {price?.toLocaleString()}
              </Text>
            </Box>
            <Box display='flex'>
              <Text fontWeight='semibold' color='#213360' minW='140px'>
                Sisa Stok
              </Text>:
              <Text color='#213360' ml='5px' maxW='300px'>
                {stokProduk} {unitName}
              </Text>
            </Box>
            <Box display='flex'>
              <Text fontWeight='semibold' color='#213360' minW='140px'>
                Quantity
              </Text>:
              {/* {formik.values.qtyBuy} */}
              <Text color='#213360' ml='5px' maxW='300px'>
                <FormControl isInvalid={formik.errors.qtyBuy}>
                  <NumberInput defaultValue={buyQuantity} min={1}>
                    <NumberInputField onChange={(event) => formik.setFieldValue("qtyBuy", event.target.value)} />
                  </NumberInput>
                  <FormHelperText color='red'>{formik.errors.qtyBuy}</FormHelperText>
                </FormControl>
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter >
            <Button mr={3} colorScheme='red' >
              Batal
            </Button>
            <Button colorScheme='whatsapp' mr={3} onClick={() => {
              async function submit() {
                await formik.handleSubmit();
              }
              submit()
            }}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ----- Batalkan Produk ----- */}
      <Tooltip label='Batalkan Produk' fontSize='sm' >
        <Button variant='link' color='#009B90' size='sm' _hover={{ color: 'red' }} onClick={onOpenDelete}>
          <Icon boxSize={4} as={FaTrashAlt} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size='sm'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Batalkan Produk</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box justifyContent={'space-between'}>
              <Text>Apakah anda yakin ingin membatalkan produk {productName}?</Text>
            </Box>
            <Box mt='10px' display='flex' justifyContent='flex-end'>
              <Button mr={3} colorScheme='red' onClick={() => {
                async function submit() {
                  await cancelOrder();
                  onCloseDelete();
                }
                submit()
              }}>
                Delete
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}