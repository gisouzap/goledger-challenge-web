import { useQuery } from '@tanstack/react-query';

export const useAlbum = albumId => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['album', albumId],
    queryFn: async () => {
      const res = await fetch(`/api/albums/${albumId}`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Erro ao buscar album');
      }
      return res.json();
    },
    enabled: !!albumId,
  });

  return {
    album: data || null,
    isLoading,
    error,
  };
};
