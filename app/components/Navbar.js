'use client';

import { Box, Flex, Link, Text, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useIntl } from 'react-intl';

import { Switch } from '@/components/ui/switch';
import { useIntlContext } from '@/context/IntlContext';

export default function Navbar() {
  const { locale, switchLocale } = useIntlContext();
  const { formatMessage } = useIntl();

  const handleChange = () => {
    switchLocale(locale === 'en' ? 'pt' : 'en');
  };

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
            <Text fontFamily="monospace">
              {formatMessage({ id: 'navbar.artists' })}
            </Text>
          </Link>
          <Link
            as={NextLink}
            href="/albums"
            _hover={{ textDecoration: 'none', color: 'purple.900' }}
          >
            <Text fontFamily="monospace">
              {formatMessage({ id: 'navbar.albums' })}
            </Text>
          </Link>
          <Link
            as={NextLink}
            href="/playlists"
            _hover={{ textDecoration: 'none', color: 'purple.900' }}
          >
            <Text fontFamily="monospace">
              {formatMessage({ id: 'navbar.playlists' })}
            </Text>
          </Link>
          <Link
            as={NextLink}
            href="/songs"
            _hover={{ textDecoration: 'none', color: 'purple.900' }}
          >
            <Text fontFamily="monospace">
              {formatMessage({ id: 'navbar.songs' })}
            </Text>
          </Link>
        </Flex>
        <HStack spacing="4">
          <Text fontFamily="monospace">
            {locale === 'en' ? 'English' : 'Português'}
          </Text>
          <Switch
            checked={locale === 'pt'}
            onChange={handleChange}
            color="purple"
            variant="raised"
          />
        </HStack>
      </Flex>
    </Box>
  );
}
