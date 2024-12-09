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
  Separator,
  Stack,
} from '@chakra-ui/react';

import { useIntl } from 'react-intl';
import { useAlbums } from '@/hooks/useAlbums';

import AlbumDialog from '../components/AlbumDialog';
import CreateAlbumDialog from '../components/CreateAlbumDialog';
import LoadingSpinner from '../components/LoadingSpinner';

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
        <Text mt="4">{formatMessage({ id: 'albums.loading' })}</Text>
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
        p="4"
      >
        {formatMessage({ id: 'albums.title' })}
        <CreateAlbumDialog onSave={addAlbum} />
      </Heading>

      <Separator />

      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap="6"
        overflow="auto"
        p="4"
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
              height="100%"
            >
              <Stack
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                boxSizing="border-box"
                height="100%"
              >
                <Text fontWeight="bold" fontSize="lg">
                  {album.name}
                </Text>
                <Image
                  src="/album.png"
                  alt={album.name}
                  borderRadius="full"
                  width={100}
                  height={100}
                  mx="auto"
                />
                <Text fontSize="sm" color="gray.500">
                  {album.year}
                </Text>
              </Stack>
            </Link>
          </Box>
        ))}
      </Grid>

      {isLoading && <LoadingSpinner />}

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
