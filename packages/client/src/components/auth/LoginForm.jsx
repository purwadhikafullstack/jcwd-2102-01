import {
  Box, Stack, Heading, FormControl, Input, InputGroup, Icon, FormLabel,
  FormHelperText, Button, Text, InputRightElement, useToast
} from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import LinkNext from 'next/link';
import logo from '../../assets/img/healthymedLogo.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import qs from "qs";
import { axiosInstance } from '../../lib/api';
import auth_types from '../../redux/reducers/auth/type';
import jsCookie from "js-cookie";
import ForgotPass from '../../components/auth/ForgotPass'

export default function LoginForm() {
  const [passwordView, setPasswordView] = useState(false);
  const router = useRouter();
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      emailusername: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      emailusername: Yup.string().required("Username or Email is required"),
      password: Yup.string().required("Password is required"),
      // min(8, 'Password should be of minimum 8 characters length'),
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { emailusername, password } = formik.values
      try {
        let body = {
          username: emailusername,
          email: emailusername,
          password: password,
        };
        const res = await axiosInstance.post("/user/login", qs.stringify(body));

        const userData = res.data.result.user;
        const token = res.data.result.token;

        if (!userData) {
          throw new Error("User not found");
        }
        // const userData = user;
        // const stringifiedUserData = JSON.stringify(userData.email);

        console.log(userData);
        // jsCookie.set("user_data", stringifiedUserData);
        // jsCookie.set("auto_render", rendering)

        jsCookie.set("auth_token", token);
        dispatch({
          type: auth_types.AUTH_LOGIN,
          payload: userData,
        });
        toast({
          title: "Success Login",
          status: "success",
          isClosable: true,
        })

        // setSubmitting(false);
      } catch (err) {
        console.log(err);
        toast({
          title: "Username, Email or Password wrong",
          status: "error",
          isClosable: true,
        })
      }
      formik.setSubmitting(false);
    },
  });

  return (
    <>
      <Box display='flex' borderRadius='15px' boxShadow='md' bg='#ffffff' borderWidth='1px' height='530px'>
        {/* -------------------- left cover image -------------------- */}
        <Box flexWrap='wrap' className='image-auth'
          backgroundImage="url(/Frame1.png)"
          backgroundPosition="center"
          backgroundSize='cover'
          backgroundRepeat="no-repeat"
          width='600px' height='full' borderLeftRadius='15px'>
          {/* <Image src={loginimg} alt={'Story'} height={'550px'} width={'500px'} objectFit='cover' style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px', overflow: 'hidden' }} /> */}
        </Box>

        {/* -------------------- Form Login -------------------- */}
        <Box flexWrap='wrap' width='350px' pt='20px' borderRightRadius='15px' >
          {/* ---------- Logo Healthymed ---------- */}
          <Box align={"center"} mb={'10px'} mt='5px' marginBottom='10px'>
            <Heading fontSize={"3xl"} color={'#4A5568'}>
              <Image src={logo} width='260px' height='60px' />
            </Heading>
          </Box>

          {/* ---------- Head Sign In Tittle ---------- */}
          <Stack display='flex' align={"center"} m={'10px'} mb='20px'>
            <Heading fontSize={"3xl"} color={'#4A5568'}>Sign In</Heading>
          </Stack>

          <Stack align={"center"}>
            <Box m={'10px'} width={'250px'}>
              {/* ---------- Username or Email Input ---------- */}
              <FormControl id="emailusername" isInvalid={formik.errors.emailusername}>
                <Input required className="inputText" type="text"
                  maxLength={'40'} onChange={(event) => formik.setFieldValue("emailusername", event.target.value)} />
                <FormLabel className="labelText">&nbsp; Username / Email  &nbsp;</FormLabel>
                <FormHelperText color='red'>{formik.errors.emailusername}</FormHelperText>
              </FormControl>

              {/* ---------- Password Input ---------- */}
              <FormControl id="password" marginTop={'30px'} mb={'3px'} isInvalid={formik.errors.password}>
                <InputGroup >
                  <Input required className="inputText" maxLength={'30'}
                    type={passwordView ? "text" : "password"}
                    onChange={(event) =>
                      formik.setFieldValue("password", event.target.value)} />
                  <FormLabel className="labelText">&nbsp; Kata Sandi &nbsp;</FormLabel>
                  <InputRightElement>
                    <Icon
                      fontSize="xl"
                      onClick={() => setPasswordView(!passwordView)}
                      as={passwordView ? IoMdEye : IoMdEyeOff}
                      sx={{ _hover: { cursor: "pointer" } }}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color='red'>{formik.errors.password}</FormHelperText>
              </FormControl>
              <ForgotPass />
            </Box>
            <Box align={"center"}>
              <Button w={'250px'} mb='10px' colorScheme='twitter' onClick={formik.handleSubmit} disabled={formik.values.emailusername.length > 3 && formik.values.password.length > 3 ? false : true} >Masuk</Button>
            </Box>
          </Stack>

          {/* ---------- Garis Pembatas ---------- */}
          <div className="divine">
            <div></div>
            <div>Atau masuk dengan</div>
            <div></div>
          </div>

          <Box align={"center"}>
            <Button w={'250px'} mb='10px' mt='10px' colorScheme='blue' variant='outline'>
              <Icon boxSize='5' as={FcGoogle} mr='10px' /> Masuk dengan google</Button>
          </Box>

          <Box display='flex' justifyContent='center' mt='5px'>
            <Box width={'250px'} display='flex'>
              <Text mb='20px'>Belum punya akun?&nbsp;</Text>
              {/* <Link href='./register' color={'blue.400'} style={{ textDecoration: 'none' }} fontWeight='semibold'>Daftar</Link> */}
              <LinkNext href='/register' >
                <Text color={'blue.400'} style={{ textDecoration: 'none' }} _hover={{ cursor: 'pointer' }} fontWeight='semibold'>Daftar</Text>
              </LinkNext>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}