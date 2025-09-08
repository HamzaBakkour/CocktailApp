import React, { useMemo, useState } from "react";
import {
  Form,
  useLoaderData,
  useSearchParams,
  useRevalidator,
} from "react-router-dom";
import CocktailCard from "../components/CocktailCard";
import Pagination from "../components/Pagination";
import type { ICocktail } from "../utils/types";
import "../css/Home.css";

const PAGE_SIZE = 5;

const Home: React.FC = () => {
  const { q, randomCocktail, searchResults } = useLoaderData() as {
    q: string;
    randomCocktail: ICocktail | null;
    searchResults: ICocktail[];
  };

  // Revalidate the current route's loader without changing the URL
  const revalidator = useRevalidator();

  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when the query string changes
  const [params] = useSearchParams();
  React.useEffect(() => {
    setCurrentPage(1);
  }, [params.toString()]);

  const totalItems = searchResults?.length ?? 0;
  const pagedResults = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return (searchResults || []).slice(start, start + PAGE_SIZE);
  }, [searchResults, currentPage]);

  const refreshing = revalidator.state === "loading";

  return (
    <main className="main-content">
      <section className="panel">
        <div className="top">
          <h2>Random Cocktail</h2>

          <div>
            <button
              type="button"
              className="see-more"
              onClick={() => revalidator.revalidate()}
              disabled={refreshing}
              title="Get another random"
            >
              {refreshing ? "Refreshing…" : "Another Random"}
            </button>
          </div>
        </div>

        {!randomCocktail ? (
          <p>Failed to load random cocktail.</p>
        ) : (
          <CocktailCard cocktail={randomCocktail} />
        )}
      </section>

      <section className="panel">
        <h2>Search</h2>
        <Form method="get" className="search">
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search cocktail by name… (e.g., margarita)"
              aria-label="Search cocktails"
            />
            <button type="submit">Search</button>
          </div>
        </Form>

        {q && totalItems === 0 && <p>No matches for “{q}”.</p>}

        <div className="list">
          {pagedResults.map((c) => (
            <CocktailCard key={c.id} cocktail={c} />
          ))}
        </div>

        {totalItems > 0 && (
          <Pagination
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </main>
  );
};

export default Home;
