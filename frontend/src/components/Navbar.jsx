import { FaRegPlusSquare, FaMoon, FaRegSun } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useColorMode } from "./ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"800px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgImage="linear-gradient({colors.cyan.400}, {colors.blue.500})"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack wordSpacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <FaRegPlusSquare />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaRegSun /> }
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar