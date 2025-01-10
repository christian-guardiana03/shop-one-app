import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '@/store/product';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { React, useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const handleChange = (event) => {
    setNewProduct({...newProduct, [event.target.name]: event.target.value});
  }

  const { createProduct } = useProductStore();
  const handleSubmit = async () => {
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        isClosable: true
      })
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        isClosable: true
      })
      setNewProduct({ name: "", price: "", image: "" });
    }
  }

  return <Container maxW={"container.sm"}>
    <VStack spacing={8}>
      <Heading as="h1" textAlign="center" mb="8">
        Create New Product
      </Heading>
      <Toaster />
      <Box
        w="50%" bg={useColorModeValue("white", "gray.800")}
        p="6" rounded="lg" shadow="md"
      >
        <VStack spacing={4}>
          <Input
            placeholder='Product Name'
            borderColor={useColorModeValue("gray.200", "gray.400")}
            variant='flushed'
            name='name'
            value={newProduct.name}
            onChange={handleChange}
          />
          <Input
            placeholder='Price'
            borderColor={useColorModeValue("gray.200", "gray.400")}
            variant='flushed'
            name='price'
            type='number'
            value={newProduct.price}
            onChange={handleChange}
          />
          <Input
            placeholder='Image URL'
            borderColor={useColorModeValue("gray.200", "gray.400")}
            variant='flushed'
            name='image'
            value={newProduct.image}
            onChange={handleChange}
          />

          <Button colorPalette='blue' onClick={handleSubmit} w='full'>Create Product</Button>
        </VStack>
      </Box>
    </VStack>
  </Container>
}

export default CreatePage