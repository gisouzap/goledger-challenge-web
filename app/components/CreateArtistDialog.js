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
import { useIntl } from 'react-intl';

const NEW_ARTIST = {
  name: '',
  country: '',
  '@assetType': 'artist',
};

const CreateArtistDialog = ({ onSave }) => {
  const { formatMessage } = useIntl();

  const [newArtist, setNewArtist] = useState(NEW_ARTIST);

  const handleSave = () => {
    onSave(newArtist);
    setNewArtist(NEW_ARTIST);
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
          <DialogTitle>
            {formatMessage({ id: 'artists.createNew' })}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="5">
            <Field label={formatMessage({ id: 'artist.name' })}>
              <Input
                defaultValue={newArtist.name}
                onChange={e =>
                  setNewArtist({ ...newArtist, name: e.target.value })
                }
              />
            </Field>

            <Field label={formatMessage({ id: 'artist.country' })}>
              <Input
                defaultValue={newArtist.country}
                onChange={e =>
                  setNewArtist({ ...newArtist, country: e.target.value })
                }
              />
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

export default CreateArtistDialog;
