import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICocktail } from "../utils/mapRawCocktailData";
import { mapRawCocktailData } from "../utils/mapRawCocktailData";
import type { RawDrink } from "../utils/types"; 

type DrinksResponse = {
  drinks: RawDrink[] | null;
};

export const cocktailsApi = createApi({
  reducerPath: "cocktailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    getRandomCocktail: builder.query<ICocktail, void>({
      query: () => "random.php",
      transformResponse: (resp: DrinksResponse) => {
        const first = resp.drinks?.[0];
        if (!first) {
          throw new Error("No cocktail found.");
        }
        return mapRawCocktailData(first);
      },
    }),
    searchCocktailsByName: builder.query<ICocktail[], string>({
      query: (name) => `search.php?s=${encodeURIComponent(name)}`,
      transformResponse: (resp: DrinksResponse) => {
        if (!resp.drinks) return [];
        return resp.drinks.map(mapRawCocktailData);
      },
    }),
    getCocktailById: builder.query<ICocktail, string>({
      query: (id) => `lookup.php?i=${encodeURIComponent(id)}`,
      transformResponse: (resp: DrinksResponse) => {
        const first = resp.drinks?.[0];
        if (!first) {
          throw new Error("No cocktail found.");
        }
        return mapRawCocktailData(first);
      },
    }),
  }),
});

export const {
  useGetRandomCocktailQuery,
  useLazyGetRandomCocktailQuery,
  useSearchCocktailsByNameQuery,
  useLazySearchCocktailsByNameQuery,
  useGetCocktailByIdQuery,
} = cocktailsApi;
