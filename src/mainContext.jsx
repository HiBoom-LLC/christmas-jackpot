import { createContext, useState } from "react";
export const MainContext = createContext({});

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

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
