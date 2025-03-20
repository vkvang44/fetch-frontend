"use client";

import { fetchDogs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dog, SearchQueryParams } from "@/lib/models";
import PaginationFooter from "./pagination-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useFavoritesContext } from "../lib/favorites-provider";
import Image from "next/image";

function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 25 }).map((_, index) => (
        <CardHeader key={index}>
          <Skeleton className="h-40 w-full rounded" />
          <CardTitle>
            <Skeleton className="h-4 w-[150px]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-[200px]" />
          </CardDescription>
        </CardHeader>
      ))}
    </div>
  );
}

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (item: Dog) => void;
}

export function DogCard({ dog, isFavorite, onToggleFavorite }: DogCardProps) {
  return (
    <CardHeader>
      <div className="relative">
        <div className="relative h-72 w-full rounded-xl overflow-hidden">
          <Image
            src={dog.img}
            alt="new"
            sizes="sm"
            priority={true}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-2 right-2 rounded-2xl">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={() => onToggleFavorite(dog)}
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                isFavorite
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-muted-foreground"
              }`}
            />
            <span className="sr-only">
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
          </Button>
        </div>
      </div>
      <CardTitle>{dog.name}</CardTitle>
      <CardDescription>
        {dog.breed}
        <br />
        {dog.age} years old
        <br />
        Zip Code {dog.zip_code}
        <br />
      </CardDescription>
    </CardHeader>
  );
}

interface DogCardsProps {
  searchQueryParams: SearchQueryParams;
}

export default function DogCards({ searchQueryParams }: DogCardsProps) {
  const {
    data: dogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dogs", searchQueryParams],
    queryFn: () => fetchDogs(searchQueryParams),
    retry: 1,
  });

  const { favorites, onToggleFavorite } = useFavoritesContext();
  const ids = favorites.map((f) => f.id);

  return (
    <>
      {(isLoading || isError) && <SkeletonCards />}
      {dogs && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorite={ids.includes(dog.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
          <PaginationFooter />
        </>
      )}
    </>
  );
}
