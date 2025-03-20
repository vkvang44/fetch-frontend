import DogCards from "@/components/dog-cards";
import FavoritesProvider from "@/lib/favorites-provider";
import FilterSidebar from "@/components/filter-siderbar";
import NavigationBar from "@/components/navigation-bar";
import { SearchQueryParams } from "@/lib/models";

export default async function Page(props: {
  searchParams?: Promise<{
    sort?: string;
    breeds?: string[];
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchQueryParams: SearchQueryParams = {
    sort: searchParams?.sort || "breed:asc",
    breeds: searchParams?.breeds || [],
    page: searchParams?.page || "1",
  };

  return (
    <>
      <FavoritesProvider>
        <NavigationBar />
        <div className="flex flex-1 container md:mx-auto">
          <FilterSidebar />
          <div className="flex-1 container px-4">
            <DogCards searchQueryParams={searchQueryParams} />
          </div>
        </div>
      </FavoritesProvider>
    </>
  );
}
