import React, { createContext, useState, useEffect } from 'react';
import { getDeck } from './APIcall';

export const DeckContext = createContext(null);

const DeckProvider = ({ children }) => {
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    async function fetchDeck() {
      const data = await getDeck();
      setDeck(data);
    }
    fetchDeck();
  }, []);

  return (
    <DeckContext.Provider value={deck}>
      {children}
    </DeckContext.Provider>
  );
};

export default DeckProvider;