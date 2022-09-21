import { Text, Link, Center } from '@chakra-ui/react';

export default function AdmFooter() {
 return (
  <>
   <Center flexWrap={'wrap'} bg='#256D85' minH={'50px'} justifyContent={'center'} >
    <Text fontWeight='semibold' color='white'>Design by &nbsp;</Text>
    <Link href='https://www.instagram.com/wira.lin/?hl=id' fontWeight='semibold' color='white'>@Wira Chanra</Link>
    <Text fontWeight='semibold' color='white'>&nbsp; Develop by &nbsp;</Text>
    <Link href='https://www.instagram.com/wira.lin/?hl=id' fontWeight='semibold' color='white'>@Wira Chanra</Link>
    <Text fontWeight='semibold' color='white'>&nbsp; & &nbsp;</Text>
    <Link href='https://www.instagram.com/jkristian960/?hl=id' fontWeight='semibold' color='white'>@Jason Kristian</Link>
   </Center>
  </>
 )
}