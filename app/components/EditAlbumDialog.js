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
import { useIntl } from 'react-intl';

const EditAlbumDialog = ({ album, onSave }) => {
  const { formatMessage } = useIntl();
  const [year, setYear] = useState(album.year);

  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <Button colorPalette="purple" variant="outline">
          <MdEdit />
          {formatMessage({ id: 'album.editYear' })}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> {formatMessage({ id: 'album.editYear' })}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="5">
            <Field label={formatMessage({ id: 'albums.year' })}>
              <Input onChange={e => setYear(e.target.value)} />
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
            <Button
              colorPalette="purple"
              onClick={() => onSave({ ...album, year })}
            >
              {formatMessage({ id: 'save' })}
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default EditAlbumDialog;
