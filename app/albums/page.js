'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Spinner,
  Text,
  Image,
  Link,
  Stack,
  Separator,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import AlbumDialog from '../components/AlbumDialog';
import CreateAlbumDialog from '../components/CreateAlbumDialog';
import { useAlbums } from '@/hooks/useAlbums';

export default function AlbumsPage() {
  const { formatMessage } = useIntl();

  const [showDialog, setShowDialog] = useState(false);

  const [selectedAlbum, setSelectedAlbum] = useState();

  const { albums, isFetching, editAlbum, isLoading, addAlbum, error } =
    useAlbums();

  if (isFetching) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="xl" />
        <Text mt="4">Buscando por albuns</Text>
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
      <Heading as="h1" size="xl" mt="6">
        Álbuns
        <CreateAlbumDialog onSave={addAlbum} />
      </Heading>

      <Separator />

      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap="6"
        overflow="auto"
      >
        {albums.map((album, idx) => (
          <Box
            key={album.name + idx}
            p="4"
            boxShadow="md"
            borderRadius="md"
            textAlign="center"
            _hover={{
              boxShadow: 'lg',
              transform: 'scale(1.05)',
              transition: '0.2s',
            }}
          >
            <Link
              onClick={() => {
                setSelectedAlbum(album);
                setShowDialog(true);
              }}
              _hover={{ textDecoration: 'none' }}
            >
              <Stack>
                <Text fontWeight="bold" fontSize="lg">
                  {album.name}
                </Text>
                <Image
                  src="/album.png"
                  alt={album.name}
                  borderRadius="full"
                  boxSize="100px"
                  mx="auto"
                  mb="4"
                />
                <Text fontSize="sm" color="gray.500">
                  {album.year}
                </Text>
              </Stack>
            </Link>
          </Box>
        ))}
      </Grid>

      {isLoading && (
        <Box
          position="absolute"
          background="black"
          width="100%"
          height="100%"
          top={0}
          left={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity={0.8}
        >
          <Spinner size="xl" opacity={1} />
        </Box>
      )}

      {showDialog && (
        <AlbumDialog
          album={selectedAlbum}
          open={showDialog}
          changeDialog={value => setShowDialog(value)}
          onSave={editAlbum}
        />
      )}
    </Box>
  );
}
