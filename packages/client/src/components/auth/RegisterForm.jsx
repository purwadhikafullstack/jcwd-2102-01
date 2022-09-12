import {
  Box, Flex, Stack, Heading, FormControl, Input, InputGroup, InputRightAddon, Icon, FormLabel, FormHelperText, Avatar, HStack, Button, Menu, MenuButton, MenuList, MenuItem,
  MenuDivider, Text, useDisclosure, Link, Modal, ModalOverlay, Divider, InputRightElement, Progress
} from '@chakra-ui/react';
import NavBar from '../../components/navbar/NavBar'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Image from 'next/image';
import LinkNext from 'next/link';
import logo from '../../assets/img/healthymedLogo.png'
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import ForgotPass from '../../components/auth/ForgotPass'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { axiosInstance } from '../../lib/api';
import { useToast } from '@chakra-ui/react';

export default function RegisterForm() {
  const [passwordView, setPasswordView] = useState(false);
  const [passwordViewRep, setPasswordViewRep] = useState(false);
  const userSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      first_name: "",
      password: "",
      repassword: "",
      phone_no: "",
      roles: "User",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        // .matches(/@/, "Please inclue an '@' in the email address")
        .email('Format harus email'),
      // .matches(/.com/, "Please include an '.com' in the email address"),
      username: Yup.string().required("Username is required"),
      first_name: Yup.string()
        .required("Nama wajib diisi")
        .min(3, 'Nama anda terlalu pendek!')
        .matches(/^[aA-zZ\s]+$/, "hanya boleh diisi huruf").trim(),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password should be of minimum 8 characters length")
        .matches(/\w*[a-z]\w*/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character") // lower
        .matches(/\w*[A-Z]\w*/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character") // upper
        .matches(/\d/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character") //must have number
        .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"), //special char
      repassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
      phone_no: Yup.number()
        .required("Phone number is required")
        .min(7, "Phone number should be of minimum 7 character length")
    }),
    validateOnChange: false,
    // ------------------------------- code setelah register tidak login
    onSubmit: async () => {
      const formData = new FormData();
      const { email, username, first_name, password, phone_no, roles } = formik.values;
      formData.append("email", email);
      formData.append("username", username);
      formData.append("first_name", first_name);
      formData.append("password", password);
      formData.append("phone_no", phone_no);
      formData.append("roles", roles);

      try {
        await axiosInstance.post("/user", formik.values).then(() => {
          toast({
            title: "Register Success check your email",
            status: "success",
            isClosable: true,
          });
        });
      } catch (err) {
        console.log(err);
        toast({
          title: "Failed to Register / Email or Username has been taken",
          status: "error",
          isClosable: true,
        });
      }
    },
  },
  );
  useEffect(() => {
    if (userSelector?.id) {
      router.push("/");
    }
  }, [userSelector?.id])

  return (
    <>

      <Box display='flex' borderRadius='15px' boxShadow='md' bg='#ffffff' borderWidth='1px' >
        {/* -------------------- left cover image -------------------- */}
        <Box flexWrap='wrap' className='image-auth'
          backgroundImage="url(/Frame1.png)"
          backgroundPosition="center"
          backgroundSize='cover'
          backgroundRepeat="no-repeat"
          width='600px' height='full' borderLeftRadius='15px'>
          {/* <Image src={loginimg} alt={'Story'} height={'500px'} width={'400px'} objectFit='cover' style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px', overflow: 'hidden' }} /> */}
        </Box>

        {/* -------------------- Form Register -------------------- */}
        <Box flexWrap='wrap' width='350px' pt='15px' borderLeftRadius='15px'>
          {/* ---------- Logo Healthymed ---------- */}
          <Box align={"center"} marginBottom='5px'>
            <Heading fontSize={"3xl"} color={'#4A5568'}>
              <Image src={logo} width='260px' height='60px' />
            </Heading>
          </Box>

          {/* ---------- Head Sign In Tittle ---------- */}
          <Stack display='flex' align={"center"} mb={'5px'}>
            <Heading fontSize={"2xl"} color={'#4A5568'}>Daftar</Heading>
          </Stack>

          <Stack align={"center"}>
            <Box m={"10px 20px"} width={"250px"}>
              {/* ---------- Email Input ---------- */}
              {/* {formik.values.email} */}
              <FormControl id="email" isInvalid={formik.errors.email}>
                <Input
                  required
                  className="inputText"
                  type="text"
                  maxLength={"40"}
                  onChange={(event) =>
                    formik.setFieldValue("email", event.target.value)
                  }
                />
                <FormLabel className="labelText">&nbsp; Email &nbsp;</FormLabel>
                <FormHelperText color="red">{formik.errors.email}</FormHelperText>
              </FormControl>

              {/* ---------- Username Input ---------- */}
              {formik.values.username}
              <FormControl
                id="username"
                isInvalid={formik.errors.username}
                marginTop={"20px"}
              >
                <Input
                  required
                  className="inputText"
                  type="text"
                  maxLength={"40"}
                  onChange={(event) =>
                    formik.setFieldValue("username", event.target.value)
                  }
                />
                <FormLabel className="labelText">
                  &nbsp; Username &nbsp;
                </FormLabel>
                <FormHelperText color="red">
                  {formik.errors.username}
                </FormHelperText>
              </FormControl>

              {/* ---------- Fullname Input ----------*/}
              <FormControl
                id="first_name"
                isInvalid={formik.errors.first_name}
                marginTop={"20px"}
              >
                <Input
                  required
                  className="inputText"
                  type="text"
                  maxLength={"40"}
                  onChange={(event) =>
                    formik.setFieldValue("first_name", event.target.value)
                  }
                />
                <FormLabel className="labelText">
                  &nbsp; First name &nbsp;
                </FormLabel>
                <FormHelperText color="red">
                  {formik.errors.first_name}
                </FormHelperText>
              </FormControl>

              {/* ---------- Phone Number Input ---------- */}

              <FormControl
                id="phone_no"
                isInvalid={formik.errors.phone_no}
                marginTop={"20px"}
              >
                <Input
                  required
                  className='inputText'
                  type="text"
                  maxLength={"40"}
                  onChange={(event) =>
                    formik.setFieldValue("phone_no", event.target.value)
                  }
                />
                <FormLabel className="labelText">
                  &nbsp; Phone Number &nbsp;
                </FormLabel>
                <FormHelperText color="red">
                  {formik.errors.phone_no}
                </FormHelperText>
              </FormControl>
              <FormLabel className="labelText">
              </FormLabel>

              {/* ---------- Password Input ---------- */}
              <FormControl
                id="password"
                marginTop={"20px"}
                mb={"7px"}
                isInvalid={formik.errors.password}
              >
                <InputGroup>
                  <Input
                    required
                    className="inputText"
                    maxLength={"30"}
                    type={passwordView ? "text" : "password"}
                    onChange={(event) =>
                      formik.setFieldValue("password", event.target.value)
                    }
                  />
                  <FormLabel className="labelText">
                    &nbsp; Password &nbsp;
                  </FormLabel>
                  <InputRightElement>
                    <Icon
                      fontSize="xl"
                      onClick={() => setPasswordView(!passwordView)}
                      as={passwordView ? IoMdEye : IoMdEyeOff}
                      sx={{ _hover: { cursor: "pointer" } }}
                    />
                  </InputRightElement>
                </InputGroup>
                {formik.values.password.length > 7 &&
                  formik.values.password.match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                  ) ? (
                  <>
                    <Progress value={100} size="xs" colorScheme="green" />
                    <Text fontWeight="semibold" color="green">
                      Strong
                    </Text>
                  </>
                ) : formik.values.password.length > 5 &&
                  formik.values.password.match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/
                  ) ? (
                  <>
                    <Progress value={75} size="xs" colorScheme="yellow" />
                    <Text fontWeight="semibold" color="#dbe300">
                      Medium
                    </Text>
                  </>
                ) : formik.values.password.length > 4 &&
                  formik.values.password.match(
                    /^(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
                  ) ? (
                  <>
                    <Progress value={50} size="xs" colorScheme="red" />
                    <Text fontWeight="semibold" color="orange">
                      Weak
                    </Text>
                  </>
                ) : formik.values.password.length > 0 &&
                  formik.values.password.match(/^(?=.*[a-z])/) ? (
                  <>
                    <Progress value={25} size="xs" colorScheme="red" />
                    <Text fontWeight="semibold" color="red">
                      Very weak
                    </Text>
                  </>
                ) : (
                  <></>
                )}
                <FormHelperText color="red">
                  {formik.errors.password}
                </FormHelperText>
              </FormControl>

              {/* ---------- Sec Password Input ---------- */}
              <FormControl
                id="repassword"
                marginTop={"20px"}
                isInvalid={formik.errors.repassword}
              >
                <InputGroup>
                  <Input
                    required
                    className="inputText"
                    maxLength={"30"}
                    type={passwordViewRep ? "text" : "password"}
                    onChange={(event) =>
                      formik.setFieldValue("repassword", event.target.value)
                    }
                  />
                  <FormLabel className="labelText">
                    &nbsp; Repeat Password &nbsp;
                  </FormLabel>
                  <InputRightElement>
                    <Icon
                      fontSize="xl"
                      onClick={() => setPasswordViewRep(!passwordViewRep)}
                      as={passwordViewRep ? IoMdEye : IoMdEyeOff}
                      sx={{ _hover: { cursor: "pointer" } }}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color="red">
                  {formik.errors.repassword}
                </FormHelperText>
              </FormControl>
            </Box>

            {/* ---------- Sign Up Button ---------- */}
            <Box align={"center"}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={formik.handleSubmit}
              >
                Sign up
              </Button>
            </Box>

            <Box display='flex' width='250px' mb='20px'>
              <Text mb='15px'>Sudah Punya akun?&nbsp;</Text>
              <LinkNext href='/login' >
                <Text color={'blue.400'} style={{ textDecoration: 'none' }} _hover={{ cursor: 'pointer' }} fontWeight='semibold'>Masuk</Text>
              </LinkNext>
            </Box>
          </Stack>
        </Box>
      </Box>

    </>
  )
}