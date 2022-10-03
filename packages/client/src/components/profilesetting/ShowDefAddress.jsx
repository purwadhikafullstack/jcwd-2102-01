import { Box, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";

export default function ShowDefaultAddress(props) {
  const { idalamat, namaPenerima, phonePenerima, alamat, provinsi, kecamatan, provinsiId, city, city_id, postalCode, defaultAddress } = props
  const [addressId, setAddressId] = useState(defaultAddress)

  useEffect(() => {
    setAddressId(defaultAddress)
    // console.log(addressId);
  }, [defaultAddress]);

  return (
    <>
      <Box display='flex' borderWidth='1px' p='5px' px='10px' boxShadow='md' borderRadius='13px' bg='white'>
        <Box w='full'>
          <Box flexWrap='wrap' mt='5px'>
            <Box display='flex' color='#0778a3'>
              <Text fontWeight='semibold'>{namaPenerima}</Text>
              <Text fontWeight='semibold' ml='10px'>{phonePenerima}</Text>
            </Box>

            <Box display='flex' fontSize='sm'>
              <Text fontWeight='semibold' w='90px'>Alamat:</Text>
              <Text>{alamat}</Text>
            </Box>

            <Box display='flex' fontSize='sm'>
              <Text fontWeight='semibold' w='90px' >Provinsi:</Text>
              <Text >{provinsi}</Text>
            </Box>

            <Box display='flex' fontSize='sm'>
              <Text fontWeight='semibold' w='90px' >Kota/Kab:</Text>
              <Text >{city}</Text>
            </Box>

            <Box display='flex' fontSize='sm'>
              <Text fontWeight='semibold' w='90px' >Kecamatan:</Text>
              <Text >{kecamatan}</Text>
            </Box>

            <Box display='flex' justifyContent='space-between'>
              <Box display='flex' fontSize='sm'>
                <Text fontWeight='semibold' w='90px' >Kode Post:</Text>
                <Text>{postalCode}</Text>
              </Box>
            </Box>

          </Box>
        </Box>
      </Box>
    </>
  )
}