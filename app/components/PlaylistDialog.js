'use client';

import {
  Image,
  DialogFooter,
  Button,
  Stack,
  VStack,
  Text,
  Separator,
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
import Song from './Song';
import { useIntl } from 'react-intl';

const PlaylistDialog = ({ playlist, changeDialog }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <DialogRoot
        placement="center"
        open
        onOpenChange={e => changeDialog(e.open)}
      >
        <DialogContent>
          <DialogHeader textAlign="center">
            <DialogTitle>Playlist - {playlist.name}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack>
              <Image
                src="/playlist.jpg"
                alt={playlist.name}
                width={150}
                borderRadius="full"
                boxSize="150px"
                mb={6}
              />

              <Text textAlign="center" fontSize="lg">
                {formatMessage({ id: 'playlists.songsAdded' })}
              </Text>
              <Separator />
              <Stack
                flex="1"
                overflow="auto"
                maxH={350}
                width="100%"
                direction={{ base: 'row', md: 'column' }}
                gap="5"
                p="6"
                boxSizing="border-box"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'linear-gradient(to bottom, #641ba3, #4a1772)',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#4a1772',
                  },
                }}
              >
                {playlist.songs.map((song, idx) => (
                  <Song item={song} key={song['@key'] + idx} />
                ))}
              </Stack>
            </VStack>
          </DialogBody>

          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button color="purple.700" variant="surface">
                {formatMessage({ id: 'delete' })}
              </Button>
            </DialogActionTrigger>
          </DialogFooter>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default PlaylistDialog;
