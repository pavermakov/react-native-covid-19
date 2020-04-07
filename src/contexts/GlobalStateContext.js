import React, { createContext, useState } from 'react';

export const Context = createContext();

const GlobalStateContext = ({ children }) => {
  const [globalInfo, setGlobalInfo] = useState({});
  const [allCountriesInfo, setAllCountriesInfo] = useState({});

  const value = {
    globalInfo,
    setGlobalInfo,
    allCountriesInfo,
    setAllCountriesInfo,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default GlobalStateContext;
