import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

function PhoneNumberCombinations() {
    const letterCombinations = (digits) => {
        if (digits.length === 0) {
            return [];
          }
        
        const mapping = {
            '2': ['a', 'b', 'c'],
            '3': ['d', 'e', 'f'],
            '4': ['g', 'h', 'i'],
            '5': ['j', 'k', 'l'],
            '6': ['m', 'n', 'o'],
            '7': ['p', 'q', 'r', 's'],
            '8': ['t', 'u', 'v'],
            '9': ['w', 'x', 'y', 'z'],
        };
    
        const result = [];
    
        const backtrack = (index, current) => {
            if (index === digits.length) {
                result.push(current);
                return;
            }
        
            const letters = mapping[digits[index]];
            for (const letter of letters) {
                backtrack(index + 1, current + letter);
            }
        };
    
        backtrack(0, '');
        return result;
        
    }

    const [digits, setDigits] = useState('');
    const [combinations, setCombinations] = useState([]);

    const handleInputChange = (event) => {
        setDigits(event.target.value);
    };

    const generateCombinations = () => {
        setCombinations(letterCombinations(digits));
    };

    return <Container maxW={"container.sm"}>
        <VStack spacing={8}>
          <Heading as="h1" textAlign="center" mb="8">
            Phone Number Letter Combinations
          </Heading>
          <Box
            w="50%"
            p="6" rounded="lg" shadow="md"
          >
            <VStack spacing={4}>
              <Input
                placeholder='Input 2 numbers'
                variant='flushed'
                name='name'
                value={digits}
                onChange={handleInputChange}
              />
    
              <Button colorPalette='blue' onClick={generateCombinations} w='full'>Generate</Button>
            </VStack>
            <VStack>
                <ul>
                    {combinations.map((combination) => (
                    <li key={combination}>{combination}</li>
                    ))}
                </ul>
            </VStack>
          </Box>
        </VStack>
      </Container>
}

export default PhoneNumberCombinations