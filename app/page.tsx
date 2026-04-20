"use client";

import { useState } from "react";
import { useInfiniteHomeListing } from "./hooks/useInfiniteHomeListing";

export default function Home() {
  const [perPage, setPerPage] = useState(5);
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteHomeListing(perPage);

  const houses = data?.pages.flatMap((page) => page.houses) ?? [];


  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error)
    return <div className="p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col gap-6 py-16 px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Home Listings
        </h1>
        <div className="flex items-center gap-4">
          <label htmlFor="perPage" className="text-sm text-zinc-700 dark:text-zinc-300">
            Listings per page:
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/[.12] dark:border-white/[.145] dark:bg-zinc-900 dark:focus:ring-white/[.2]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <ul className="flex flex-col gap-4">
          {houses.map((house) => (
            <li
              key={house.id}
              className="flex flex-col gap-1 rounded-xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-zinc-900"
            >
              <div className="flex items-center gap-6">
                <img
                  src={house.photoURL}
                  alt={`Photo of ${house.address}`}
                  className="mt-4 h-48 w-[300px] object-cover rounded-md"
                />
                <div>
                  <div className="text-lg font-medium text-black dark:text-zinc-50">
                    {house.address}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400">
                    Owner: {house.homeowner}
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300">
                    ${house.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="self-center rounded-full border border-black/[.08] px-6 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] disabled:opacity-50 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </main>
    </div>
  );
}
