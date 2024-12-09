import { useQuery } from '@tanstack/react-query';

export const useSong = songId => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['song', songId],
    queryFn: async () => {
      const res = await fetch(`/api/songs/${songId}`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Erro ao buscar música');
      }
      return res.json();
    },
    enabled: !!songId,
  });

  return {
    song: data || null,
    isLoading,
    error,
  };
};
