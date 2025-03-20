"use client";

import * as React from "react";

import MultipleSelector, { Option } from "./ui/multiple-selector";
import { useQuery } from "@tanstack/react-query";
import { getDogBreeds } from "@/lib/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BreedsFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedOptions = searchParams.getAll("breeds").map((b) => ({
    label: b,
    value: b,
  }));

  const { data } = useQuery({
    queryKey: ["breeds"],
    queryFn: getDogBreeds,
    select: (data) => {
      return data?.map((breed) => ({
        label: breed,
        value: breed,
      })) as Option[];
    },
    retry: 1,
  });

  const handleValueChange = (value: Option[]) => {
    const params = new URLSearchParams(searchParams);
    params.delete("breeds");
    if (value.length > 0) {
      value.forEach((option) => {
        params.append("breeds", option.value);
      });
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Breeds</h3>
      <div className="space-y-2">
        <MultipleSelector
          options={data}
          placeholder="Search for breed"
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No breeds found
            </p>
          }
          onChange={handleValueChange}
          value={selectedOptions}
        />
      </div>
    </div>
  );
}
