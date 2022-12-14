import { Flex, Spinner, Button, Text, Link, Icon, Box, Center } from '@chakra-ui/react'
import { axiosInstance } from "../../lib/api"
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import Image from 'next/image'
// import invalidToken from '../../assets/imgs/invalid.gif'
import ResetPassForm from '../../components/resetpassword/ResetPassForm';
import NavBar from '../../components/navbar/NavBar'
import Metatag from '../../components/metatag/Metatag';
// import { axiosInstance } from '../../lib/api';

export default function ChangePass() {
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  const { restoken } = router.query
  const url = "http://localhost:3000";

  useEffect(() => {
    async function checkToken() {
      // console.log(restoken);
      const res = await axiosInstance.post("/user/resetPass/" + restoken)
      console.log(res);
      if (res.data) {
        const success = res.data.success
        console.log(success)
        setVerified(success)
      }
    }
    checkToken()
  }, [router.isReady])


  return (
    <>
      <Metatag title={"Reset Password"} description={"Reset password form"}
        url={url} type="website">
        <Flex minH={'80vh'} justifyContent='center'
          backgroundPosition="center"
          backgroundSize='cover'
          backgroundRepeat="no-repeat"
          backgroundImage="url(/bg.jpg)"
          h='100vh'>
          {router.isReady ?
            <>
              {verified ? <ResetPassForm /> :
                <Box align="center">
                  {/* <Image src={invalidToken} width='460px' height='460px' /> */}
                  <Text fontSize='5xl'>Invalid Token</Text>
                  <Link href='/home' style={{ textDecoration: "none" }}>
                    <Button colorScheme='green' href='/home'> <Icon boxSize='6' as={AiOutlineHome} mr='5px' />
                      <Text >Back To Home</Text> </Button>
                  </Link>
                </Box>
              }
            </>
            :
            <>
              < Spinner thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl' /> &nbsp; loading...
            </>
          }
        </Flex>
      </Metatag>
    </>
  )
}