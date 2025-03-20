import { PawPrint } from "lucide-react";
import { DogCard } from "./dog-cards";
import { useFavoritesContext } from "../lib/favorites-provider";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getMatchs } from "@/lib/api";
import { Dog } from "@/lib/models";
import { useEffect, useState } from "react";
import Image from "next/image";

export function MatchLoading() {
  return (
    <div className="h-full flex items-center justify-center ">
      <div className="a flex flex-col items-center justify-center gap-6 text-center">
        <div className="relative animate-pulse">
          <PawPrint className="h-20 w-20 text-rose-500 fill-rose-500" />
          <div className="absolute inset-0 -z-10  rounded-full  blur-xl"></div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-rose-700">
            Finding your furrever friend
          </h3>
        </div>

        <div className="flex gap-2">
          <div className="h-3 w-3 dot-1 rounded-full bg-rose-500"></div>
          <div className="h-3 w-3 dot-2 rounded-full bg-rose-500"></div>
          <div className="h-3 w-3 dot-3 rounded-full bg-rose-500"></div>
        </div>
      </div>
    </div>
  );
}

interface MatchProps {
  favorites: Dog[];
}

function Match({ favorites }: MatchProps) {
  const ids = favorites.map((f) => f.id);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const { data: id, refetch } = useQuery({
    queryKey: ["match"],
    queryFn: () => getMatchs(ids),
    retry: 1,
  });

  const dog = favorites.find((f) => f.id == id?.match);

  return (
    <div className="px-8 container mx-auto h-[450px]">
      {isVisible ? (
        <MatchLoading />
      ) : (
        <>
          <CardHeader className="p-4 ">
            <div className="relative h-72 w-full rounded-xl overflow-hidden">
              <Image
                src={dog!.img}
                alt="new"
                sizes="sm"
                priority={true}
                fill
                className="object-contain"
              />
            </div>
            <CardTitle className="text-center">{dog?.name}</CardTitle>
            <CardDescription className="text-center">
              {dog?.breed}
              <br />
              {dog?.age} years old
              <br />
              Zip Code {dog?.zip_code}
              <br />
            </CardDescription>
          </CardHeader>
          <Button
            className="w-full"
            onClick={() => {
              setIsVisible(true);
              refetch();
            }}
          >
            Match!
          </Button>
        </>
      )}
    </div>
  );
}

export default function FindMatch() {
  const { favorites, onToggleFavorite } = useFavoritesContext();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <NavigationMenuLink
            className={`${navigationMenuTriggerStyle()} cursor-pointer`}
          >
            <div className="flex items-center space-x-2">
              <div>Find a Match!</div>
              {favorites.length > 0 && (
                <Badge variant="destructive" className="rounded-full">
                  {favorites.length}
                </Badge>
              )}
            </div>
          </NavigationMenuLink>
        </DialogTrigger>
        <DialogContent className="max-h-[400px] sm:max-w-[800px] sm:max-h-[700px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Find your match!</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="favorites">
            <TabsList className="grid w-full grid-cols-2 ">
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="your-match">Your Match</TabsTrigger>
            </TabsList>
            <TabsContent value="favorites" className="min-h-[400px]">
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favorites.map((f) => (
                    <DogCard
                      key={f.id}
                      isFavorite={favorites.includes(f)}
                      dog={f}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  Search for your favorites dogs and heart them to see them
                  here.
                </div>
              )}
            </TabsContent>
            <TabsContent value="your-match" className="min-h-[400px]">
              {favorites.length > 0 ? (
                <Match favorites={favorites} />
              ) : (
                <div className="p-4 text-center">
                  Search for your favorites dogs and heart them to see them
                  here.
                </div>
              )}
            </TabsContent>
          </Tabs>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
