import React from "react";
import { Outlet, Link, useNavigation } from "react-router-dom";

const RootLayout: React.FC = () => {
  const nav = useNavigation();
  const isLoading = nav.state === "loading";

  return (
    <div className="container">
      <header>
        <h1>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>Cocktails</h1>
          </Link>
        </h1>
      </header>

      {isLoading && <p style={{ opacity: 0.7 }}>Loading…</p>}

      <Outlet />
    </div>
  );
};

export default RootLayout;
