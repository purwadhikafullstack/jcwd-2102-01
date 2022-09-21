import {
 Button, ModalBody, ModalHeader,
 ModalContent, ModalCloseButton, ModalOverlay, FormControl,
 FormLabel, Input, Box, useToast, Image
} from '@chakra-ui/react'
import { useFormik } from "formik";
import { useState, useRef } from 'react';
import { axiosInstance } from '../../../lib/api';
import { useDispatch, useSelector } from 'react-redux'

export default function ModalProfPicture(props) {
 const { onClose } = props
 const dispatch = useDispatch()
 const autoRender = useSelector((state) => state.automateRendering)
 const [selectedFile, setSelectedFile] = useState(null);
 const [imageShow, setImageShow] = useState(null)
 const userSelector = useSelector((state) => (state.auth))

 const toast = useToast();

 const inputFileRef = useRef(null);

 const handleFile = (event) => {
  setSelectedFile(event.target.files[0]);
  const uploaded = event.target.files[0];
  setImageShow(URL.createObjectURL(uploaded))
 };

 const formik = useFormik({
  initialValues: {
  },
  onSubmit: async () => {
   const formData = new FormData();
   formData.append("image", selectedFile);

   let msg = ""
   try {
    let res = await axiosInstance.patch("/user/uploadProfile/" + userSelector.id, formData)

    // then((res) => {
    msg = res.data.message;
    // console.log(res.data.message);

    dispatch({
     type: "FETCH_RENDER",
     payload: { value: !autoRender.value }
    })
    if (msg != "File image tidak boleh lebih dari 1MB")
     toast({
      title: msg,
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
    // })
   } catch (err) {
    console.log(err);
    // alert(msg)

   }
  }
 })

 return (
  <>
   <ModalContent>
    <ModalHeader>Tambah / ganti foto profil</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6} align='center'>
     <Box minW='400px' minH='300px' justifyContent='center'>
      <FormControl >
       {!imageShow ?
        < Image src='/iconcp.jpg' objectFit='contain' rounded='full' w='300px' h='300px' />
        : <Image src={imageShow} objectFit='cover' w='300px' h='300px' rounded='full' />}
       <Input type='file' onChange={handleFile} hidden
        accept={"image/png, image/jpg, image/jpeg, image/gif"} ref={inputFileRef} />
       <Button background='#72FFFF' mt='5px' size='sm' onClick={() => inputFileRef.current.click()} >Upload Image</Button>
       <Button size='sm' mt='5px' ml='5px' background='#FFB4B4' onClick={() => setImageShow(null)}>Cancel</Button>
      </FormControl>
      <FormControl align={"right"}>
       <Button colorScheme={"green"} disabled={imageShow == null ? true : false} onClick=
        {() => {
         async function submit() {
          await formik.handleSubmit();
          onClose();
         }
         submit()
        }}>
        Submit
       </Button>
      </FormControl>
     </Box>
    </ModalBody>
   </ModalContent>
  </>
 )
}