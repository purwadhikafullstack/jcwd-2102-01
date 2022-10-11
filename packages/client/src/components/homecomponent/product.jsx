import { Box, Text, useMediaQuery } from '@chakra-ui/react';
import NextLink from 'next/link'
import banner from '../../assets/img/bg.png'
import Image from 'next/image';
import ProductCard from '../productlisting/prouctcard/ProductCard';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { axiosInstance } from '../../lib/api';
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HomePrduct() {
  const [product, setProduct] = useState([])
  const [filterLaptop] = useMediaQuery('(min-width: 1120px)')
  const [filterTab] = useMediaQuery('(min-width: 768px)')
  const [filterMobile] = useMediaQuery('(min-width: 600px)')
  const [filterMobile2] = useMediaQuery('(min-width: 360px)')
  const autoRender = useSelector((state) => state.automateRendering)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  // --------------- Fetching Product --------------- //
  async function fetchProduct() {
    try {
      axiosInstance.get(`/products?limit=10&page=1`)
        .then((res) => {
          setProduct(res.data.result)
          const temp = res.data.result
          console.log(res.data.result)
        })

    } catch (err) {
      console.log(err)
    }
  };

  const renderProduct = () => {
    return product.map((val, index) => {
      return (
        <SwiperSlide key={index} >
          <ProductCard
            productId={val.id}
            productCode={val.product_code}
            productName={val.product_name}
            isiPerkemasan={val.isi_perkemasan}
            isDeleted={val.is_deleted}
            productImage={val.Product_images[0]?.image_url}
            stock={val.Product_stocks[0]?.stock}
            unit={val.Product_stocks[0]?.Unit?.unit_name}
            idUnit={val.Product_stocks[0]?.Unit?.id}
            firstPrice={val.Product_stocks[0]?.first_price}
            sellingPrice={val.Product_stocks[0]?.selling_price}
            converted={val.Product_stocks[0]?.converted}
          />
        </SwiperSlide>

      )
    })
  }
  useEffect(() => {
    fetchProduct()
    setIsLoading(false);

  }, [router.isReady]);

  useEffect(() => {
    fetchProduct()
  }, [autoRender]);
  return (
    // <Box m='15px' mb='15px' maxW='1090px'>
    <Box m='15px' mb='15px' maxW='1090px' w={filterTab ? "1090px" : filterMobile ? '768px' : filterMobile ? '600px' : '380px'} >
      <Box display='flex' justifyContent='space-between' mb='10px'>
        <Text fontWeight='bold' fontSize='lg'>Produk Populer</Text>
        <NextLink href='/productlist'>
          <Text fontWeight='bold' color='#009B90' fontSize='sm' _hover={{ cursor: "pointer", color: '#224B0C' }}>Lihat semua produk</Text>
        </NextLink>
      </Box>

      {/* <Box display='flex' justifyContent='space-between' >
    {renderProduct()}
   </Box> */}

      <Swiper
        slidesPerView={filterTab ? 5 : filterMobile ? 4 : filterMobile ? 2 : 2}
        // centeredSlides={filterMobile2 ? true : false}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {renderProduct()}
      </Swiper>

    </Box >
  )
}