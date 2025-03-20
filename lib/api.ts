import { Dog, SearchQueryParams, SearchResults } from "./models";

const baseUrl = "https://frontend-take-home-service.fetch.com";

export const login = async (req: { name: string; email: string }) => {
  return await fetch(
    `https://frontend-take-home-service.fetch.com/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(req),
    }
  );
};

export const logout = async () => {
  return await fetch(
    `https://frontend-take-home-service.fetch.com/auth/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
};

export const getDogBreeds = async (): Promise<string[]> => {
  const res = await fetch(`${baseUrl}/dogs/breeds`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dog breeds. ", { cause: res });
  }

  return res.json();
};

export const searchDogs = async (
  searchQueryParams: SearchQueryParams
): Promise<SearchResults> => {
  const params = new URLSearchParams();

  // set the sort
  params.set("sort", searchQueryParams.sort);

  // set the breeds
  if (typeof searchQueryParams.breeds === "string") {
    params.append("breeds", searchQueryParams.breeds);
  } else {
    searchQueryParams.breeds.forEach((breeds) => {
      params.append("breeds", breeds);
    });
  }

  // set the from cursor
  const from = (Number(searchQueryParams.page) - 1) * 25;
  params.set("from", from.toString());

  const res = await fetch(`${baseUrl}/dogs/search?${params}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to search dogs.");
  }

  return res.json();
};

export const getDogs = async (request: string[]): Promise<Dog[]> => {
  const res = await fetch(`${baseUrl}/dogs`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error("Failed to get Dogs");
  }

  return res.json();
};

export const getMatchs = async (
  request: string[]
): Promise<{ match: string }> => {
  const res = await fetch(`${baseUrl}/dogs/match`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error("Network call for Match failed.");
  }

  return res.json();
};

export const fetchDogs = async (
  searchQueryParams: SearchQueryParams
): Promise<Dog[]> => {
  try {
    const results = await searchDogs(searchQueryParams);
    return await getDogs(results.resultIds);
  } catch (e) {
    throw new Error(e as string);
  }
};
