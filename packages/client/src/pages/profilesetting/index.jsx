import { Flex, Spinner } from '@chakra-ui/react';
import NavBarSignIn from "../../components/navbar/NavBarSignIn"
import ProfileSetting from '../../components/profilesetting/ProfileSetting';
import Metatag from '../../components/metatag/Metatag';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function ProfileSettingPage() {
 const userSelector = useSelector((state) => state.auth);
 const [isLoading, setIsLoading] = useState(true);
 const router = useRouter();
 const url = "http://localhost:3000" + router.pathname;

 useEffect(() => {
  if (!userSelector?.id) {
   router.push("/login")
  }
  else {
   setIsLoading(false);
  }
 }, [userSelector?.id]);

 return (
  <Metatag title={"Pengaturan Profil"} description={"Pengaturan Profil Healthymed"}
   url={url} type="website">
   {isLoading ?
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
     <Spinner thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl' /> &nbsp; loading...
    </Flex>
    :
    <>
     <NavBarSignIn />
     <Flex flexWrap={'wrap'} minH={'80vh'} justifyContent={'center'} padding={'30px'} bgGradient='linear(to-t, #ffffff 50%, #ddf1f9 )'>
      <ProfileSetting />
     </Flex>
    </>}
  </Metatag>
 )
}