import { Checkbox, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'

export default function SideFilterCategory(props) {
 // const autoRender = useSelector((state) => state.automateRendering)
 const { idcategory, category } = props
 const autoRender = useSelector((state) => state.automateRendering)
 const dispatch = useDispatch()
 const router = useRouter();

 const setTheParams = async () => {
  router.push(`?category1=${category}`);

  dispatch({
   type: "FETCH_RENDER",
   payload: { value: !autoRender.value }
  })
 }

 return (
  <>
   {/* <NextLink href={`/productlist?category=${idcategory}`}> */}
   {/* <NextLink> */}
   {/* <Checkbox onClick={setTheParams} colorScheme='green' my='3px' w='full'>{category}</Checkbox> */}
   <Button onClick={setTheParams} colorScheme='green' my='3px' w='full'>{category}</Button>
   {/* </NextLink> */}
  </>
 )
}