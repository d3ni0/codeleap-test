import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsAPI } from '../services/api';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await postsAPI.getAll();
      // Sort by newest first
      const posts = data.results || [];
      return posts.sort((a, b) => 
        new Date(b.created_datetime) - new Date(a.created_datetime)
      );
    },
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
