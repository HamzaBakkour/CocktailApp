import React from "react";
import type { ICocktail } from "../utils/types";
import { Link, useLocation } from "react-router-dom";
import "../css/CocktailCard.css";

type Props = { cocktail: ICocktail };

const CocktailCard: React.FC<Props> = ({ cocktail }) => {
  // Capture current location (pathname + search) so the detail page can return here
  const loc = useLocation();

  return (
    <div className="card">
      {cocktail.thumbnail && (
        <img className="thumb" src={cocktail.thumbnail} alt={cocktail.name} />
      )}
      <div className="content">
        <h2>{cocktail.name}</h2>
        <Link
          to={`/cocktail/${cocktail.id}`}
          state={{ from: { pathname: loc.pathname, search: loc.search } }}
          className="see-more"
        >
          See more →
        </Link>
      </div>
    </div>
  );
};

export default CocktailCard;
