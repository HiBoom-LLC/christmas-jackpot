import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/index.jsx";
import Jackpot from "./page1/jackpot/index.jsx";
import Config from "./page1/config/index.jsx";
import ConfigGame2 from "./page2/config/index.jsx";
import Game from "./page2/game/index.jsx";
import Jackpot3 from "./page3/jackpot/index.jsx";
import Config3 from "./page3/config/index.jsx";
import MainContextProvider from "./mainContext.jsx";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/game1",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          path: "config",
          element: <Config />,
        },
        {
          path: "jackpot",
          element: <Jackpot />,
        },
      ],
    },
    {
      path: "/game2",
      element: (
        <Layout>
          <MainContextProvider>
            <Outlet />
          </MainContextProvider>
        </Layout>
      ),
      children: [
        {
          path: "config",
          element: <ConfigGame2 />,
        },
        {
          path: "game",
          element: <Game />,
        },
      ],
    },
    {
      path: "/game3",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          path: "config",
          element: <Config3 />,
        },
        {
          path: "jackpot",
          element: <Jackpot3 />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
