import { Flex } from '@chakra-ui/react';
import Footer from '../../components/footer/Footer';
import NavBar from "../../components/navbar/NavBar"
import NavBarSignIn from "../../components/navbar/NavBarSignIn"
import ProductListing from '../../components/productlisting/ProductListing';
import Metatag from '../../components/metatag/Metatag';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";

export default function ProductList() {
 const userSelector = useSelector((state) => state.auth);
 const router = useRouter();
 const url = "http://localhost:3000" + router.pathname;

 return (
  <Metatag title={"Daftar Produk Healthymed"} description={"Daftar Produk Healthymed"}
   url={url} type="website">
   {userSelector.id ? <NavBarSignIn /> : <NavBar />}
   <Flex flexWrap={'wrap'} minH={'80vh'} justifyContent={'center'} py='20px' bgGradient='linear(to-t, #ffffff 50%, #ddf1f9 )' >
    <ProductListing />
   </Flex >
   <Footer />
  </Metatag>
 )
}