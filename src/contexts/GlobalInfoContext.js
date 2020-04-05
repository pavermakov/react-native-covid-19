import React, { createContext, useState } from 'react';
export const Context = createContext();

const GlobalInfoContext = ({ children }) => {
  const [globalInfo, setGlobalInfo] = useState(null);

  return (
    <Context.Provider value={{ globalInfo, setGlobalInfo }}>
      {children}
    </Context.Provider>
  );
};

export default GlobalInfoContext;
