import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./routes/RootLayout";
import Home from "./routes/Home";
import CocktailInfoPage from "./routes/CocktailInfoPage";

import { homeLoader } from "./routes/homeLoader";
import { cocktailInfoLoader } from "./routes/cocktailInfoLoader";

import "./css/background.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      {
        path: "cocktail/:id",
        element: <CocktailInfoPage />,
        loader: cocktailInfoLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
