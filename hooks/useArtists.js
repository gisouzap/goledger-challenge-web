import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchArtists = async () => {
  const res = await fetch('/api/artists');
  if (!res.ok) {
    throw new Error('Erro ao buscar artistas');
  }
  return res.json();
};

export const useArtists = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isFetching,
    error,
  } = useQuery({
    queryKey: ['artists'],
    queryFn: fetchArtists,
  });

  const { mutate: addArtist, isPending: isSaving } = useMutation({
    mutationFn: async newArtist => {
      const res = await fetch('/api/artists/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asset: [
            {
              '@assetType': 'artist',
              ...newArtist,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar artista');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
    },
  });

  const { mutate: deleteArtist, isPending: isDeleting } = useMutation({
    mutationFn: async key => {
      const res = await fetch('/api/artists/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar artista');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
    },
  });

  const { mutate: editArtist, isPending: isEditing } = useMutation({
    mutationFn: async updatedArtist => {
      const res = await fetch('/api/artists/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          update: {
            ...updatedArtist,
          },
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar artista');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
    },
  });

  const sortedArtists = data
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    artists: sortedArtists || [],
    isLoading: isSaving || isDeleting || isEditing,
    editArtist,
    error,
    addArtist,
    deleteArtist,
    isFetching,
  };
};
