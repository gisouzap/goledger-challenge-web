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

  // const { mutate: addSong, isPending: isSaving } = useMutation({
  //   mutationFn: async newSong => {
  //     const res = await fetch('/api/songs/create', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         asset: [
  //           {
  //             ...newSong,
  //           },
  //         ],
  //       }),
  //     });

  //     if (!res.ok) {
  //       throw new Error('Erro ao adicionar musica');
  //     }
  //     return res.json();
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['songs']);
  //   },
  // });

  // const { mutate: editSong, isPending: isEditing } = useMutation({
  //   mutationFn: async updatedSong => {
  //     const res = await fetch('/api/songs/update', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         update: {
  //           ...updatedSong,
  //         },
  //       }),
  //     });

  //     if (!res.ok) {
  //       throw new Error('Erro ao editar música');
  //     }
  //     return res.json();
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['songs']);
  //   },
  // });

  // const { mutate: deleteAlbum, isPending: isDeleting } = useMutation({
  //   mutationFn: async key => {
  //     const res = await fetch('/api/albums/delete', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         key,
  //       }),
  //     });

  //     if (!res.ok) {
  //       throw new Error('Erro ao adicionar album');
  //     }
  //     return res.json();
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['albums']);
  //   },
  // });

  return {
    playlists: data || [],
    // isLoading: isSaving,
    // editSong,
    // error,
    // addSong,
    // deleteAlbum,
    isFetching,
  };
};