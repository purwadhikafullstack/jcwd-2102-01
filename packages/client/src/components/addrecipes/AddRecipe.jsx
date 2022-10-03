import {
  Button, Text, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalContent,
  FormControl, Flex, Icon, FormLabel, Input, Box, Textarea, useToast, Image
} from '@chakra-ui/react'
import { useFormik } from "formik";
import { useState, useRef, useEffect } from 'react';
import { axiosInstance } from '../../lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5"
import ShowAddress from '../profilesetting/ShowAddress';
import ShowDefaultAddress from '../profilesetting/ShowDefAddress';

export default function AddRecipe(props) {
  const { onClose } = props
  const { isOpen: isOpenChangeAddress, onOpen: onOpenChangeAddress, onClose: onCloseChangeAddress } = useDisclosure()
  const userSelector = useSelector((state) => state.auth)
  const autoRender = useSelector((state) => state.automateRendering)
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const inputFileRef = useRef(null)
  const target = useRef(null)
  const router = useRouter();
  const toast = useToast()
  const [addressFetch, setAddressFetch] = useState([])
  const [addressFetchById, setAddressFetchById] = useState([])
  const [imageShow, setImageShow] = useState(null)

  // ---------- Fetching Address by User ---------- //
  async function fetchAddress() {
    try {
      axiosInstance.get(`address/user/` + userSelector.id)
        .then((res) => {
          setAddressFetch(res.data.result)
          const temp = res.data.result
          // console.log(temp)
          // console.log('address length' + temp.length)
        })
    } catch (err) {
      console.log(err)
    }
  };
  const renderAddress = () => {
    return addressFetch.map((val, index) => {
      return (
        <ShowAddress key={index}
          idalamat={val.id}
          namaPenerima={val.receiver_name}
          phonePenerima={val.receiver_phone}
          alamat={val.address}
          provinsi={val.province}
          provinsiId={val.province_id}
          city={val.city_name}
          city_id={val.city_id}
          kecamatan={val.districts}
          postalCode={val.postal_code}
          defaultAddress={val.User?.default_address}
        />
      )
    })
  }

  // ---------- Fetching Address by id Address ---------- //
  async function fetchAddressbyId() {
    try {
      axiosInstance.get(`address/addressid/` + userSelector.default_address)
        .then((res) => {
          setAddressFetchById(res.data.result)
          const temp = res.data.result
          // console.log(res.data.result[0].city_id)
          // console.log(getCityId)
          // console.log('address length' + temp.length)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderAddressById = () => {
    return addressFetchById.map((val, index) => {
      return (
        <ShowDefaultAddress key={index}
          idalamat={val.id}
          namaPenerima={val.receiver_name}
          phonePenerima={val.receiver_phone}
          alamat={val.address}
          provinsi={val.province}
          provinsiId={val.province_id}
          city={val.city_name}
          city_id={val.city_id}
          kecamatan={val.districts}
          postalCode={val.postal_code}
          defaultAddress={val.User?.default_address}
        />
      )
    })
  }

  // ---------- Tambah data ke Resep Dokter ---------- //
  const formik = useFormik({
    initialValues: {
      note: "",
    },
    onSubmit: async () => {
      const formData = new FormData();
      const { note } = formik.values
      let msg = ""
      formData.append("note", note)
      formData.append("id_user", userSelector.id)
      formData.append("id_address", userSelector.default_address)
      formData.append("image", selectedFile)
      try {

        let res = await axiosInstance.post("/transaction/api/v1/recipes/" + userSelector.id, formData)
        dispatch({
          type: "FETCH_RENDER",
          payload: { value: !autoRender.value }
        })

        msg = res.data.message;
        console.log(msg);
        if (msg != "File image tidak boleh lebih dari 1MB")
          toast({
            title: `Berhasil upload resep dokter`,
            status: "success",
            isClosable: true,
          });
        else {
          toast({
            title: "File image tidak boleh lebih dari 1MB",
            status: "error",
            isClosable: true,
          });
        }
      } catch (err) {
        console.log(err);
        toast({
          title: 'File image tidak boleh lebih dari 1MB',
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

  useEffect(() => {
    fetchAddressbyId()
    fetchAddress()
  }, [router.isReady]);

  useEffect(() => {
    fetchAddressbyId()
    fetchAddress()
  }, [userSelector.default_address]);

  return (
    <>
      <Box>
        <Flex mb='10px'>
          <Text fontWeight='semibold'>Alamat Penerima</Text>
          <Button colorScheme='twitter' size='xs' ml='5px' onClick={onOpenChangeAddress}>Ganti</Button>
          <Modal isOpen={isOpenChangeAddress} onClose={onCloseChangeAddress} size='md'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Ganti alamat pengiriman</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {renderAddress()}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>

        {renderAddressById()}
        <FormControl>
          <FormLabel my='10px'>Catatan</FormLabel>
          <Textarea mb='20px' placeholder='Tulis Catatan jika tidak ada ketik tidak ada . . .' maxLength='500'
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
                {!imageShow ?
                  <>
                    <Text position='relative' w='200px' fontWeight='bold' top='90' left='120' color='#2B478B' onClick={() => inputFileRef.current.click()} _hover={{ cursor: 'pointer' }}  >
                      Upload Resep Dokter
                    </Text>
                    <Image src='/recipe2.png' objectFit='contain' w='400px' h='300px' onClick={() => inputFileRef.current.click()} _hover={{ cursor: 'pointer' }} />
                  </>
                  : <Image src={imageShow} objectFit='contain' w='400px' h='300px' rounded='lg' />}
              </Box>
              <Input type='file' onChange={handleFile} hidden
                accept={"image/png, image/jpg, image/jpeg"} ref={inputFileRef} />
              {/* <Button background='#72FFFF' mt='5px' size='sm' onClick={() => inputFileRef.current.click()} >Upload Image</Button> */}
              <Button position='relative' size='sm' bottom='301' ml='5px' bg='white' variant='ghost' left='343'// left='227'
                onClick={() => {
                  setImageShow(null)
                  setSelectedFile(null)
                }}>
                <Icon boxSize='7' as={IoClose} />
              </Button>
            </Box>
          </FormControl>
        </Box>

        <Box mt='10px'>
          <Box justifyContent='flex-end'>
            <Button position='relative' bottom='5' colorScheme='twitter'
              disabled={imageShow != null && formik.values.note.length > 5 && userSelector.default_address != false ? false : true} onClick=
              {() => {
                async function submit() {
                  formik.handleSubmit();
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