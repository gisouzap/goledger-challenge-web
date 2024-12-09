'use client';

import {
  Stack,
  Text,
  Image,
  HStack,
  DialogFooter,
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
import { useIntl } from 'react-intl';
import LoadingSpinner from './LoadingSpinner';

const SongDialog = ({ song, changeDialog }) => {
  const { formatMessage } = useIntl();

  const { album, isLoading } = useAlbum(song?.album['@key']);
  const { artist, isLoading: isLoadingArtist } = useArtist(
    album?.artist['@key']
  );

  return (
    <>
      {(isLoading || isLoadingArtist) && <LoadingSpinner />}

      <DialogRoot
        placement="center"
        open
        onOpenChange={e => changeDialog(e.open)}
      >
        <DialogContent>
          <DialogHeader textAlign="center">
            <DialogTitle>
              {formatMessage({ id: 'song.title' }, { song: song?.name })}
            </DialogTitle>
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
                  {formatMessage(
                    { id: 'song.album' },
                    { name: album?.name, year: album?.year }
                  )}
                </Text>
                <Text>
                  {formatMessage(
                    { id: 'song.artist' },
                    { name: artist?.name, country: artist?.country }
                  )}
                </Text>
              </Stack>
            </HStack>
          </DialogBody>

          <DialogFooter>
            <DialogActionTrigger asChild>
              {/* <Button>Excluir Música?</Button> */}
            </DialogActionTrigger>
          </DialogFooter>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default SongDialog;
