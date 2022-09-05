import { Checkbox } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function SideFilterCategory(props) {
 // const autoRender = useSelector((state) => state.automateRendering)
 const { idcategory, category } = props

 return (
  <>
   <NextLink NextLink href={`/productlist?category=${idcategory}`}>
    <Checkbox colorScheme='green' my='3px' w='full'>{category}</Checkbox>
   </NextLink>
  </>
 )
}