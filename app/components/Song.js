'use client';

import { Text, Image, HStack, Box } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { useAlbum } from '@/hooks/useAlbum';

import { useArtist } from '@/hooks/useArtist';
import { useSong } from '@/hooks/useSong';
import LoadingSpinner from './LoadingSpinner';

const Song = ({ item }) => {
  const { formatMessage } = useIntl();
  const { song, isLoading: isSongLoading } = useSong(item?.['@key']);
  const { album, isLoading: isAlbumLoading } = useAlbum(song?.album?.['@key']);
  const { artist, isLoading: isArtistLoading } = useArtist(
    album?.artist?.['@key']
  );

  if (isSongLoading || isAlbumLoading || isArtistLoading)
    return <LoadingSpinner />;

  if (!song || !album || !artist) {
    return null;
  }

  return (
    <Box>
      <Box
        p="4"
        boxShadow="md"
        borderRadius="md"
        borderWidth="thin"
        borderColor="purple.800"
      >
        <HStack alignItems="center" spacing="4">
          <Image
            src="/song.png"
            alt={song?.name}
            width={150}
            borderRadius="full"
            boxSize="30px"
          />
          <Box>
            <Text> {song?.name}</Text>
            <Text fontSize="smaller" fontWeight="light">
              {formatMessage(
                { id: 'song.album' },
                { name: album?.name, year: album?.year }
              )}
            </Text>
            <Text fontSize="smaller" fontWeight="light">
              {formatMessage(
                { id: 'song.artist' },
                { name: artist?.name, country: artist?.country }
              )}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default Song;
