import Provider from './provider';
import Navbar from './components/Navbar';
import { Outfit } from 'next/font/google';

import { Box } from '@chakra-ui/react';

const outfit = Outfit({
  subsets: ['latin'],
  weights: ['400', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html
      style={{ height: '100%', overflow: 'hidden' }}
      suppressHydrationWarning
      className={outfit.className}
    >
      <head />
      <body>
        <Provider>
          <Box
            maxW={{ base: '95%', md: '800px', lg: '1200px' }}
            mx="auto"
            mt="10"
            p="6"
            boxShadow="lg"
            borderRadius="md"
            height="90vh"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Navbar />
            <Box flex="1" overflow="auto">
              {children}
            </Box>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
