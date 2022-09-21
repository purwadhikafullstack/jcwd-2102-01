import {
  Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
  MenuDivider, Text, Icon, useDisclosure, Link, Modal, Button,
} from '@chakra-ui/react';
import NavBar from "../../components/navbar/NavBar"
import NavBarSignIn from "../../components/navbar/NavBarSignIn"
import Footer from "../../components/footer/Footer"
import ProductDetailsComp from '../../components/productdetails/ProductDetails';
import { axiosInstance } from "../../lib/api"
import Metatag from '../../components/metatag/Metatag';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";

export default function productdetails() {
  const userSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const url = "http://localhost:3000" + router.pathname;
  const dispatch = useDispatch()
  const [category, setCategory] = useState([])
  const [product, setProduct] = useState([])

  // ---------- Fetching Product ---------- //
  async function fetchProduct() {
    try {
      const { kodeproduct } = router.query
      // axiosInstance.get(`/comment/post/${id}?page=${startComment}&limit=${5}`)
      axiosInstance.get(`/products/productDetail/${kodeproduct}`)
        .then((res) => {
          setProduct(res.data.result)
          // const temp = res.data.result
          // console.log(temp)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderProduct = () => {
    return product.map((val, index) => {
      return (
        <ProductDetailsComp key={index}
          productId={val.id}
          productCode={val.product_code}
          productName={val.product_name}
          isiPerkemasan={val.isi_perkemasan}
          isDeleted={val.is_deleted}
          // productCategory={ }
          productImage={val.Product_images[0]?.image_url}
          stock={val.Product_stocks[0]?.stock}
          unit={val.Product_stocks[0]?.Unit?.unit_name}
          firstPrice={val.Product_stocks[0]?.first_price}
          sellingPrice={val.Product_stocks[0]?.selling_price}
          converted={val.Product_stocks[0]?.converted}
          berat={val.Product_description?.weight}
          kegunaan={val.Product_description?.kegunaan}
          komposisi={val.Product_description?.komposisi}
          kemasan={val.Product_description?.kemasan}
          golongan={val.Product_description?.golongan}
          caraSimpan={val.Product_description?.cara_simpan}
          nie={val.Product_description?.nomor_ijin_edar}
          caraPakai={val.Product_description?.cara_pakai}
          peringatan={val.Product_description?.peringatan}
        />
      )
    })
  }

  useEffect(() => {
    fetchProduct()
  }, [router.isReady]);

  return (
    <>
      <Metatag title={"Product Detail"} description={"Product Detail"}
        url={url} type="website">
        {userSelector.id ? <NavBarSignIn /> : <NavBar />}
        <Flex flexWrap={'wrap'} p='10px' minH={'80vh'} py='20px' mb='10px' justifyContent='space-evenly' bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
          {renderProduct()}
        </Flex>
        <Footer />
      </Metatag>
    </>)
}