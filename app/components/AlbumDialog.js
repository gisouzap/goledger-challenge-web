'use client';

import { useIntl } from 'react-intl';

import {
  Stack,
  Text,
  Image,
  HStack,
  DialogFooter,
  Spinner,
  Box,
} from '@chakra-ui/react';

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';

import EditAlbumDialog from './EditAlbumDialog';
import { useArtist } from '@/hooks/useArtist';

const AlbumDialog = ({ album, changeDialog, onSave }) => {
  const { formatMessage } = useIntl();

  const { artist, isLoading } = useArtist(album.artist['@key']);

  return (
    <>
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
          zIndex="1500"
        >
          <Spinner size="xl" opacity={1} />
        </Box>
      )}

      <DialogRoot
        placement="center"
        open
        onOpenChange={e => changeDialog(e.open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Álbum - {album.name}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <HStack
              alignContent="center"
              display="flex"
              width="100%"
              flexDirection="row"
              gap="6"
            >
              <Image
                src="/album.png"
                alt={album.name}
                width={150}
                borderRadius="full"
                boxSize="150px"
              />

              <Stack gap="5">
                <Text fontSize="lg" fontWeight="bold">
                  {album.name}
                </Text>
                <Text>
                  {formatMessage({ id: 'album.year' }, { year: album.year })}
                </Text>
                <Text>
                  {formatMessage(
                    { id: 'album.artist' },
                    { artist: artist?.name }
                  )}
                </Text>
                <Text>
                  {formatMessage(
                    { id: 'album.country' },
                    { country: artist?.country }
                  )}
                </Text>
              </Stack>
            </HStack>
          </DialogBody>

          <DialogFooter>
            <DialogActionTrigger asChild>
              <EditAlbumDialog
                onSave={value => {
                  onSave(value);
                  changeDialog(false);
                }}
                album={album}
              />
            </DialogActionTrigger>
          </DialogFooter>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default AlbumDialog;
