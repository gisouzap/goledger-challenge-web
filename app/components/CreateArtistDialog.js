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

const NEW_ARTIST = {
  name: '',
  country: '',
  '@assetType': 'artist',
};

const CreateArtistDialog = ({ onSave }) => {
  const [newArtist, setNewArtist] = useState(NEW_ARTIST);

  const handleSave = () => {
    onSave(newArtist);
    setNewArtist(NEW_ARTIST);
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
          <DialogTitle>Criar Novo Artista</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="5">
            <Field label="Nome">
              <Input
                defaultValue={newArtist.name}
                onChange={e =>
                  setNewArtist({ ...newArtist, name: e.target.value })
                }
              />
            </Field>

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

export default CreateArtistDialog;
