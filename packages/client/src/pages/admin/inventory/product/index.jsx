import {
  Box, Flex, InputGroup, InputLeftElement, InputRightElement, Input, Menu, MenuButton, AlertIcon, Alert,
  MenuDivider, Text, Icon, useDisclosure, Link, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalProfPicture,
  ModalBody,
  ModalFooter, Button, Center, FormControl, Stack, HStack, VStack, Select, useNumberInput,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  Image
} from '@chakra-ui/react';
import AdminNavBar from "../../../../components/admin/sidebar/AdminNavBar";
import SideBar from "../../../../components/admin/sidebar/sidebar";
import AdmFooter from '../../../../components/admin/admfooter/admfooter';
import { useSelector, useDispatch } from "react-redux";
import { useFormik, validateYupSchema } from "formik";
import { useState } from 'react';
import { useEffect } from 'react';
import { axiosInstance } from '../../../../lib/api';
import qs from "qs";
import * as yup from "yup";
import Buttonadd from "../../../../components/admin/inventory/product/Buttonadd";
import Buttonedit from "../../../../components/admin/inventory/product/Buttoneditprod";
//  import Buttondeleted from "../../../../components/admin/inventory/product/Buttondelete";
export default function Product(props) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const productSelector = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const toast = useToast();
  // const filtering = useSelector((state) => state.filtering)
  // const [id, is_deleted] = useState([])
  const [filtering, setFiltering] = useState();
  const { id } = props
  const [limit, setLimit] = useState(1)
  const render = useSelector
  const [page, setPage] = useState(5)
  // const [search, setSearch] = useState([])
  // const [category, setCategory] = useState([])
  // const [category2, setCategory2] = useState([])
  // const [category3, setCategory3] = useState([])
  // const [sort, setSort] = useState([])
  // const [orderby, setOrderby] = useState([])
  const limitpage = 1;

  // initialValues: {

  // },
  // validationSchema: yup.object().shape({
  //   product: yup.string().required("isi jenis product"),
  // }),
  //   validateOnChange: false,
  //     onSubmit: (values) =>{
  //       dispatch(prod)
  //     }
  // })


  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
      precision: 0,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  // async
  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/products/api/v1/productsAdmin?limit=15&page=1")
      // .then((res) => {
      const data = res.data.result
      console.log(data)
      setProduct([...data])
      setFiltering(res.data.result)

      console.log(res.data.result);
    } catch (err) {

      console.log(err);
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  // async function deletedProduct(id){
  //   try{
  // alert(id)
  async function deletedProduct(id) {
    console.log(id)
    try {
      axiosInstance.patch("/products/api/v1/product/" + id)
    } catch (err) {
      console.log("error")
    }
  }
  // catch(err){
  //   console.log(err);
  // }
  // }
  // button onclic
  // button onClick={()=> deletedProduct()}
  // try{
  //     await axiosInstance.patch("/product//api/v1/product" + id, formData).then((res)=>{
  //       setProduct(res.data.result);
  //     })
  //   }catch(err){
  //     console.log(err);
  //    }}
  //     const formik = useFormik({
  //       initialValues:{
  //         is_deleted: is_deleted,
  //       },
  //       enableReinitialize: true,
  //       onSubmit: async (values) => {
  //         const formData = new FormData();
  //         const { product_name,product_code,kegunaan,kemasan,golongan,cara_simpan,nomor_ijin_edar,cara_pakai,peringatan,weight,komposisi,stock,capital_price,selling_price,converted,isi_perkemasan,total_sold,first_price,margin,category } = formik.values
  //   alert(change_product)
  //       try {

  //         console.log(data)

  //         formData.append("is_deleted", is_deleted)

  // let body = {
  //   is_deleted : values.is_deleted,
  // }
  //       await axiosInstance.patch("/products/" + id, formData).then(()=>{
  //qs.stringfy ngubah data ke bentuk json

  // setEditInput(false)
  // dispatch({
  //     type: "FETCH_RENDER",
  //     payload: { value: !autoRender.value }
  //   })
  //     toast({
  //     title: `Product has been edited`,
  //     description: "Berhasil mengedit produk",
  //     status: "success",
  //     isClosable: true,
  //     })
  //     console.log(body)

  //     })
  //     } catch (err) {
  // console.log(editId);
  //     console.log(err);
  //     }
  //     }
  //       })
  //     toast ({
  //         title: "Deleted",
  //         description: "Category has been successfully deleted",
  //         status: "success",
  //         isClosable: true
  //     })

  //     toast({
  //         title: "Error",
  //         description: "There was an error deleting category",
  //         status:"error",
  //         isClosable: true
  //     })
  //     }
  // }
  useEffect(() => {
    deletedProduct()
  }, [])

  // alert() 

  const rendergetProduct = () => {
    return product?.map((val, index) => {
      // 
      return (


        <Tr>
          <Td>{val.id}</Td>
          <Td>{val.product_name}</Td>
          <Td>{val.product_code}</Td>
          <Td>
            <Image src={"http://" + val.Product_images[0].image_url}
              w={"90px"} h={"50px"} />

          </Td>
          {/* { val.Product_image[0].Category.id ?
            ( <Td> {val.Product_image[0].Category.category}
              
            </Td> ) : null} */}
          {val.Product_categories[0].Category.id ?
            (<Td> {val.Product_categories[0].Category.category}

            </Td>) : null}
          {/* <Td>{val.Product_categories[0].category}</Td>
            } */}
          {/* <Td>{val.limit}</Td>
            <Td>{val.page}</Td>
          <Td>{val.search}</Td> */}
          {/* <Td>{val.Product_categories.map((val)=>{
              val.Category.category
            })}</Td> */}
          <Td>{val.Product_stocks[0].stock}</Td>
          {
            val.Product_stocks[0].Unit.id ?
              (<Td>{val.Product_stocks[0].Unit.unit_name}</Td>) : null
          }
          <Td>{val.Product_stocks[0].selling_price}</Td>
          {/* <Td>{val.category2}</Td>
            <Td>{val.category3}</Td>
            <Td>{val.sort}</Td>
          <Td>{val.orderby}</Td> */}
          <Td>d</Td>
          <Td>
            <Buttonedit
              key={index}
              id={val.id}
              product_code={val.product_code}
              product_name={val.product_name}
              kegunaan={val.kegunaan}
              kemasan={val.kemasan}
              golongan={val.golongan}
              cara_simpan={val.cara_simpan}
              nomor_ijin_edar={val.nomor_ijin_edar}
              cara_pakai={val.cara_pakai}
              peringatan={val.peringatan}
              weight={val.weight}
              komposisi={val.komposisi}
              stock={val.stock}
              capital_price={val.capital_price}
              selling_price={val.selling_price}
              converted={val.converted}
              isi_perkemasan={val.isi_perkemasan}
              total_sold={val.total_sold}
              first_price={val.first_price}
              margin={val.margin}
              Product_stocks={val.Product_stocks}
              Product_description={val.Product_description}
              Product_categories={val.Product_categories}

              // editId = {val.id}
              // editProductname= {val.product_name}
              // edi
              data={val}
            />
          </Td>
          <Td>
            <Button
              key={index}
              // id={val?.id}
              onClick={() => deletedProduct(val.id)}>
              Delete</Button>
          </Td>
        </Tr>
      )
    })
  }


  return (
    <>
      <Flex bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
        <SideBar />
        <Box>
          <AdminNavBar />
          <Flex flexWrap={'wrap'} p='15px'>
            <Box>
              <Buttonadd />
            </Box>
            {/* <Box>
      <Buttonedit/>
     </Box> */}
            <Box m='10px' h='300px' w='1000px'>
              <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                  <TableCaption>Table Product</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Nama Obat</Th>
                      <Th>Kode Obat</Th>
                      <Th>Gambar</Th>
                      <Th>Kategori</Th>
                      <Th>Stock</Th>
                      <Th>Unit</Th>
                      <Th>Harga Obat</Th>
                      <Th>Detail Obat</Th>
                      <Th>Edit</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {rendergetProduct()}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>No</Th>
                      <Th>Nama Obat</Th>
                      <Th>Kode Obat</Th>
                      <Th>Gambar</Th>
                      <Th>Kategori</Th>
                      <Th>Stock</Th>
                      <Th>Unit</Th>
                      <Th>Harga Obat</Th>
                      <Th>Detail Obat</Th>
                      <Th>Edit</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer> </Box>

          </Flex>
          {/* <AdmFooter /> */}

        </Box>

      </Flex>

    </>
  )
}