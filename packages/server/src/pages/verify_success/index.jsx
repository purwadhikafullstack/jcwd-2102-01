import { Flex, Box, Button, Icon, Container, Text, FormControl, Input } from '@chakra-ui/react'
import { AiFillBell, AiOutlineBell, AiOutlineHome, AiFillHome } from "react-icons/ai";
import Image from 'next/image'
import verified from '../../assets/imgs/verifieduser.gif'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { userVerified } from '../../redux/action/userVerified';

export default function verify_success() {
 const dispatch = useDispatch();
 const userSelector = useSelector((state) => state.auth);
 const router = useRouter();
 const formik = useFormik({
  initialValues: {
   verified_status: 1,
   id: userSelector.id,
  },
  onSubmit: (values) => {
   dispatch(userVerified(values, formik.setSubmitting))
  }
 })

 useEffect(() => {
  if (userSelector.verified_status == 1) {
   router.push("/home");
  }
 }, [userSelector.verified_status]);

 return (
  <Flex flexWrap={'wrap'} minH={'80vh'} minW='480px' justifyContent={'center'} padding={'30px'} bg='white'>
   <Container align='center'>
    <Text fontSize='3xl'>Your Account has been verified!</Text>
    <Box boxSize='md'>
     <Image src={verified} />
    </Box>
    <FormControl id="id">
     <Input hidden
      value={userSelector.id}
      type="text"
      onChange={(event) =>
       formik.setFieldValue("id", event.target.value)
      }
     />
    </FormControl>
    <FormControl id="verified_status">
     <Input
      value={1}
      hidden
      type="number"
      onChange={(event) =>
       formik.setFieldValue("verified_status", event.target.value)
      }
     />
    </FormControl>
    <Box>
     <Button colorScheme='green' onClick={formik.handleSubmit} > <Icon boxSize='6' as={AiOutlineHome} mr='5px' /> Back To Home</Button>
    </Box>

   </Container>
  </Flex>
 )
}