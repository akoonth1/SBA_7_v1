import React, { useContext, useEffect } from 'react';
import { DeckContext } from './DeckProvider';

export const DeckInfo = () => {
  const {deck}  = useContext(DeckContext);

//Causes inf loop
// Only works after first card is drawn
//   useEffect(() => {
//     if (deck.remaining <= 0) {
//       alert('No more cards remaining in the deck!');
//     }
//   }, [deck]);

  return (
    <>
      <h1>solitaire</h1>
      {deck ? (
        <div>
          <p>Deck ID: {deck.deck_id}</p>
          <p>Remaining: {deck.remaining}</p>
          <p>Shuffled: {deck.shuffled ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};