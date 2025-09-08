import type { LoaderFunctionArgs } from "react-router-dom";
import type { ICocktail } from "../utils/mapRawCocktailData";
import { mapRawCocktailData } from "../utils/mapRawCocktailData";
import type { RawDrink } from "../utils/types";

type DrinksResponse = { drinks: RawDrink[] | null };

export async function cocktailInfoLoader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) {
    throw new Response("Missing cocktail id", { status: 400 });
  }

  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
      id
    )}`
  );
  if (!res.ok) {
    throw new Response("Failed to load cocktail", { status: 500 });
  }

  const json: DrinksResponse = await res.json();
  const first = json.drinks?.[0];
  if (!first) {
    throw new Response("Not found", { status: 404 });
  }

  return mapRawCocktailData(first) as ICocktail;
}
