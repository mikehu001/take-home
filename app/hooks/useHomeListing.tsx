'use client'
import { useQuery } from '@tanstack/react-query'
import type { HomeListingResponse } from '../api/homelisting/types'

async function fetchHomeListing(): Promise<HomeListingResponse> {
  const res = await fetch('/api/homelisting')
  if (!res.ok) throw new Error('Failed to fetch home listings')
  return res.json()
}

export function useHomeListing() {
  return useQuery<HomeListingResponse>({
    queryKey: ['homelisting'],
    queryFn: fetchHomeListing,
  })
}

