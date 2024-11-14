import React from 'react';

export default function DrawCardButton({ drawCard }) {
  return (
    <button onClick={drawCard}>Draw the next card</button>
  );
}