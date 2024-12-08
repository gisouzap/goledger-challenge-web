'use client';

import { Box, Flex, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

export default function Navbar() {
  return (
    <Box bg="purple.600" color="white" px="4" py="2" borderRadius="md">
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
          <Image src="/logo.png" alt="Logo" width={200} height={100} />
        </Link>
        <Flex gap="4">
          <Link
            as={NextLink}
            href="/artists"
            _hover={{ textDecoration: 'none', color: 'purple.900' }}
          >
            <Text fontFamily="monospace">Artistas</Text>
          </Link>
          <Link
            as={NextLink}
            href="/album"
            _hover={{ textDecoration: 'none', color: 'purple.900' }}
          >
            <Text fontFamily="monospace">Álbum</Text>
          </Link>
          <Link
            as={NextLink}
            href="/playlist"
            _hover={{ textDecoration: 'none', color: 'purple.900' }}
          >
            <Text fontFamily="monospace">Playlists</Text>
          </Link>
          <Link
            as={NextLink}
            href="/songs"
            _hover={{ textDecoration: 'none', color: 'purple.900' }}
          >
            <Text fontFamily="monospace">Músicas</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
