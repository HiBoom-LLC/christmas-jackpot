import { createContext, useEffect, useState } from "react";
export const MainContext = createContext({});
// eslint-disable-next-line react/prop-types
const MainContextProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(0);
  const [pageHistory, setPageHistory] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const page = localStorage.getItem("page");
    const history = localStorage.getItem("pageHistory");

    if (page && !isNaN(Number(page)) && history && !isNaN(Number(page))) {
      setPageHistory(Number(history));
      setActivePage(Number(page));
    } else {
      localStorage.clear();
    }
    setLoading(false);
  }, []);

  const changePage = (pageNum) => {
    setPageHistory(activePage);
    localStorage.setItem("pageHistory", activePage);
    setActivePage(pageNum);
    localStorage.setItem("page", pageNum);
  };

  const prevPage = (cb) => {
    if (cb) {
      cb();
      return;
    }
    if (pageHistory !== undefined) {
      localStorage.setItem("page", pageHistory);
      setActivePage(pageHistory);

      setPageHistory(undefined);
      localStorage.removeItem("pageHistory");
    }
  };
  if (loading) {
    return null;
  }

  return (
    <MainContext.Provider
      value={{
        activePage,
        pageHistory,
        prevPage,
        changePage,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
