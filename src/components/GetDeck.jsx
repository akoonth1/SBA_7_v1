import React, { useState, useEffect, createContext } from 'react';

export const DeckContext = createContext(null);

const DeckProvider = ({ children }) => {
    const [deck, setDeck] = useState({});

    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    async function getDeck() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setDeck(data);
        } catch (error) {
            console.log(error);
            setDeck({ error: "An error occurred" });
        }
    }

    useEffect(() => {
        getDeck();
    }, []);

    return (
        <DeckContext.Provider value={deck}>
            {children}
        </DeckContext.Provider>
    );
};

export default DeckProvider;