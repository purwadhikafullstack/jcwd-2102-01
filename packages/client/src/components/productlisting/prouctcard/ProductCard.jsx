import {
  Flex, Box, Input, InputGroup, InputRightElement, InputLeftElement, Button,
  Select, Icon, Text, Center, CheckboxGroup, Checkbox, Stack, Image
} from '@chakra-ui/react';
import { IoCartOutline } from "react-icons/io5";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import NextLink from 'next/link';
// import Image from 'next/image'

export default function ProductCard(props) {
  const { productId, productCode, productName, isiPerkemasan, isDeleted, productCategory, productImage, stock, firstPrice, sellingPrice, converted, unit } = props
  const percentage = parseInt((firstPrice - sellingPrice) / firstPrice * 100);

  return (
    <>
      <Box w='180px' h='293px' borderWidth='1px' m='10px' _hover={{ boxShadow: 'xl' }} boxShadow='base' borderRadius='13px' bg='white'>
        <Box h='155px' w='full' _hover={{ cursor: "pointer" }} borderTopRadius='13px' overflow='hidden'>
          <NextLink href={`/productdetails/${productId}`} as={`/productdetails/${productCode}`}>
            <Image objectFit='cover' src={`http://${productImage}`} width='180px' height='155px' />
          </NextLink>
        </Box>

        {/* <Box px='10px' h='75px'> */}
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
            _hover={{ bg: '#009B90', color: 'white' }}>
            <Icon boxSize='4' as={IoCartOutline} mr='5px' />
            Keranjang</Button>

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