import { Box, Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Box mx="auto" mt="10" p="6" boxShadow="lg" borderRadius="md">
        <Heading as="h1" size="2xl" mb="4">
          GoLedger Streaming
        </Heading>
      </Box>
    </>
  );
}
