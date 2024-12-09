'use client';

import { Box, Heading, Separator, Text, VStack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

export default function Home() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100%"
        p={4}
      >
        <VStack spacing={6} padding={8} textAlign="center">
          <Heading as="h1" size="2xl" color="purple.700">
            {formatMessage({ id: 'greeting' })}
          </Heading>
          <Separator mb="6" mt="6" />
          <Text fontSize="lg" color="gray.500" maxW="600px">
            {formatMessage({ id: 'projectExperience' })}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {formatMessage({ id: 'exploreNavbar' })}
          </Text>
          <Text fontSize="sm" mt="6" color="gray.500">
            {formatMessage({ id: 'thankYou' })}
          </Text>
        </VStack>
      </Box>
    </>
  );
}
