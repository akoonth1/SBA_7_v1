import React, { useContext } from 'react';
import { DeckContext } from './DeckProvider';

export const DeckInfo = () => {
  const {deck}  = useContext(DeckContext);

  return (
    <>
      <h1>App</h1>
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