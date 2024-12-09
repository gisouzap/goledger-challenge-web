'use client';

import {
  Stack,
  Text,
  Image,
  HStack,
  DialogFooter,
  Spinner,
  Box,
  Button,
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
import { useAlbum } from '@/hooks/useAlbum';

import { useArtist } from '@/hooks/useArtist';

const SongDialog = ({ song, changeDialog, onSave }) => {
  const { album, isLoading } = useAlbum(song.album['@key']);
  const { artist, isLoading: isLoadingArtist } = useArtist(
    album?.artist['@key']
  );

  return (
    <>
      {(isLoading || isLoadingArtist) && (
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
          <DialogHeader textAlign="center">
            <DialogTitle>Música - {song.name}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <HStack gap="5">
              <Image
                src="/song.png"
                alt={song.name}
                width={150}
                borderRadius="full"
                boxSize="150px"
              />

              <Stack gap="5">
                <Text>
                  Álbum: {album?.name}, {album?.year}
                </Text>
                <Text>
                  Artista: {artist?.name}, {artist?.country}
                </Text>
              </Stack>
            </HStack>
          </DialogBody>

          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button>Excluir Música?</Button>
            </DialogActionTrigger>
          </DialogFooter>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default SongDialog;
