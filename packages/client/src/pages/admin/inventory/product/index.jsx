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
} from '@chakra-ui/react';
import AdminNavBar from "../../../../components/admin/sidebar/AdminNavBar";
import SideBar from "../../../../components/admin/sidebar/sidebar";
import SidebarWithHeader from "../../../../components/admin/sidebar/sidebar3";
import AdmFooter from '../../../../components/admin/admfooter/admfooter';
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import NilaiBarang from "../../../../components/admin/inventory/Nilai Barang";
import NilaiJual from "../../../../components/admin/inventory/Nilai Jual";
import { axiosInstance } from '../../../../lib/api';
import qs from "qs";
import * as yup from "yup";

export default function Product() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      username: `${userSelector.username}`,
      full_name: `${userSelector.full_name}`,
      email: `${userSelector.email}`,
      bio: `${userSelector.bio}`,
      gender: `${userSelector.gender}`,
      avatar_url: `${userSelector.avatar_url}`,
      id: userSelector.id,
    }
  })

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


  return (
    <>
      <Flex bgGradient='linear(to-tr, #ffffff 50%, #ddf1f9 )'>
        <SideBar />
        <Box>
          <AdminNavBar />
          <Flex flexWrap={'wrap'} p='15px'>

            <Button onClick={onOpen}>Tambah Produk
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Tambahkan produk baru</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box width="200px" mt="20px">
                      <Text>Kode Obat</Text>
                      {/* {formik.values.full_name} */}
                    </Box>
                    <Box mt="20px" width="200px">
                      <Input
                        placeholder="Masukan kode obat"
                        onChange={(e) => {
                          formik.setFieldValue("full_name", e.target.value);
                        }}
                      // defaultValue={userSelector.full_name}
                      ></Input>
                    </Box>

                    <Box width="200px" mt="10px">
                      <Text>No Obat</Text>{" "}
                    </Box>
                    <Box mt="20px" width="200px">
                      <Input
                        placeholder="Masukan no obat"
                        onChange={(e) => {
                          formik.setFieldValue("full_name", e.target.value);
                        }}
                      // defaultValue={userSelector.full_name}
                      ></ Input>
                    </Box>

                    <Box width="200px" mt="10px">
                      <Text>No SPOM</Text>{" "}
                    </Box>
                    <Box mt="20px" width="200px">
                      <Input
                        placeholder="Masukan no SPOM"
                        onChange={(e) => {
                          formik.setFieldValue("full_name", e.target.value);
                        }}
                      // defaultValue={userSelector.full_name}
                      ></Input>
                    </Box>

                    <Box width="200px" mt="10px">
                      <Text>Kategori</Text>{" "}
                    </Box>
                    <Stack mt="10px" width="200px">
                      <FormControl isInvalid={formik.errors.category}>
                        <Select
                          defaultValue={userSelector.category}
                          onChange={(event) =>
                            formik.setFieldValue("kategori", event.target.value)
                          }
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Select>
                      </FormControl>
                    </Stack>


                    <Box width="200px" mt="10px">
                      <Text>Tanggal Kadarluasa</Text>{" "}
                    </Box>
                    <Stack mt="10px" width="200px">
                      <FormControl isInvalid={formik.errors.category}>
                        <Select
                          defaultValue={userSelector.category}
                          onChange={(event) =>
                            formik.setFieldValue("DD/MM/YYYY", event.target.value)
                          }
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Select>
                      </FormControl>
                    </Stack>


                    <Box width="200px" mt="10px">
                      <Text>Lokasi Penyimpanan</Text>{" "}
                    </Box>
                    <Stack mt="10px" width="200px">
                      <FormControl isInvalid={formik.errors.category}>
                        <Select
                          defaultValue={userSelector.category}
                          onChange={(event) =>
                            formik.setFieldValue("Option", event.target.value)
                          }
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Select>
                      </FormControl>
                    </Stack>

                    <Box width="200px" mt="10px">
                      <Text>Kuantitas</Text>{" "}
                    </Box>
                    <HStack maxW='320px'>
                      <Button {...inc}>+</Button>
                      <Input {...input} />
                      <Button {...dec}>-</Button>
                    </HStack>

                    <Box width="200px" mt="10px">
                      <Text>Satuan</Text>{" "}
                    </Box>
                    <Stack mt="10px" width="200px">
                      <FormControl isInvalid={formik.errors.category}>
                        <Select
                          defaultValue={userSelector.category}
                          onChange={(event) =>
                            formik.setFieldValue("Satuan", event.target.value)
                          }
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Select>
                      </FormControl>
                    </Stack>


                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} m='1 px'>Simpan</Button>
                    <Button variant='ghost' onClick={onClose}>
                      Tutup
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Button>

            <Box m='10px' h='300px' w='300px'>  <TableContainer>
              <Table variant='striped' colorScheme='teal'>
                <TableCaption>Table Category</TableCaption>
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Kategori</Th>
                    <Th>Edit</Th>
                    <Th> Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* {rendergetCategory()} */}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>No</Th>
                    <Th>Kategori</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer> </Box>

          </Flex>
          <AdmFooter />

        </Box>

      </Flex>

    </>
  )
}