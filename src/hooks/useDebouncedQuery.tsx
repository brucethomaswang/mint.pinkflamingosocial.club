import { useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { QueryKey, QueryFunction, UseQueryOptions } from '@tanstack/react-query'

interface UseDebouncedQueryOptions<TQueryData> extends UseQueryOptions<TQueryData> {
  queryFn: QueryFunction<TQueryData>
}

export function useDebouncedQuery<TQueryData>(
  { queryFn, queryKey, ...remainingUseQueryOptions }: UseDebouncedQueryOptions<TQueryData>,
  debounceMs: number
) {
  const timeoutRef = useRef<number>()
  const queryClient = useQueryClient()
  const previousQueryKeyRef = useRef<QueryKey>()

  return useQuery({
    ...remainingUseQueryOptions,
    queryKey,
    queryFn: (queryFnContext) => {
      if (previousQueryKeyRef.current === queryKey) {
        return queryFn(queryFnContext)
      }

      if (previousQueryKeyRef.current) {
        queryClient.cancelQueries({ queryKey: previousQueryKeyRef.current })
      }

      previousQueryKeyRef.current = queryKey
      window.clearTimeout(timeoutRef.current)

      return new Promise((resolve, reject) => {
        timeoutRef.current = window.setTimeout(async () => {
          try {
            const result = await queryFn(queryFnContext)

            previousQueryKeyRef.current = undefined
            resolve(result as TQueryData)
          } catch (error) {
            reject(error)
          }
        }, debounceMs)
      })
    }
  })
}
