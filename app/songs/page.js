'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Link,
  Stack,
  Separator,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { useSongs } from '@/hooks/useSongs';
import SongDialog from '../components/SongDialog';
import CreateSongDialog from '../components/CreateSongDialog';

export default function SonsPage() {
  const { formatMessage } = useIntl();

  const { songs, addSong, editSong } = useSongs();

  const [selectedSong, setSelectedSong] = useState();
  const [showDialog, setShowDialog] = useState(false);

  // if (isFetching) {
  //   return (
  //     <Box textAlign="center" mt="10">
  //       <Spinner size="xl" />
  //       <Text mt="4">Buscando por albuns</Text>
  //     </Box>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Box textAlign="center" mt="10">
  //       <Text color="red.500">{error}</Text>
  //     </Box>
  //   );
  // }

  return (
    <Box
      boxSizing="border-box"
      height="100%"
      display="flex"
      flexDirection="column"
      gap="5"
    >
      <Heading as="h1" size="xl" mt="6">
        Músicas
        <CreateSongDialog onSave={addSong} />
      </Heading>

      <Separator />

      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap="6"
        overflow="auto"
        padding="4"
      >
        {songs?.map((song, idx) => (
          <Box
            key={song.name + idx}
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
                  setSelectedSong(song);
                  setShowDialog(true);
                }}
              >
                <Image
                  src="/song.png"
                  alt={song?.name}
                  borderRadius="full"
                  boxSize="50px"
                  mx="auto"
                />

                <Text fontWeight="bold" fontSize="md">
                  {song.name}
                </Text>
              </Link>
            </HStack>
          </Box>
        ))}
      </Grid>

      {showDialog && (
        <SongDialog
          song={selectedSong}
          changeDialog={e => setShowDialog(e)}
          onSave={editSong}
        />
      )}
    </Box>
  );
}