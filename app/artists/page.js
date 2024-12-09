'use client';

import { useIntl } from 'react-intl';
import {
  Box,
  Heading,
  Text,
  Spinner,
  HStack,
  Separator,
  IconButton,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

import { Toaster } from '@/components/ui/toaster';
import { Tooltip } from '../components/Tooltip';
import Stack from '../components/Stack';
import EditArtistDialog from '../components/EditArtistDialog';
import CreateArtistDialog from '../components/CreateArtistDialog';
import { useArtists } from '@/hooks/useArtists';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ArtistsPage() {
  const { formatMessage } = useIntl();

  const {
    artists,
    isFetching,
    isLoading,
    addArtist,
    editArtist,
    deleteArtist,
    error,
  } = useArtists();

  function formatDate(dateString) {
    if (!dateString) return 'Data não informada';

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  if (isFetching) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="xl" />
        <Text mt="4">{formatMessage({ id: 'artists.loading' })}</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="10">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box
      boxSizing="border-box"
      height="100%"
      display="flex"
      flexDirection="column"
      gap="5"
    >
      <Heading
        as="h1"
        size="xl"
        mt="6"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {formatMessage({ id: 'artists.title' })}
        <CreateArtistDialog onSave={addArtist} />
      </Heading>

      <Separator />
      <Stack>
        <>
          {artists.map(artist => (
            <Box
              key={artist['@key']}
              p="4"
              boxShadow="md"
              borderRadius="md"
              borderWidth="thin"
              borderColor="purple.800"
            >
              <Heading
                as="h2"
                size="md"
                display="flex"
                justifyContent="space-between"
              >
                {artist.name}
                <HStack spacing="2">
                  <EditArtistDialog artist={artist} onSave={editArtist} />

                  <Tooltip content={formatMessage({ id: 'delete' })}>
                    <IconButton
                      variant="outline"
                      onClick={() =>
                        deleteArtist({
                          '@assetType': 'artist',
                          '@key': `${artist['@key']}`,
                        })
                      }
                    >
                      <MdDelete />
                    </IconButton>
                  </Tooltip>
                </HStack>
              </Heading>
              <Text>
                {formatMessage(
                  { id: 'artists.country' },
                  { country: artist.country }
                )}
              </Text>
              <Text fontSize="small">
                {formatMessage(
                  { id: 'artists.lastUpdated' },
                  { updatedAt: formatDate(artist['@lastUpdated']) }
                )}
              </Text>
            </Box>
          ))}
        </>
      </Stack>
      <Toaster />

      {isLoading && <LoadingSpinner />}
    </Box>
  );
}
