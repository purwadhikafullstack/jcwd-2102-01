import {
  Box, Flex, Avatar, HStack, Button, Menu, MenuButton, AlertIcon, Alert, Image,
  MenuDivider, Text, Icon, useDisclosure, Link, Modal, ModalOverlay, useMediaQuery
} from '@chakra-ui/react';
import NextLink from 'next/link'
import banner from '../../assets/img/bg.png'
import NextImage from 'next/image';
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { axiosInstance } from '../../lib/api';
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HomeCategory() {
  const [category, setCategory] = useState([])
  const router = useRouter();
  const [filterLaptop] = useMediaQuery('(min-width: 1120px)')
  const [filterTab] = useMediaQuery('(min-width: 768px)')
  const [filterMobile] = useMediaQuery('(min-width: 600px)')
  const [filterMobile2] = useMediaQuery('(min-width: 360px)')

  // --------------- Fetching Category --------------- //
  async function fetchCategory() {
    try {
      axiosInstance.get(`/category`)
        .then((res) => {
          setCategory(res.data.result)
          console.log(res.data.result)
        })
    } catch (err) {
      console.log(err)
    }
  };

  // const renderCategoryWeb = () => {
  //  return category?.map((val, index) => {
  //   return (
  //    <>
  //     <Link href={`/productlist?category1=` + val.category} style={{ textDecoration: "none" }}>
  //      <Box key={index} borderRadius='16px' w='130px' h='110px' bg='white'
  //       borderWidth='1px' boxShadow='sm' align='center' py='5px' _hover={{ boxShadow: 'lg' }}>
  //       <Box>
  //        <Image objectFit='contain' src={`http://${val.image_url}`} width='60px' height='60px' />
  //       </Box>
  //       <Box mt='5px'>
  //        <Text fontSize='sm' fontWeight='semibold'>
  //         {val.category}
  //        </Text>
  //       </Box>
  //      </Box>
  //     </Link>
  //    </>
  //   )
  //  })
  // }

  const renderCategoryWeb = () => {
    return category?.map((val, index) => {
      return (
        <>
          <SwiperSlide>
            <Link href={`/productlist?category1=` + val.category} style={{ textDecoration: "none" }}>
              <Box key={index} borderRadius='16px' w='130px' h='110px' bg='white'
                borderWidth='1px' boxShadow='sm' align='center' py='5px' _hover={{ boxShadow: 'lg' }}>
                <Box width='60px' height='60px'>
                  <Image objectFit='contain' src={`http://${val.image_url}`} width='60px' height='60px' />
                </Box>
                <Box mt='5px'>
                  <Text fontSize='sm' fontWeight='semibold'>
                    {val.category}
                  </Text>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        </>
      )
    })
  }

  useEffect(() => {
    fetchCategory()
  }, [router.isReady]);
  return (
    <Box m='30px' mb='15px' h='160px' maxW='1090px' w={filterTab ? "1090px" : filterMobile ? '768px' : filterMobile ? '600px' : '350px'}  >
      <Box display='flex' justifyContent='space-between' mb='10px'>
        <Text fontWeight='bold' fontSize='lg'>Kategori</Text>
        <NextLink href='/productlist'>
          <Text fontWeight='bold' color='#009B90' fontSize='sm' _hover={{ cursor: "pointer", color: '#224B0C' }}>Lihat semua</Text>
        </NextLink>
      </Box>
      {/* <Box display='flex' justifyContent='space-between' overflow='scroll' >
    {renderCategoryWeb()}
   </Box> */}

      <Swiper
        slidesPerView={filterTab ? 7 : filterMobile ? 4 : filterMobile ? 2 : 2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {renderCategoryWeb()}
      </Swiper>
    </Box >
  )
}