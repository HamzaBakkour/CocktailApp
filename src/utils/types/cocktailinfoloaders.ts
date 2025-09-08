export type RawDrink = {
  idDrink: string;
  strDrink: string;
  strTags?: string | null;
  strCategory?: string | null;
  strAlcoholic?: string | null;
  strGlass?: string | null;
  strInstructions?: string | null;
  strDrinkThumb?: string | null;
} & {
  [key in `strIngredient${number}`]?: string | null | undefined;
} & {
  [key in `strMeasure${number}`]?: string | null | undefined;
};
