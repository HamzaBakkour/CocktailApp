import React, { useMemo, useState } from "react";
import {
  Form,
  useLoaderData,
  useSearchParams,
  useNavigate, 
  Link,
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

  const navigate = useNavigate(); 
  const [params] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    const hasRid = !!params.get("rid");
    if (randomCocktail?.id && !hasRid) {
      const next = new URLSearchParams(params);
      next.set("rid", randomCocktail.id);
      navigate({ search: `?${next.toString()}` }, { replace: true });
    }
  
  }, [randomCocktail?.id]); 

  React.useEffect(() => {
    setCurrentPage(1);
  }, [params.toString()]);

  const totalItems = searchResults?.length ?? 0;
  const pagedResults = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return (searchResults || []).slice(start, start + PAGE_SIZE);
  }, [searchResults, currentPage]);

  return (
    <main className="main-content">
      <section className="panel">
        <div className="top">
          <h2>Random Cocktail</h2>
          <div>
            <Link
              to={q ? `/?q=${encodeURIComponent(q)}` : "/"}
              className="see-more"
              title="Get another random"
            >
              Another Random
            </Link>
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
            {randomCocktail?.id && (
              <input type="hidden" name="rid" value={randomCocktail.id} />
            )}
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
