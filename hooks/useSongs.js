import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchSongs = async () => {
  const res = await fetch('/api/songs');
  if (!res.ok) {
    throw new Error('Erro ao buscar songs');
  }
  return res.json();
};

export const useSongs = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isFetching,
    error,
  } = useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongs,
  });

  const { mutate: addSong, isPending: isSaving } = useMutation({
    mutationFn: async newSong => {
      const res = await fetch('/api/songs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asset: [
            {
              ...newSong,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar musica');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['songs']);
    },
  });

  const { mutate: editSong, isPending: isEditing } = useMutation({
    mutationFn: async updatedSong => {
      const res = await fetch('/api/songs/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          update: {
            ...updatedSong,
          },
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao editar música');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['songs']);
    },
  });

  return {
    songs: data || [],
    isLoading: isSaving || isEditing,
    editSong,
    error,
    addSong,

    isFetching,
  };
};
