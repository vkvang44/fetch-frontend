"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Filter } from "lucide-react";
import BreedsFilter from "./breeds-filter";
import SortBy from "./sort-by";

export default function FilterSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-72 border-r p-6 shrink-0">
        <div className="flex flex-col gap-6">
          <SortBy />
          <Separator />
          <BreedsFilter />
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-4 right-4 z-40 md:hidden flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-4">
          <div className="flex flex-col gap-6 ">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <SortBy />
            <Separator />
            <BreedsFilter />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
