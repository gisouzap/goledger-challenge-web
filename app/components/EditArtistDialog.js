'use client';

import { useState } from 'react';
import { Button, IconButton, Input, Stack } from '@chakra-ui/react';

import { MdEdit } from 'react-icons/md';
import { Tooltip } from './Tooltip';

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

const BLANK_ARTIST = {
  '@assetType': 'artist',
  '@key': '',
  country: '',
};

const EditArtistDialog = ({ artist, onSave }) => {
  const [newArtist, setNewArtist] = useState(artist);

  const handleSave = () => {
    onSave(newArtist);

    setNewArtist(BLANK_ARTIST);
  };

  return (
    <DialogRoot placement="center">
      <Tooltip content="Editar">
        <DialogTrigger asChild>
          <IconButton variant="outline" aria-label="Editar">
            <MdEdit />
          </IconButton>
        </DialogTrigger>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Artista - {artist.name}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="5">
            <Field label="País">
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

export default EditArtistDialog;
