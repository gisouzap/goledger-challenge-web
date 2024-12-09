'use client';

import { useState } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

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
  const { formatMessage } = useIntl();
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
          {formatMessage({ id: 'add' })}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{formatMessage({ id: 'albums.createNew' })}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="5">
            <Field label={formatMessage({ id: 'albums.name' })}>
              <Input
                value={newAlbum.name}
                onChange={e => handleChange({ name: e.target.value })}
              />
            </Field>

            <Field label={formatMessage({ id: 'albums.year' })}>
              <Input
                value={newAlbum.year}
                onChange={e => handleChange({ year: e.target.value })}
              />
            </Field>

            <Field label={formatMessage({ id: 'albums.artist' })}>
              <NativeSelectRoot
                size="xl"
                onChange={e =>
                  handleChange({
                    artist: { ...newAlbum.artist, '@key': e.target.value },
                  })
                }
              >
                <NativeSelectField
                  placeholder={formatMessage({ id: 'albums.artistSelect' })}
                >
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

export default CreateAlbumDialog;
