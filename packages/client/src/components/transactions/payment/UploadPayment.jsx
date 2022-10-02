import {
  Button, ModalBody, ModalHeader, Icon, Text,
  ModalContent, ModalCloseButton, FormControl,
  FormLabel, Input, Box, Textarea, useToast, Image
} from '@chakra-ui/react'
import { useFormik } from "formik";
import { useState, useRef, useEffect } from 'react';
import { axiosInstance } from '../../../lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5"
import qs from 'qs'
// import { Uploader } from "uploader";
// import { UploadButton } from "react-uploader";
import uploadLoading from '../../../assets/img/Frame1.png'
import NextImage from 'next/image'

export default function UploadPayment(props) {
  const { onClose, noInvoicePayment } = props
  const userSelector = useSelector((state) => state.auth)
  const autoRender = useSelector((state) => state.automateRendering)
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const inputFileRef = useRef(null)
  const target = useRef(null)
  const router = useRouter();
  const toast = useToast()
  const [imageShow, setImageShow] = useState(null)

  const formik = useFormik({
    initialValues: {
      caption: "",
      location: ""
    },
    onSubmit: async () => {
      const formData = new FormData();
      const { caption, location } = formik.values

      try {
        // ---------- form data for add to Post table ---------- //
        formData.append("caption", caption)
        formData.append("location", location)
        formData.append("user_id", userSelector.id)
        formData.append("image", selectedFile)

        await axiosInstance.patch("/user/" + userSelector.id, qs.stringify(body))
        await axiosInstance.post("/post", formData).then(() => {
          dispatch({
            type: "FETCH_RENDER",
            payload: { value: !autoRender.value }
          })

          toast({
            title: `Post has been added`,
            status: "success",
            isClosable: true,
          })
        })
      } catch (err) {
        console.log(err);
        toast({
          title: 'ERROR',
          status: "error",
          isClosable: true,
        })
      }
    }
  })

  // ----- cancel transaction
  const UploadPayment = async () => {
    let msg = ""
    let cancelDes = ''
    try {
      const formData = new FormData();
      const { noInvoice } = router.query
      formData.append("image", selectedFile)

      let res = await axiosInstance.post("/transaction/api/v1/payment/" + noInvoicePayment, formData)
      msg = res.data.message;
      console.log(res.data.message);

      dispatch({
        type: "FETCH_RENDER",
        payload: { value: !autoRender.value }
      })
      // toast({
      //   title: 'berhasil upload bukti transfer',
      //   status: "success",
      //   isClosable: true,
      // });
      if (msg != "File image tidak boleh lebih dari 1MB")
        toast({
          title: 'berhasil upload bukti transfer',
          status: "success",
          isClosable: true,
        });
      else {
        toast({
          title: msg,
          status: "error",
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0])
    const uploaded = event.target.files[0];
    setImageShow(URL.createObjectURL(uploaded))
    // console.log(event.target.files[0]);
  }

  return (
    <>

      <Box display='flex' flexWrap='wrap' justifyContent='space-evenly'>
        {/* <UploadButton uploader={uploader}
              options={{ multi: true }}
              onComplete={files => console.log(files)}>
              {({ onClick }) =>
                <button onClick={onClick}>
                  Upload a file...
                </button>
              }
            </UploadButton> */}
        <Box minW='400px' minH='300px' >
          <FormControl>
            <Box>
              <Box w='400px' h='300px' rounded='lg' >
                {!imageShow ?
                  <>
                    <Text position='relative' w='200px' fontWeight='bold' top='3' left='120' color='#2B478B' onClick={() => inputFileRef.current.click()} _hover={{ cursor: 'pointer' }}  >
                      Upload Bukti Bayar
                    </Text>
                    <Image src='/payment.png' objectFit='contain' w='400px' h='300px' onClick={() => inputFileRef.current.click()} _hover={{ cursor: 'pointer' }} />
                  </>
                  : <Image src={imageShow} objectFit='contain' w='400px' h='300px' rounded='lg' />}
              </Box>
              <Input type='file' onChange={handleFile} hidden
                accept={"image/png, image/jpg, image/jpeg"} ref={inputFileRef} />
              {/* <Button background='#72FFFF' mt='5px' size='sm' onClick={() => inputFileRef.current.click()} >Upload Image</Button> */}
              <Button position='relative' size='sm' bottom='301' ml='5px' bg='white' variant='ghost' left='343'
                onClick={() => {
                  setImageShow(null)
                  setSelectedFile(null)
                }}>
                <Icon boxSize='7' as={IoClose} />
              </Button>
            </Box>
          </FormControl>
        </Box>

        <Box>
          <Box justifyContent='flex-end'>
            <Button colorScheme='twitter' disabled={imageShow == null ? true : false} onClick=
              {() => {
                async function submit() {
                  UploadPayment();
                  onClose();
                }
                submit()
              }}>
              Upload
            </Button>
          </Box>
        </Box>
      </Box>

    </>
  )
}