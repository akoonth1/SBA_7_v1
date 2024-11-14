// import React, { useState, useEffect } from 'react';

// export const Card = ({ deckId, id, cards }) => {
//   const [card, setCard] = useState(null);

//   useEffect(() => {
//     async function fetchCard() {
//       const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
//       const data = await response.json();
//       setCard(data.cards[0]);
//     }
//     fetchCard();
//   }, [deckId]);

//   return (
//     <>
//       {card ? (
//         <div>
//           <p>Card ID: {card.code}</p>
//           <img src={card.image} alt={card.code} />
//           <p>Card: {card.value} of {card.suit}</p>
//           <p>{deckId}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
export const Card = ({ card }) => {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.code });
const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <>
      {card ? (
        <div ref={setNodeRef} {...attributes}{...listeners}  style={style}>
          <p>Card ID: {card.code}</p>
          <img src={card.image} alt={card.code} />
          <p>Card: {card.value} of {card.suit}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};