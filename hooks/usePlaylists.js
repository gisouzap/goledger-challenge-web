import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchPlaylists = async () => {
  const res = await fetch('/api/playlists');
  if (!res.ok) {
    throw new Error('Erro ao buscar songs');
  }
  return res.json();
};

export const usePlaylists = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isFetching,
    error,
  } = useQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists,
  });

  const { mutate: addPlaylist, isPending: isSaving } = useMutation({
    mutationFn: async newPlaylist => {
      const res = await fetch('/api/playlists/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asset: [
            {
              ...newPlaylist,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar playlist');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
    },
  });

  // TODO: updatePlaylist
  // TODO: removePlaylist

  return {
    playlists: data || [],
    isLoading: isSaving,
    error,
    addPlaylist,
    isFetching,
  };
};
