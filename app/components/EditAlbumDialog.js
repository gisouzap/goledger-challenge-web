'use client';

import { Button, Input, Stack } from '@chakra-ui/react';

import { useState } from 'react';

import { MdEdit } from 'react-icons/md';

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

const EditAlbumDialog = ({ album, onSave }) => {
  const [year, setYear] = useState(album.year);

  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <Button colorPalette="purple" variant="outline">
          <MdEdit />
          Editar Ano
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Ano </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="5">
            <Field label="Ano">
              <Input onChange={e => setYear(e.target.value)} />
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
            <Button
              colorPalette="purple"
              onClick={() => onSave({ ...album, year })}
            >
              Save
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default EditAlbumDialog;
