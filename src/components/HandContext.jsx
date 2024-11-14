import React, { createContext, useState } from 'react';

export const HandContext = createContext(null);

const HandProvider = ({ children }) => {
  const [hand, setHand] = useState([]);

  return (
    <HandContext.Provider value={{ hand, setHand }}>
      {children}
    </HandContext.Provider>
  );
};

export default HandProvider;