'use client';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Link,
  Separator,
  HStack,
  Spinner,
} from '@chakra-ui/react';

import { usePlaylists } from '@/hooks/usePlaylists';
import PlaylistDialog from '../components/PlaylistDialog';
import CreatePlaylistDialog from '../components/CreatePlaylistDialog';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PlaylistsPage() {
  const { formatMessage } = useIntl();

  const { playlists, error, isFetching, addPlaylist, isLoading } =
    usePlaylists();

  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [showDialog, setShowDialog] = useState(false);

  if (isFetching) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="xl" />
        <Text mt="4">{formatMessage({ id: 'playlists.loading' })}</Text>
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

  if (isLoading) {
    return <LoadingSpinner />;
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
        p="4"
      >
        {formatMessage({ id: 'playlists.title' })}
        <CreatePlaylistDialog onSave={addPlaylist} />
      </Heading>

      <Separator />

      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap="6"
        overflow="auto"
        padding="4"
      >
        {playlists?.map((playlist, idx) => (
          <Box
            key={playlist.name + idx}
            p="4"
            boxShadow="md"
            borderRadius="md"
            _hover={{
              boxShadow: 'lg',
              transform: 'scale(1.05)',
              transition: '0.2s',
            }}
          >
            <HStack>
              <Link
                _hover={{ textDecoration: 'none' }}
                gap="6"
                onClick={() => {
                  setSelectedPlaylist(playlist);
                  setShowDialog(true);
                }}
              >
                <Image
                  src="/playlist.jpg"
                  alt={playlist?.name}
                  borderRadius="full"
                  boxSize="50px"
                  mx="auto"
                />

                <Text fontWeight="bold" fontSize="md">
                  {playlist.name}
                </Text>

                <Text fontSize="small">
                  {formatMessage({ id: 'playlists.songs' })}
                  {playlist.songs.length}
                </Text>
              </Link>
            </HStack>
          </Box>
        ))}
      </Grid>

      {showDialog && (
        <PlaylistDialog
          playlist={selectedPlaylist}
          changeDialog={e => setShowDialog(e)}
        />
      )}
    </Box>
  );
}
