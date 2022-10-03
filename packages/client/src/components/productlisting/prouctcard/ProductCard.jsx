import { Box, Button, Icon, Text, useToast, Image } from '@chakra-ui/react';
import { IoCartOutline } from "react-icons/io5";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import NextLink from 'next/link';
import { axiosInstance } from '../../../lib/api';
import qs from 'qs';

export default function ProductCard(props) {
  const { productId, productCode, productName, isiPerkemasan, isDeleted, productCategory, productImage, stock, firstPrice, sellingPrice, converted, unit, idUnit } = props
  const percentage = parseInt((firstPrice - sellingPrice) / firstPrice * 100);
  const userSelector = useSelector((state) => state.auth)
  const autoRender = useSelector((state) => state.automateRendering)
  const toast = useToast();
  const dispatch = useDispatch()

  // ---------- Add to cart ---------- //
  async function addToCart() {
    let res
    let msg = ''
    try {
      let body = {
        buy_quantity: parseInt(1),
        price: parseFloat(sellingPrice),
        total_price: parseFloat(sellingPrice),
        id_unit: idUnit,
        id_user: userSelector.id,
        id_product: productId
      }
      let res = await axiosInstance.post(`/transaction/api/v1/Cart/${userSelector.id}`, qs.stringify(body))
      msg = res.data.message;
      console.log(res.data.message);
      // console.log(res)

      dispatch({
        type: "FETCH_RENDER",
        payload: { value: !autoRender.value }
      })

      if (msg == "Error: Maaf data keranjang anda melebihi produk stok" || msg == "Maaf produk stok tidak mencukupi") {
        toast({
          title: `Quantity beli Produk ${productName} di keranjang anda sudah melebihi stok / stok tiak mencukupi`,
          status: "error",
          isClosable: true,
        })
      } else {
        toast({
          title: `Berhasil Menambah 1 ${unit} Produk ${productName} ke keranjang`,
          status: "success",
          isClosable: true,
        })
      }

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <Box w='180px' h='293px' borderWidth='1px' m='10px' _hover={{ boxShadow: 'xl' }} boxShadow='base' borderRadius='13px' bg='white'>
        <Box h='155px' w='full' _hover={{ cursor: "pointer" }} borderTopRadius='13px' overflow='hidden'>
          <NextLink href={`/productdetails/${productId}`} as={`/productdetails/${productCode}`}>
            <Image objectFit='cover' src={`http://${productImage}`} width='180px' height='155px' />
          </NextLink>
        </Box>

        <Box px='10px' h='90px'>
          <Box h='50px'>
            <NextLink href={`/productdetails/${productId}`} as={`/productdetails/${productCode}`}>
              <Text _hover={{ cursor: 'pointer', color: '#009B90' }} fontWeight='bold' color='#213360'>
                {productName.substring(0, 32)}{productName.length >= 32 ? '...' : null}
              </Text>
            </NextLink>
          </Box>
          <Box display='flex' fontSize='xs'>
            {!firstPrice ? <></> :
              <>
                <Text fontWeight='bold' color='#213360' textColor='#FF6B6B' mr='5px'> {percentage.toLocaleString()}% </Text>
                <Text fontWeight='semibold' color='#737A8D' as='s'>Rp {firstPrice?.toLocaleString()}</Text>
              </>
            }
          </Box>
          <Text fontWeight='semibold' color='#213360' fontSize='sm' fontFamily='sans-serif'>Rp {sellingPrice?.toLocaleString()} / {unit}</Text>
        </Box>

        <Box pb='12px' px='10px' h='40px'>
          <Button w='full' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px' size='sm' my='5px'
            _hover={{ bg: '#009B90', color: 'white' }} disabled={userSelector.id ? false : true}
            onClick={() => addToCart()}>
            <Icon boxSize='4' as={IoCartOutline} mr='5px' />
            Keranjang
          </Button>

          {/* <InputGroup size='sm'>
      <InputLeftElement bg='#009B90' borderLeftRadius='9px' color='white'>
       <Icon
        boxSize='5'
        as={HiMinusSm}
        sx={{ _hover: { cursor: "pointer" } }}
       />
      </InputLeftElement>
      <Input textAlign='center' borderRadius='9px' required bg='white'
       onChange={(event) =>
        formik.setFieldValue("password", event.target.value)} />
      <InputRightElement bg='#009B90' borderRightRadius='9px' color='white'>
       <Icon
        boxSize='5'
        as={HiPlusSm}
        sx={{ _hover: { cursor: "pointer" } }}
       />
      </InputRightElement>
     </InputGroup> */}
        </Box>
      </Box>
    </>
  )
}