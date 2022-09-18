import {
  Button, ModalBody, ModalHeader, Text,
  ModalContent, ModalCloseButton, FormControl,
  FormLabel, Input, Box, Textarea, useToast, Image
} from '@chakra-ui/react'
import { useFormik } from "formik";
import { useState, useRef, useEffect } from 'react';
import { axiosInstance } from '../../lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import qs from 'qs'
// import { Uploader } from "uploader";
// import { UploadButton } from "react-uploader";
import uploadLoading from '../../assets/img/Frame1.png'
import NextImage from 'next/image'


export default function AddRecipe(props) {
  const { onClose } = props
  const userSelector = useSelector((state) => state.auth)
  const autoRender = useSelector((state) => state.automateRendering)
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const inputFileRef = useRef(null)
  const target = useRef(null)
  const router = useRouter();
  const toast = useToast()
  const [imageShow, setImageShow] = useState(null)

  // const uploader = new Uploader({
  //   // Get production API keys from Upload.io
  //   apiKey: "free"
  // });

  const formik = useFormik({
    initialValues: {
      note: "",
    },
    onSubmit: async () => {
      const formData = new FormData();
      const { note } = formik.values

      try {
        // ---------- form data for add to Post table ---------- //
        formData.append("note", caption)
        formData.append("user_id", userSelector.id)
        formData.append("image", selectedFile)

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


  const handleFile = (event) => {
    setSelectedFile(event.target.files[0])
    const uploaded = event.target.files[0];
    setImageShow(URL.createObjectURL(uploaded))
    // console.log(event.target.files[0]);
  }

  return (
    <>
      <Box>
        <FormControl>
          <FormLabel>Catatan</FormLabel>
          <Textarea placeholder='Tulis Catatan jika tidak ada ketik tidak ada . . .' maxLength='500'
            onChange={(e) => {
              formik.setFieldValue("note", e.target.value)
            }} />
        </FormControl>
      </Box>

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
                {imageShow !==
                  <NextImage src={uploadLoading} rounded='lg' />
                  && <Image src={imageShow} objectFit='cover' w='400px' h='300px' rounded='lg' />}
              </Box>
              <Input type='file' onChange={handleFile} hidden
                accept={"image/png, image/jpg, image/jpeg"} ref={inputFileRef} />
              <Button background='#72FFFF' mt='5px' size='sm' onClick={() => inputFileRef.current.click()} >Upload Image</Button>
              <Button size='sm' mt='5px' ml='5px' background='#FFB4B4' onClick={() => {
                setImageShow(null)
                setSelectedFile(null)
              }}>Cancel</Button>
            </Box>
          </FormControl>
        </Box>

        <Box mt='10px'>
          <Box mt={'17px'} justifyContent='flex-end'>
            <Button mr={3} colorScheme='twitter' disabled={imageShow == null ? true : false} onClick=
              {() => {
                async function submit() {
                  await formik.handleSubmit();
                  onClose();
                }
                submit()
              }}>
              Kirim Resep
            </Button>
          </Box>
        </Box>
      </Box>

    </>
  )
}