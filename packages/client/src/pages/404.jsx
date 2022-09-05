import { Flex, Box, Link, Image, Button, Text, Heading, Spinner } from '@chakra-ui/react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import imagenf from '../assets/img/404.gif'
import NavBar from '../components/navbar/NavBar'
import NavBarSignIn from '../components/navbar/NavBarSignIn'
import Footer from '../components/footer/Footer'
import { useSelector } from 'react-redux';
import Metatag from '../components/metatag/Metatag'

const NotFound = () => {
 const userSelector = useSelector((state) => state.auth);
 const router = useRouter()
 const url = "http://localhost:3000" + router.pathname;

 return (
  <>
   <Metatag title={"404 Page Not Found"} description={"Page not found"}
    url={url} type="website">
    {userSelector.id ? <NavBarSignIn /> : <NavBar />}
    <Flex flexWrap={'wrap'} minH={'80vh'} justifyContent={'center'} >
     <Box display='flex' top={0} justifyContent={'center'} >
      {/* <Box position='absolute' zIndex={2} mt='30px' textAlign='center' boxShadow='md' p='6' rounded='md' bg='white' backdropContrast='30%'> */}
      <Box position='absolute' zIndex={2} mt='30px' textAlign='center' p='6' backdropContrast='30%'>
       <Heading >Sorry the page 'NOT FOUND'</Heading>
       <Text >The link you followed probably broken or the page has been removed</Text>
      </Box>
      <NextImage src={imagenf} position='absolute' />
     </Box>
    </Flex>
    <Footer />
   </Metatag>
  </>

 )

}

export default NotFound