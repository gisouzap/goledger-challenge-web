'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Button,
  HStack,
  Separator,
  IconButton,
} from '@chakra-ui/react';

import { Tooltip } from '../components/Tooltip';
import Stack from '../components/Stack';

import { MdEdit, MdDelete } from 'react-icons/md';

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await fetch('/api/artists');
        const data = await response.json();
        if (response.ok) {
          setArtists(data);
        } else {
          throw new Error(data.error || 'Failed to load artists.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []);

  function formatDate(dateString) {
    if (!dateString) return 'Data não informada';

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  if (loading) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="xl" />
        <Text mt="4">Buscando por artistas...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="10">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box
      boxSizing="border-box"
      height="100%"
      display="flex"
      flexDirection="column"
      gap="5"
    >
      <Heading
        as="h1"
        size="xl"
        mt="6"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        Artistas
        <Button color="purple.500" variant="surface" fontFamily="Outfit">
          Adicionar
        </Button>
      </Heading>

      <Separator />
      <Stack>
        {artists.map(artist => (
          <Box
            key={artist['@key']}
            p="4"
            boxShadow="md"
            borderRadius="md"
            bg="purple.800"
          >
            <Heading
              as="h2"
              size="md"
              display="flex"
              justifyContent="space-between"
            >
              {artist.name}
              <HStack spacing="2">
                <Tooltip label="Editar">
                  <IconButton variant="outline" aria-label="Editar">
                    <MdEdit />
                  </IconButton>
                </Tooltip>

                <Tooltip label="Excluir">
                  <IconButton variant="outline" aria-label="Excluir">
                    <MdDelete />
                  </IconButton>
                </Tooltip>
              </HStack>
            </Heading>
            <Text>País: {artist.country || 'Não informado'}</Text>
            <Text fontSize="small">
              Última Atualização: {formatDate(artist['@lastUpdated'])} por{' '}
              {artist['@lastTouchBy']}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
