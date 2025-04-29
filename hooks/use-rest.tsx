import { queryClient } from '@/constants/environment';
import { create, list, remove, update } from '@/lib/rest';
import { RequestParams } from '@/types/rest.type';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

/**
 * Custom hook for pre-fetching data (SSR)
 */
export async function usePrefetchData(requestParams: RequestParams) {
  await queryClient.prefetchQuery({
    queryKey: [requestParams.path, requestParams],
    queryFn: async () => list(requestParams),
  });
}

/**
 * Custom hook for GET requests (list method)
 */
export function useFetchData<T>(
  requestParams: RequestParams,
  options?: UseQueryOptions<T, unknown, T, [string, Record<string, any>?]>,
) {
  return useQuery<T, unknown, T, [string, Record<string, any>?]>({
    queryKey: [requestParams.path, requestParams], // Query key based on path and params
    // @ts-expect-error API Response type is not compatible with T
    queryFn: async () => list(requestParams),
    ...options,
  });
}

/**
 * Custom hook for POST requests (create method)
 */
export function useCreateData<T>(
  options?: UseMutationOptions<T, unknown, RequestParams, unknown>,
) {
  return useMutation<T, unknown, RequestParams, unknown>({
    mutationFn: create,
    ...options,
  });
}

/**
 * Custom hook for PUT requests (update method)
 */
export function useUpdateData<T>(
  options?: UseMutationOptions<T, unknown, RequestParams, unknown>,
) {
  return useMutation<T, unknown, RequestParams, unknown>({
    mutationFn: update,
    ...options,
  });
}

/**
 * Custom hook for DELETE requests (delete method)
 */
export function useDeleteData<T>(
  options?: UseMutationOptions<T, unknown, RequestParams, unknown>,
) {
  return useMutation<T, unknown, RequestParams, unknown>({
    mutationFn: remove,
    ...options,
  });
}
