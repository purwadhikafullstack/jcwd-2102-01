import {
   Box, Text, Modal, ModalCloseButton, Icon, ModalOverlay, ModalHeader, ModalBody, useDisclosure, ModalFooter,
   Button, ModalContent, Center, Divider,
} from '@chakra-ui/react';
import { BiDetail } from "react-icons/bi";
import logo from '../../../assets/img/healthymedLogo.png'
import NextImage from 'next/image';
import AdmProductOrderList from './AdmProductOrderList';
import moment from 'moment';

export default function AdmMdetailTransaction(props) {
   const { idDet, productsDet, noInvoiceDet, dateCreatedDet, statusDet, totalOrderDet, shippingCostDet, namaPenerimaDet, alamatPenerimaDet, provDet, cityDet, districtDet, kurirDet,
      grandTotalDet, qtyBuyDet, noHpPenerimaDet, stock, unitDet, productNameDet, productImageDet, idUserDet, idRecipe, noteDet, cancelDet } = props
   const { isOpen: isOpenDetail, onOpen: onOpenDetail, onClose: onCloseDetail } = useDisclosure()

   // -------------------- pengecekkan NamaRacikan untuk di filter versi maping -------------------- //
   let temp = productsDet.map(function (x) { return x.medicine_concoction_name })
   let cekNamaRacikan = new Set(temp);
   let filterNamaRacikan = [...cekNamaRacikan];
   // console.log(filterNamaRacikan);
   // console.log(productList);

   const renderTransactionList = () => {
      if (idRecipe == 1) {
         return productsDet.map((val, index) => {
            return (
               <AdmProductOrderList key={index}
                  image={val.Product?.Product_images[0]?.image_url}
                  productName={val.Product?.product_name}
                  qtyBuy={val.buy_quantity}
                  price={val.price}
                  totalPrice={val.total_price}
                  productCode={val.Product?.product_code}
                  unit={val.Unit?.unit_name}
                  stock={val.id_unit == val.Product?.Product_stocks[0]?.id_unit ? val.Product?.Product_stocks[0]?.stock : val.Product?.Product_stocks[1]?.stock}
               />
            )
         })
      } else {
         return filterNamaRacikan.map((x, index) => {
            return (
               <>
                  <Text key={index} fontSize='md' color='#009B90' fontWeight='bold' mt='20px'>
                     {x == '' ? 'Umum' : 'Racikan ' + x}
                  </Text>
                  {
                     productsDet.map((val, index) => {
                        if (val.medicine_concoction_name == x) {
                           return (
                              <>
                                 <AdmProductOrderList key={index}
                                    image={val.Product?.Product_images[0]?.image_url}
                                    productName={val.Product?.product_name}
                                    qtyBuy={val.buy_quantity}
                                    price={val.price}
                                    totalPrice={val.total_price}
                                    productCode={val.Product?.product_code}
                                    unit={val.Unit?.unit_name}
                                    stock={val.id_unit == val.Product?.Product_stocks[0]?.id_unit ? val.Product?.Product_stocks[0]?.stock : val.Product?.Product_stocks[1]?.stock}
                                 />
                              </>
                           )
                        }
                     })
                  }
               </>
            )
         })
      }

   }

   console.log(productsDet);
   return (
      <>
         <Button onClick={onOpenDetail} variant='link' color='#009B90'>
            <Icon boxSize='5' as={BiDetail} color='#009B90' mr='5px' />
            <Text fontWeight='semibold' fontSize='sm' textColor='#009B90'>
               Lihat Detail Transaksi
            </Text>
         </Button>

         <Modal isOpen={isOpenDetail} onClose={onCloseDetail} size='2xl'>
            <ModalOverlay />
            <ModalContent borderRadius='10px'>
               <ModalHeader bg='#009B90' color='white' borderTopRadius='10px'>Detail Transaksi</ModalHeader>
               <ModalCloseButton color='white' size='lg' />
               <ModalBody>
                  <Box>
                     <Center my='10px'>
                        <NextImage src={logo} width='180px' height='40px' />
                     </Center>

                     {/* -------------------- Ringkasan Order -------------------- */}
                     <Box justifyContent='space-between'>
                        <Box mb='10px' display='flex' >
                           <Text fontWeight='bold' fontSize='lg' color='#213360' mr='10px'>
                              Ringkasan Order
                           </Text>
                           <Box py='2px' px='4px' display='flex' justifyContent='center' borderWidth='1px' borderRadius='6px'
                              borderColor={statusDet == 'Menunggu Pembayaran' || statusDet == 'Menunggu Konfirmasi Pembayaran' ? '#CBAF4E' :
                                 statusDet == 'Diproses' ? '#757575' :
                                    statusDet == 'Dikirim' ? '#0677c7' :
                                       statusDet == 'Pesanan Dikonfirmasi' ? '#87DF9F' : '#FF6B6B'}
                              bg={statusDet == 'Menunggu Pembayaran' || statusDet == 'Menunggu Konfirmasi Pembayaran' ? '#FFDE6B4D' :
                                 statusDet == 'Diproses' ? '#ededed' :
                                    statusDet == 'Dikirim' ? '#bae2ff' :
                                       statusDet == 'Pesanan Dikonfirmasi' ? '#c2ffd3' : '#fcd7d7'} >

                              <Text fontSize='xs' textAlign='center' fontWeight='semibold'
                                 color={statusDet == 'Menunggu Pembayaran' || statusDet == 'Menunggu Konfirmasi Pembayaran' ? '#CBAF4E' :
                                    statusDet == 'Diproses' ? '#757575' :
                                       statusDet == 'Dikirim' ? '#0677c7' :
                                          statusDet == 'Pesanan Dikonfirmasi' ? '#26c754' : '#FF6B6B'}
                              >{statusDet}</Text>
                           </Box>
                        </Box>

                        <Box my='10px'>
                           <Box display='flex' >
                              <Text fontWeight='semibold' color='#213360' w='160px'>
                                 Tanggal
                              </Text>:
                              <Text fontWeight='semibold' color='#213360' ml='5px'>
                                 {moment(dateCreatedDet).format('dddd') == 'Monday' ? 'Senin' :
                                    moment(dateCreatedDet).format('dddd') == 'Tuesday' ? 'Selasa' :
                                       moment(dateCreatedDet).format('dddd') == 'Wednesday' ? 'Rabu' :
                                          moment(dateCreatedDet).format('dddd') == 'Thursday' ? 'Kamis' :
                                             moment(dateCreatedDet).format('dddd') == 'Friday' ? 'Jumat' :
                                                moment(dateCreatedDet).format('dddd') == 'Saturday' ? 'Sabtu' :
                                                   'Minggu'}, &nbsp;
                                 {moment(dateCreatedDet).format('DD MMMM YYYY, HH:mm')}</Text>
                           </Box>

                           <Box display='flex' >
                              <Text fontWeight='semibold' color='#213360' w='160px'>
                                 No Transaksi
                              </Text>:
                              <Text fontWeight='semibold' color='#213360' ml='5px'>
                                 {noInvoiceDet}
                              </Text>
                           </Box>
                           <Box display='flex' >
                              <Text fontWeight='semibold' color='#213360' w='160px'>
                                 Nama Penerima
                              </Text>:
                              <Text fontWeight='semibold' color='#213360' ml='5px'>
                                 {namaPenerimaDet} {'(' + noHpPenerimaDet + ')'}
                              </Text>
                           </Box>
                           <Box display='flex' >
                              <Text fontWeight='semibold' color='#213360' minW='160px'>
                                 Alamat
                              </Text>:
                              <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
                                 {alamatPenerimaDet}, Prov. {provDet}, Kec. {districtDet}, Kota/Kab. {cityDet}.
                              </Text>
                           </Box>
                           <Box display='flex' >
                              <Text fontWeight='semibold' color='#213360' w='160px'>
                                 Kurir
                              </Text>:
                              <Text fontWeight='semibold' color='#213360' ml='5px' maxW='500px'>
                                 {kurirDet}
                              </Text>
                           </Box>
                           <Box display='flex' >
                              <Text fontWeight='semibold' color='#213360' w='160px'>
                                 Catatan
                              </Text>:
                              <Text fontWeight='semibold' color='#213360' ml='5px'>
                                 {noteDet ? noteDet : "-"}
                              </Text>
                           </Box>
                           {cancelDet ?
                              <Box display='flex' >
                                 <Text fontWeight='semibold' color='#213360' w='160px'>
                                    Deskripsi Batal
                                 </Text>:
                                 <Text fontWeight='semibold' color='red' ml='5px'>
                                    {cancelDet}
                                 </Text>
                              </Box> :
                              null
                           }
                        </Box>

                        <Box>
                           {renderTransactionList()}
                        </Box>

                        <Divider />
                        <Box mt='10px'>
                           <Box display='flex' justifyContent='space-between'>
                              <Text fontWeight='semibold' color='#213360'>
                                 Total
                              </Text>
                              <Text fontWeight='semibold' color='#213360'>
                                 Rp {totalOrderDet?.toLocaleString()}
                              </Text>
                           </Box>
                           <Box display='flex' justifyContent='space-between' mt='7px'>
                              <Text fontWeight='semibold' color='#213360'>
                                 Biaya Pengiriman
                              </Text>
                              <Text fontWeight='semibold' color='#213360'>
                                 Rp {shippingCostDet?.toLocaleString()}
                              </Text>
                           </Box>
                           <Box display='flex' justifyContent='space-between' mt='7px'>
                              <Text fontWeight='semibold' color='#213360'>
                                 Total Pembayaran
                              </Text>
                              <Text fontWeight='semibold' color='#213360'>
                                 Rp {grandTotalDet?.toLocaleString()}
                              </Text>
                           </Box>
                        </Box>

                     </Box>
                  </Box>
               </ModalBody>
               <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onCloseDetail}>
                     Close
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>

   )
}