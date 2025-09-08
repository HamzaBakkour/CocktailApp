import type { LoaderFunctionArgs } from "react-router-dom";
import type { ICocktail } from "../utils/mapRawCocktailData";
import { mapRawCocktailData } from "../utils/mapRawCocktailData";
import type { RawDrink } from "../utils/types";


type DrinksResponse = { drinks: RawDrink[] | null };

export async function homeLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";

  // Random cocktail
  const randomRes = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  if (!randomRes.ok) {
    throw new Response("Failed to load random", { status: 500 });
  }
  const randomJson: DrinksResponse = await randomRes.json();
  const randomDrink = randomJson.drinks?.[0];
  const randomCocktail: ICocktail | null = randomDrink
    ? mapRawCocktailData(randomDrink)
    : null;

  // Search results
  let searchResults: ICocktail[] = [];
  if (q) {
    const searchRes = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        q
      )}`
    );
    if (!searchRes.ok) {
      throw new Response("Failed to search", { status: 500 });
    }
    const searchJson: DrinksResponse = await searchRes.json();
    searchResults = (searchJson.drinks || []).map(mapRawCocktailData);
  }

  return { q, randomCocktail, searchResults };
}
