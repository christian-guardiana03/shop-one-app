import ProductCard from '@/components/ProductCard'
import { useProductStore } from '@/store/product'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);

  return (
    <Container maxW='container.x1' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgImage="linear-gradient({colors.cyan.400}, {colors.blue.500})"
          bgClip={"text"}
          mb={"8"}
        >
          All Products
        </Text>
        {products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3
            }}
            spacing={10}
            w="80%"

          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize='x1'
            fontWeight={"bold"}
            textAlign={"center"}
            color='white'
          >
            No Products Available. {" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
        </Text>
        )}
        
      </VStack>
    </Container>
  )
}

export default HomePage