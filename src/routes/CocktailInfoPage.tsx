import React from "react";
import {
  useLoaderData,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import type { ICocktail } from "../utils/types";
import "../css/CocktailInfoPage.css";

type FromState = {
  from?: {
    pathname: string;
    search: string;
  };
};

const CocktailInfoPage: React.FC = () => {
  const cocktail = useLoaderData() as ICocktail;
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state as FromState) || {};
  const backHref = state.from
    ? `${state.from.pathname}${state.from.search || ""}`
    : "/";

  return (
    <div className="info-page">
      <div>
        <button
          onClick={() =>
            window.history.length > 1 ? navigate(-1) : navigate(backHref)
          }
        >
          ← Back
        </button>
      </div>

      <h1>{cocktail.name}</h1>
      {cocktail.thumbnail && (
        <img
          className="info-thumb"
          src={cocktail.thumbnail}
          alt={cocktail.name}
        />
      )}
      <p>
        <strong>Category:</strong> {cocktail.category}
      </p>
      <p>
        <strong>Tags:</strong> {cocktail.tags.join(", ") || "None"}
      </p>
      <p>
        <strong>Glass:</strong> {cocktail.glass}
      </p>

      <h2>Ingredients</h2>
      <ul>
        {cocktail.ingredients.map((it, idx) => (
          <li key={idx}>
            {it.ingredient} {it.measure ? `— ${it.measure}` : ""}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{cocktail.instructions}</p>
    </div>
  );
};

export default CocktailInfoPage;
