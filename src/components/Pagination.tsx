import React from "react";
import "../css/Pagination.css"

type Props = {
  totalItems: number;
  pageSize?: number;
  currentPage: number; 
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  totalItems,
  pageSize = 5,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onPageChange(p);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Search results pages">
      <button
        className="page-btn"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹ Prev
      </button>
      <ul className="page-list" role="list">
        {pages.map((p) => (
          <li key={p}>
            <button
              className={`page-num ${p === currentPage ? "active" : ""}`}
              aria-current={p === currentPage ? "page" : undefined}
              onClick={() => go(p)}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="page-btn"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>
    </nav>
  );
};

export default Pagination;
