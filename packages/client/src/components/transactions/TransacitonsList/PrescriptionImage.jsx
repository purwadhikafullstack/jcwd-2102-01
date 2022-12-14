import {
 Modal, ModalCloseButton, ModalOverlay, ModalHeader, ModalBody, useDisclosure,
 ModalContent, Center, Image,
} from '@chakra-ui/react';

export default function PrescriptionImage(props) {
 const { imageUrl } = props
 const { isOpen: isOpenImage, onOpen: onOpenImage, onClose: onCloseImage } = useDisclosure()
 return (
  <>
   <Image mr='20px' objectFit='cover' src={`http://${imageUrl}`} onClick={onOpenImage} _hover={{ cursor: 'pointer' }} width='80px' height='80px' />
   {/* ----- Upload bukti pembayaran -----  */}
   <Modal isOpen={isOpenImage} onClose={onCloseImage} size='lg'>
    <ModalOverlay />
    <ModalContent>
     <ModalHeader>Resep Dokter</ModalHeader>
     <ModalCloseButton />
     <ModalBody pb={6}>
      <Center>
       <Image objectFit='contain' src={`http://${imageUrl}`} width='350px' height='400px' />
      </Center>
     </ModalBody>
    </ModalContent>
   </Modal>
  </>
 )
}