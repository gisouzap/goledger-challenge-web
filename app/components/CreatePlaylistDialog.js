'use client';

import { useState } from 'react';
import { Button, Input, Stack, Text } from '@chakra-ui/react';

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Field } from '@/components/ui/field';

import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';

import { useSongs } from '@/hooks/useSongs';
import Song from './Song';

const NEW_PLAYLIST = {
  name: '',
  '@assetType': 'playlist',
  songs: [],
};

const CreatePlaylistDialog = ({ onSave }) => {
  const { songs } = useSongs();

  const [newPlaylist, setPlaylist] = useState(NEW_PLAYLIST);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [newSong, setNewSong] = useState();

  const handleSave = () => {
    onSave({ ...newPlaylist, songs: [...selectedSongs], private: true });

    clear();
  };

  const clear = () => {
    setPlaylist(NEW_PLAYLIST);
    setSelectedSongs([]);
    setNewSong(null);
  };

  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <Button color="purple.500" variant="surface" fontFamily="Outfit">
          Criar Nova Playlist
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Playlist</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="5">
            <Field label="Nome da PlayList">
              <Input
                value={newPlaylist.name}
                onChange={e =>
                  setPlaylist({ ...newPlaylist, name: e.target.value })
                }
              />
            </Field>

            <NativeSelectRoot
              size="xl"
              onChange={e =>
                setNewSong({
                  '@assetType': 'song',
                  '@key': e.target.value,
                })
              }
            >
              <NativeSelectField placeholder="Select one music">
                {songs?.map((song, idx) => (
                  <option
                    value={song['@key']}
                    key={song['@key'] + idx}
                    style={{ backgroundColor: '#171717' }}
                  >
                    {song.name}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>

            <Button
              onClick={() => {
                setSelectedSongs([...selectedSongs, newSong]);
                document.querySelector('select').value = '';
              }}
            >
              Adicionar
            </Button>
          </Stack>

          {selectedSongs.length > 0 && (
            <Text mt="6" textAlign="center">
              Músicas Adicionadas
            </Text>
          )}

          <Stack
            mt="5"
            gap="5"
            flex="1"
            overflow="auto"
            maxH={250}
            width="100%"
            direction={{ base: 'row', md: 'column' }}
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
            {selectedSongs.map((song, idx) => (
              <Song item={song} key={JSON.stringify(selectedSongs)} />
            ))}
          </Stack>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette="purple" variant="outline" onClick={clear}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button colorPalette="purple" onClick={handleSave}>
              Save
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default CreatePlaylistDialog;
