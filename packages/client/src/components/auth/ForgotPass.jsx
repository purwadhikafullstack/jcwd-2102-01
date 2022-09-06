import {
  Button, Modal, Link, ModalBody, ModalHeader, Text,
  ModalContent, ModalCloseButton, ModalOverlay, FormControl, FormHelperText,
  FormLabel, Input, Box, useToast
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import qs from 'qs';
import * as Yup from "yup";
import { useFormik } from "formik";
import { axiosInstance } from '../../lib/api';

export default function ForgotPass() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .matches(/@/, "Please inclue an '@' in the email address")
        .matches(/.com/, "Please inclue an '.com' in the email address"),
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { email } = formik.values
      try {
        let body = {
          email: email,
        }

        await axiosInstance.post("/user/sendResetPass", qs.stringify(body))
        toast({
          title: `Success send link`,
          title: `We have send link for reset password to your email`,
          status: "success",
          isClosable: true,
        })
      } catch (err) {
        console.log(err);
      }
      formik.setSubmitting(false)
      formik.resetForm('comment_post', "")
    }
  })

  return (
    <>
      <Link onClick={onOpen} fontSize='sm' color={'blue.400'} style={{ textDecoration: 'none' }} fontWeight='semibold'>Lupa Kata Sandi?</Link>
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lupa kata sandi saat Login?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl >
              {/* <Text>{formik.values.email}</Text> */}
              <FormLabel>
                Masukkan email anda, kami akan segera mengirim link reset kata sandi ke email anda
              </FormLabel>
              <Input placeholder='user@email.com'
                onChange={(event) =>
                  formik.setFieldValue("email", event.target.value)} mt={'10px'} maxLength={'40'} />
              <FormHelperText color='red'>{formik.errors.email}</FormHelperText>
            </FormControl>
            <Box mt={'10px'}>
              <Button colorScheme='blue' mr={3}
                onClick={
                  () => {
                    async function submit() {
                      await formik.handleSubmit();
                      onClose();
                    }
                    submit()
                  }}
                disabled={formik.values.email.length > 9 ? false : true} >
                Kirim Link
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}