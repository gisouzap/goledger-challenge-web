import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchAlbums = async () => {
  const res = await fetch('/api/albums');
  if (!res.ok) {
    throw new Error('Erro ao buscar albums');
  }
  return res.json();
};

export const useAlbums = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isFetching,
    error,
  } = useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
  });

  const { mutate: addAlbum, isPending: isSaving } = useMutation({
    mutationFn: async newAlbum => {
      const res = await fetch('/api/albums/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asset: [
            {
              '@assetType': 'album',
              ...newAlbum,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar album');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['albums']);
    },
  });

  const { mutate: deleteAlbum, isPending: isDeleting } = useMutation({
    mutationFn: async key => {
      const res = await fetch('/api/albums/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar album');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['albums']);
    },
  });

  const { mutate: editAlbum, isPending: isEditing } = useMutation({
    mutationFn: async updatedAlbum => {
      const res = await fetch('/api/albums/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          update: {
            ...updatedAlbum,
          },
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar album');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['albums']);
    },
  });

  return {
    albums: data || [],
    isLoading: isSaving || isDeleting || isEditing,
    editAlbum,
    error,
    addAlbum,
    deleteAlbum,
    isFetching,
  };
};
