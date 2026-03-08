import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsAPI } from '../services/api';

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await postsAPI.getAll(`?limit=10&offset=${pageParam}`);
      return {
        results: data.results || [],
        count: data.count || 0,
        next: data.next,
        previous: data.previous,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.reduce((acc, page) => acc + page.results.length, 0);
      return totalFetched < lastPage.count ? totalFetched : undefined;
    },
    initialPageParam: 0,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => postsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
};
