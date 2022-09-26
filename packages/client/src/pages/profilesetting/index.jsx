import { Flex } from '@chakra-ui/react';
import NavBarSignIn from "../../components/navbar/NavBarSignIn"
import ProfileSetting from '../../components/profilesetting/ProfileSetting';
import Metatag from '../../components/metatag/Metatag';
import { useRouter } from "next/router";

export default function ProfileSettingPage() {
 const router = useRouter();
 const url = "http://localhost:3000" + router.pathname;

 return (
  <Metatag title={"Pengaturan Profil"} description={"Pengaturan Profil Healthymed"}
   url={url} type="website">
   <NavBarSignIn />
   <Flex flexWrap={'wrap'} minH={'80vh'} justifyContent={'center'} padding={'30px'} bgGradient='linear(to-t, #ffffff 50%, #ddf1f9 )'>
    <ProfileSetting />
   </Flex>
  </Metatag>
 )
}