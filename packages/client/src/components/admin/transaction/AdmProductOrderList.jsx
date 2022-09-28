import {
  Flex, Box, Text, Button, InputGroup, InputLeftElement, Icon, useDisclosure,
  InputRightElement, Input, Tooltip, Divider, useToast, Link, Image,
  Modal, ModalOverlay, ModalHeader, ModalBody, ModalCloseButton, ModalContent
} from '@chakra-ui/react';

export default function AdmProductOrderList(props) {
  const { image, productName, qtyBuy, price, totalPrice, unit, firstPrice, idCart, productCode, idUser } = props
  const percentage = parseInt((firstPrice - price) / firstPrice * 100);

  return (
    <>
      {/* ---------- Start Product in Cart ---------- */}
      <Divider />
      <Flex justifyContent='space-between' my='10px'>
        <Box display='flex'>
          <Box minW='100px' minH='100px' overflow='hidden' borderWidth='1px' >
            <Link href={`/productdetails/${productCode}`}>
              <Image objectFit='cover' src={`http://${image}`} width='100px' height='100px' />
            </Link>
          </Box>
          <Box ml='15px' >
            <Link href={`/productdetails/${productCode}`}>
              <Text fontWeight='semibold' textColor='#213360'>
                {productName.substring(0, 32)}{!productName ? null : productName.length >= 32 ? '...' : null}
              </Text>
            </Link>
            <Text fontWeight='semibold' fontSize='sm' textColor='#213360'>
              {qtyBuy} {unit} x
            </Text>
          </Box>
        </Box>
        <Box w='150px' textAlign='right'>
          <Box display='flex' justifyContent='flex-end' flexWrap='wrap'>
            {!firstPrice ? <></> :
              <>
                <Text fontWeight='bold' fontSize='xs' textColor='#FF6B6B'  > {percentage}% </Text>
                <Text fontWeight='semibold' fontSize='xs' ml='5px' color='#737A8D' as='s'>Rp {firstPrice?.toLocaleString()}</Text>
              </>}
          </Box>
          <Text fontSize='md' textColor='#213360' >
            Rp {price?.toLocaleString()}
          </Text>
          <Text fontSize='md'>
            Total
          </Text>
          <Text fontSize='md' fontWeight='semibold'>
            Rp {totalPrice.toLocaleString()}
          </Text>
        </Box>
      </Flex>

    </>
  )
}