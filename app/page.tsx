"use client";

import { useState } from "react";
import { useInfiniteHomeListing } from "./hooks/useInfiniteHomeListing";

export default function Home() {
  const [perPage, setPerPage] = useState<number>(10);
  const [actionPage, setActionPage] = useState<number>(10);
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteHomeListing(actionPage);

  const houses = data?.pages.flatMap((page) => page.houses) ?? [];

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error)
    return <div className="p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Home Listings
        </h1>
        <ul className="flex flex-col gap-4">
          {houses.map((house) => (
            <li
              key={house.id}
              className="flex flex-col gap-1 rounded-xl border border-black/[.08] bg-white p-4 sm:p-6 dark:border-white/[.145] dark:bg-zinc-900"
            >
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <img
                  src={house.photoURL}
                  alt={`Photo of ${house.address}`}
                  className="mt-2 h-48 w-full rounded-md object-cover sm:mt-4 sm:w-[300px]"
                />
                <div className="w-full">
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
        <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto">
        <div className="mt-2 flex items-center justify-center gap-3">
          <label
            htmlFor="perPage"
            className="dark:text-zinc-300 font-medium"
          >
           Load
          </label>
          <input
            id="perPage"
            type="number"
            min={1}
            value={perPage}
            onChange={(e) => {
              const value = Number(e.target.value);
              setPerPage(Number.isNaN(value) || value < 1 ? 10 : value);
            }}
            className="w-24 rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/[.12] dark:border-white/[.145] dark:bg-zinc-900 dark:focus:ring-white/[.2]"
          />
        </div>
        {hasNextPage && (
          <button
            onClick={() => {
              setActionPage(houses.length + perPage);
              fetchNextPage();
            }}
            disabled={isFetchingNextPage}
            className="mt-2 w-full self-center rounded-full border border-black/[.08] px-6 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] disabled:opacity-50 sm:w-auto dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            {isFetchingNextPage ? "Loading..." : `More`}
          </button>
        )}
        </div>
      </main>
    </div>
  );
}
