"use client";

import * as React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortBy() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedPosition = searchParams.get("sort") || "breed:asc";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", `${e.currentTarget.value}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Sort By</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="mobile-sort-breed-asc"
            name="mobile-sort"
            value="breed:asc"
            checked={selectedPosition === "breed:asc"}
            onChange={handleChange}
            className="h-4 w-4 text-primary"
          />
          <label
            htmlFor="mobile-sort-breed-asc"
            className="text-sm cursor-pointer"
          >
            Breed: A-Z
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="mobile-sort-breed-desc"
            name="mobile-sort"
            value="breed:desc"
            checked={selectedPosition === "breed:desc"}
            onChange={handleChange}
            className="h-4 w-4 text-primary"
          />
          <label
            htmlFor="mobile-sort-breed-desc"
            className="text-sm cursor-pointer"
          >
            Breed: Z-A
          </label>
        </div>
      </div>
    </div>
  );
}
