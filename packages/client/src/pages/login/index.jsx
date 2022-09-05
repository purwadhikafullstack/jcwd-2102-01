import { Flex, Spinner } from '@chakra-ui/react';
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer';
import LoginForm from '../../components/auth/LoginForm';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Metatag from '../../components/metatag/Metatag';

export default function LoginPage() {
  const userSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const url = "http://localhost:3000" + router.pathname;

  useEffect(() => {
    if (userSelector?.id) {
      // setIsLoading(true);
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [userSelector?.id]);

  return (
    <Metatag title={"Login Healthymed"} description={"Healthymed Login Page"}
      url={url} type="website">
      {isLoading ?
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          <Spinner thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl' /> &nbsp; loading...
        </Flex>
        :
        <>
          <NavBar />
          <Flex flexWrap={'wrap'} minH={'80vh'} justifyContent={'center'} padding={'30px'} bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
            <LoginForm />
          </Flex>
          <Footer />
        </>
      }
    </Metatag>
  )
}