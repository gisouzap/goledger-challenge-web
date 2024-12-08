'use client';

import { Stack as ChakraStack } from '@chakra-ui/react';

export default function Stack({ children }) {
  return (
    <ChakraStack
      flex="1"
      overflow="auto"
      direction={{ base: 'column', md: 'column' }}
      gap="10"
      p="6"
      boxSizing="border-box"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(to bottom, #641ba3, #4a1772)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#4a1772',
        },
      }}
    >
      {children}
    </ChakraStack>
  );
}
