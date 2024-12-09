'use client';

import { Text, Image, HStack, Box } from '@chakra-ui/react';

import { useAlbum } from '@/hooks/useAlbum';

import { useArtist } from '@/hooks/useArtist';
import { useSong } from '@/hooks/useSong';
import LoadingSpinner from './LoadingSpinner';

const Song = ({ item }) => {
  const { song, isLoading: isSongLoading } = useSong(item['@key']);
  const { album, isLoading: isAlbumLoading } = useAlbum(song?.album['@key']);
  const { artist, isLoading: isArtistLoading } = useArtist(
    album?.artist['@key']
  );

  if (item == []) {
    return <Text>Não há músicas nessa playlist ainda.</Text>;
  }

  return (
    <Box>
      {(isSongLoading || isAlbumLoading || isArtistLoading) && (
        <LoadingSpinner />
      )}

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
              Álbum: {album?.name}, {album?.year}
            </Text>
            <Text fontSize="smaller" fontWeight="light">
              Artista: {artist?.name}, {artist?.country}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default Song;
