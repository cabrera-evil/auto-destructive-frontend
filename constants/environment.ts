import { QueryClient } from '@tanstack/react-query';

// NEXT ENVIRONMENT
export const BASE_API = process.env.NEXT_PUBLIC_API_URL;

// TANSTACK QUERY
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetches on tab switch
      refetchOnWindowFocus: true,
      // Ensures background retry on reconnect
      refetchOnReconnect: true,
      // Important: Refetch on mount if data is stale
      refetchOnMount: true,
      // Treat cache as stale
      staleTime: 0,
      // Cache time before garbage collection
      gcTime: 0,
      // Refetch intervals for polling
      refetchInterval: 2 * 1000,
      // Retry strategy
      retry: (failureCount: number, error: any) => {
        if (error?.response?.status === 404) return false;
        return failureCount < 3;
      },
      // Exponential backoff for retries
      retryDelay: (attemptIndex: number) =>
        Math.min(2 * 1000 ** attemptIndex, 30_000),
    },
  },
});
