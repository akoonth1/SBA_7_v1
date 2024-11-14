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

import React, { useContext, useState, useEffect } from 'react';
import { DeckContext } from '../components/DeckProvider'; // Corrected import path
import { Card } from '../components/Card'; // Corrected import path
import "./PlayerHand.css";
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const HandInfo = () => {
  const deck = useContext(DeckContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      if (deck && deck.deck_id) {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=5`);
        const data = await response.json();
        setCards(data.cards);
      }
    }
    fetchCards();
  }, [deck]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.code === active.id);
        const newIndex = items.findIndex((item) => item.code === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      {deck ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={cards.map(card => card.code)} strategy={horizontalListSortingStrategy}>
            <div className="hand">
              {cards.map((card) => (
                <Card id={card.code} key={card.code} card={card} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};