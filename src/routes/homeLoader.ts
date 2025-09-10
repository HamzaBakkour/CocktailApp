// src/routes/homeLoader.ts
import type { LoaderFunctionArgs } from "react-router-dom";
import type { ICocktail, RawDrink } from "../utils/types";
import { mapRawCocktailData } from "../utils/mapRawCocktailData";

type DrinksResponse = { drinks: RawDrink[] | null };

export async function homeLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";
  const rid = url.searchParams.get("rid")?.trim() || "";

  // --- Random cocktail (re-use by id when provided) ---
  let randomCocktail: ICocktail | null = null;

  if (rid) {
    const byId = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
        rid
      )}`
    );
    if (!byId.ok)
      throw new Response("Failed to load cocktail by id", { status: 500 });
    const jsonById: DrinksResponse = await byId.json();
    const drinkById = jsonById.drinks?.[0] ?? null;
    randomCocktail = drinkById ? mapRawCocktailData(drinkById) : null;
  } else {
    const randomRes = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    if (!randomRes.ok)
      throw new Response("Failed to load random", { status: 500 });
    const randomJson: DrinksResponse = await randomRes.json();
    const randomDrink = randomJson.drinks?.[0] ?? null;
    randomCocktail = randomDrink ? mapRawCocktailData(randomDrink) : null;
  }

  // --- Search results (independent of rid) ---
  let searchResults: ICocktail[] = [];
  if (q) {
    const searchRes = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        q
      )}`
    );
    if (!searchRes.ok) throw new Response("Failed to search", { status: 500 });
    const searchJson: DrinksResponse = await searchRes.json();
    searchResults = (searchJson.drinks || []).map(mapRawCocktailData);
  }

  return { q, randomCocktail, searchResults };
}
