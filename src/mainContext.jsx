import { createContext, useState } from "react";
export const MainContext = createContext({});
// eslint-disable-next-line react/prop-types
const MainContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <MainContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
