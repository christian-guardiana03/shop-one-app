import { Box, Button, HStack, IconButton, Image, Text, VStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '@/store/product';
import { Toaster, toaster } from "@/components/ui/toaster";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleUpdateProduct = () => {
        setOpenUpdate(true);
    }
    const handleDeleteProduct = () => {
        setOpenDelete(true);
    }

    const confirmUpdate = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);

        setOpenUpdate(false);
        if (!success) {
            toaster.create({
            title: "Error",
            description: message,
            type: "error",
            isClosable: true
            })
            toaster.create({
            title: "Error",
            description: message,
            type: "error",
            isClosable: true
            })
        } else {
            toaster.create({
                title: "Success",
                description: "Product updated.",
                type: "success",
                isClosable: true
            })
        }
    }

    const confirmDelete = async (pid) => {
        const { success, message } = await deleteProduct(pid);

        setOpenDelete(false);
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
        }
    }


    return (
    <Box 
        shadow='lg'
        rounded='lg'
        maxW="xs" 
        borderWidth="1px"
        mb="4"
        _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
        bg={bg}
    >
        <Image src={product.image} alt={product.image} h={48} w='full' objectFit='cover' />

        <Box p="4" spaceY="2">
        <Text fontWeight="medium" color="fg">
            {product.name}
        </Text>
        <HStack color="fg.muted">
            ${product.price}
        </HStack>
        <HStack spacing={2}>
            <IconButton 
                colorPalette='blue'
                size={"xs"}
                onClick={handleUpdateProduct}
            >
                <FaEdit />
            </IconButton>
            <IconButton 
                colorPalette='red'
                size={"xs"}
                onClick={handleDeleteProduct}
            >
                <MdDelete />
            </IconButton>
        </HStack>
        </Box>
        <Toaster />
        {/* Delete Dialog */}
        <DialogRoot 
            open={openDelete}
            key={product._id+"-delete"}
            onOpenChange={(e) => setOpenDelete(e.open)}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>
                        Are you sure to delete this Product?
                    </p>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={() => confirmDelete(product._id)} colorPalette='red'>Delete</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
        {/* Update Dialog */}
        <DialogRoot 
            open={openUpdate}
            key={product._id+"-update"}
            onOpenChange={(e) => setOpenUpdate(e.open)}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            borderColor={useColorModeValue("gray.200", "gray.400")}
                            variant='flushed'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder='Price'
                            borderColor={useColorModeValue("gray.200", "gray.400")}
                            variant='flushed'
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            borderColor={useColorModeValue("gray.200", "gray.400")}
                            variant='flushed'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value })}
                        />
                    </VStack>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={() => confirmUpdate(product._id, updatedProduct)}>Update</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    </Box>
    )
}

export default ProductCard