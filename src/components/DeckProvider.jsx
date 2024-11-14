import React, { createContext, useState, useEffect, useMemo } from 'react';
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

  const updateDeck = (newDeck) => {
    setDeck(newDeck);
  };

  const value = useMemo(() => ({ deck, updateDeck }), [deck]);

  return (
    <DeckContext.Provider value={value}>
      {children}
    </DeckContext.Provider>
  );
};

export default DeckProvider;