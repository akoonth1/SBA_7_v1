// import React, { useContext } from 'react';
// import { DeckContext } from '../components/DeckProvider'; // Corrected import path
// import { Card } from '../components/Card'; // Corrected import path
// import "./PlayerHand.css";
// import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';


// export const HandInfo = () => {
//   const deck = useContext(DeckContext);

//   return (
//     <>
//       {deck ? (
//         <div className="hand">
//             <SortableContext items={} strategy={horizontalListSortingStrategy}>
//           {/* <p>Deck ID: {deck.deck_id}</p> */}
//           <Card deckId={deck.deck_id} />
//           <Card deckId={deck.deck_id} />
//           <Card deckId={deck.deck_id} />
//           <Card deckId={deck.deck_id} />
//           <Card deckId={deck.deck_id} />

//             </SortableContext>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };

// import React, { useContext, useState, useEffect } from 'react';
// import { DeckContext } from '../components/DeckProvider'; // Corrected import path
// import { Card } from '../components/Card'; // Corrected import path
// import "./PlayerHand.css";
// import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { arrayMove } from '@dnd-kit/sortable';
// import DrawCardButton from '../components/DrawCardButton';

// export const HandInfo = () => {
//   const deck = useContext(DeckContext);
//   const [cards, setCards] = useState([]);

//   let handsize = 5;

//   useEffect(() => {
//     async function fetchCards() {
//       if (deck && deck.deck_id) {
//         const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${handsize}`);
//         const data = await response.json();
//         setCards(data.cards);
//       }
//     }
//     fetchCards();
//   }, [deck, handsize]);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setCards((items) => {
//         const oldIndex = items.findIndex((item) => item.code === active.id);
//         const newIndex = items.findIndex((item) => item.code === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   const drawCard = async () => {
//     if (deck && deck.deck_id) {
//       const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
//       const data = await response.json();
//       setCards((prevCards) => [...prevCards, ...data.cards]);
//       setHandSize((prevSize) => prevSize + 1);
//     }
//   };



//   return (
//     <>
//       {deck ? (
//         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <SortableContext items={cards.map(card => card.code)} strategy={horizontalListSortingStrategy}>
//             <div className="hand">
//               {cards.map((card) => (
//                 <Card id={card.code} key={card.code} card={card} />
//               ))}
//             </div>
//           </SortableContext>
//           <DrawCardButton drawCard={drawCard} />
//         </DndContext>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };

import React, { useContext, useEffect, useState } from 'react';
import { DeckContext } from '../components/DeckProvider'; // Corrected import path
import { HandContext } from '../components/HandContext'; // Corrected import path
import { Card } from '../components/Card'; // Corrected import path
import "./PlayerHand.css";
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import DrawCardButton from '../components/DrawCardButton'; // Corrected import path

export const HandInfo = () => {
  const { deck, updateDeck } = useContext(DeckContext);
  const { hand, setHand } = useContext(HandContext);
  const [handSize, setHandSize] = useState(5);

  useEffect(() => {
    async function fetchCards() {
      if (deck && deck.deck_id) {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${handSize}`);
        const data = await response.json();
        setHand(data.cards);
        updateDeck({ ...deck, remaining: deck.remaining - handSize });
      }
    }
    fetchCards();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setHand((items) => {
        const oldIndex = items.findIndex((item) => item.code === active.id);
        const newIndex = items.findIndex((item) => item.code === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const drawCard = async () => {
    if (deck && deck.deck_id) {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
      const data = await response.json();
      setHand((prevCards) => [...prevCards, ...data.cards]);
      setHandSize((prevSize) => prevSize + 1);
      updateDeck({ ...deck, remaining: deck.remaining - 1 });
    }
  };

  return (
    <>
      {deck ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={hand.map(card => card.code)} strategy={horizontalListSortingStrategy}>
            <div className="hand">
              {hand.map((card) => (
                <Card id={card.code} key={card.code} card={card} />
              ))}
            </div>
          </SortableContext>
          <DrawCardButton drawCard={drawCard} />
        </DndContext>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};