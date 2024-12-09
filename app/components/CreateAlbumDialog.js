'use client';

import { useState } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';

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
import { useArtists } from '@/hooks/useArtists';

import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';

const NEW_ALBUM = {
  name: '',
  year: '',
  artist: {
    '@assetType': 'artist',
    '@key': '',
  },
};

const CreateAlbumDialog = ({ onSave }) => {
  const { artists } = useArtists();

  const [newAlbum, setNewAlbum] = useState(NEW_ALBUM);

  const handleSave = () => {
    onSave(newAlbum);
    setNewAlbum(NEW_ALBUM);
  };

  const handleChange = value => {
    setNewAlbum({ ...newAlbum, ...value });
  };

  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <Button color="purple.500" variant="surface" fontFamily="Outfit">
          Adicionar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Álbum</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="5">
            <Field label="Nome">
              <Input
                value={newAlbum.name}
                onChange={e => handleChange({ name: e.target.value })}
              />
            </Field>

            <Field label="Ano">
              <Input
                value={newAlbum.year}
                onChange={e => handleChange({ year: e.target.value })}
              />
            </Field>

            <NativeSelectRoot
              size="xl"
              onChange={e =>
                handleChange({
                  artist: { ...newAlbum.artist, '@key': e.target.value },
                })
              }
            >
              <NativeSelectField placeholder="Select option">
                {artists.map(artist => (
                  <option
                    style={{ backgroundColor: '#171717' }}
                    value={artist['@key']}
                    key={artist['@key']}
                  >
                    {artist.name}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette="purple" variant="outline">
              Cancel
            </Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button colorPalette="purple" onClick={handleSave}>
              Save
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateAlbumDialog;
