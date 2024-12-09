import { useQuery } from '@tanstack/react-query';

export const useArtist = artistId => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: async () => {
      const res = await fetch(`/api/artists/${artistId}`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Erro ao buscar artista');
      }
      return res.json();
    },
    enabled: !!artistId,
  });

  return {
    artist: data || null,
    isLoading,
    error,
  };
};
