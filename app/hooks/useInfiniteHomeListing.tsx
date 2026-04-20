'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { InfiniteData } from '@tanstack/react-query'
import type { HomeListingResponse } from '../api/homelisting/types'

async function fetchHomeListing({ pageParam, perPageParam }: { pageParam: number, perPageParam?: number }): Promise<HomeListingResponse> {
  const res = await fetch(`/api/homelisting?page=${pageParam}&per_page=${perPageParam}`)
  if (!res.ok) throw new Error('Failed to fetch home listings')
  return res.json()
}

export function useInfiniteHomeListing(perPage: number) {
  return useInfiniteQuery<HomeListingResponse, Error, InfiniteData<HomeListingResponse>, ['homelisting', number], number>({
    queryKey: ['homelisting', perPage],
    queryFn: ({ pageParam }) => fetchHomeListing({ pageParam, perPageParam: perPage }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.houses.length > 0 ? lastPageParam + 1 : undefined,
  })
}

