import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import MainContextProvider from "./mainContext.jsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/index.jsx";
import Page3 from "./page3/index.jsx";
import Page2 from "./page2/index.jsx";
import Jackpot from "./page1/jackpot/index.jsx";
import Config from "./page1/config/index.jsx";

const Root = () => {
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
      path: "game2",
      element: (
        <Layout>
          <Page2 />
        </Layout>
      ),
    },
    {
      path: "game3",
      element: (
        <Layout>
          <Page3 />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainContextProvider>
      <Root />
    </MainContextProvider>
  </React.StrictMode>
);
