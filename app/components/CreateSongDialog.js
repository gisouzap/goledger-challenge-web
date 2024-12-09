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

import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import { useAlbums } from '@/hooks/useAlbums';
import { useIntl } from 'react-intl';

const NEW_SONG = {
  name: '',
  '@assetType': 'song',
  album: {
    '@assetType': 'album',
    '@key': '',
  },
};

const CreateSongDialog = ({ onSave }) => {
  const { formatMessage } = useIntl();

  const { albums } = useAlbums();

  const [newSong, setNewSong] = useState(NEW_SONG);

  const handleSave = () => {
    onSave(newSong);
    setNewSong(NEW_SONG);
  };

  const handleChange = value => {
    setNewSong({ ...newSong, ...value });
  };

  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <Button color="purple.500" variant="surface" fontFamily="Outfit">
          {formatMessage({ id: 'add' })}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Música</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="5">
            <Field label={formatMessage({ id: 'songs.name' })}>
              <Input
                value={newSong.name}
                onChange={e => handleChange({ name: e.target.value })}
              />
            </Field>

            <Field label={formatMessage({ id: 'songs.album' })}>
              <NativeSelectRoot
                size="xl"
                onChange={e =>
                  handleChange({
                    album: { ...newSong.album, '@key': e.target.value },
                  })
                }
              >
                <NativeSelectField
                  placeholder={formatMessage({ id: 'songs.selectAlbum' })}
                >
                  {albums?.map(album => (
                    <option
                      value={album['@key']}
                      key={album['@key']}
                      style={{ backgroundColor: '#171717' }}
                    >
                      {album.name}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette="purple" variant="outline">
              {formatMessage({ id: 'cancel' })}
            </Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button colorPalette="purple" onClick={handleSave}>
              {formatMessage({ id: 'save' })}
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateSongDialog;
