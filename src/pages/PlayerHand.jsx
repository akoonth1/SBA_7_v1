
import React, { useContext, useEffect, useState } from 'react';
import { DeckContext } from '../components/DeckProvider'; // Corrected import path
import { HandContext } from '../components/HandContext'; // Corrected import path
import { Card } from '../components/Card'; // Corrected import path
import "./PlayerHand.css";
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import DrawCardButton from '../components/DrawCardButton'; // Corrected import path

export const HandInfo = () => {
  const { deck, updateDeck } = useContext(DeckContext);
  const { hand, setHand } = useContext(HandContext);
  const [handSize, setHandSize] = useState(4);
  const [columns, setColumns] = useState({
    'column-1': [],
    'column-2': [],
    'column-3': [],
    'column-4': [],
    'column-5': [],
  });

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

    if (!over) return;

    if (over.id.startsWith('column-')) {
      const activeIndex = hand.findIndex((item) => item.code === active.id);
      if (activeIndex !== -1) {
        const overColumn = columns[over.id];
        const overIndex = overColumn.length;
        setHand((items) => items.filter((item) => item.code !== active.id));
        setColumns((prevColumns) => ({
          ...prevColumns,
          [over.id]: arrayMove([...overColumn, hand[activeIndex]], overColumn.length, overIndex),
        }));
      } else {
        const fromColumnId = Object.keys(columns).find((key) =>
          columns[key].some((item) => item.code === active.id)
        );
        if (!fromColumnId) return;
        const activeIndex = columns[fromColumnId].findIndex((item) => item.code === active.id);
        if (activeIndex === -1) return;
        const overColumn = columns[over.id];
        const overIndex = overColumn.length;
        const movedCard = columns[fromColumnId][activeIndex];
        setColumns((prevColumns) => ({
          ...prevColumns,
          [fromColumnId]: prevColumns[fromColumnId].filter((item) => item.code !== active.id),
          [over.id]: arrayMove([...overColumn, movedCard], overColumn.length, overIndex),
        }));
      }
    } else if (over.id === 'hand') {
      const columnId = Object.keys(columns).find((key) =>
        columns[key].some((item) => item.code === active.id)
      );
      if (!columnId) return;
      const activeIndex = columns[columnId].findIndex((item) => item.code === active.id);
      if (activeIndex === -1) return;
      const overIndex = hand.length;
      setColumns((prevColumns) => ({
        ...prevColumns,
        [columnId]: prevColumns[columnId].filter((item) => item.code !== active.id),
      }));
      setHand((items) => arrayMove([...items, columns[columnId][activeIndex]], items.length, overIndex));
    }
  };

  const drawCard = async () => {
    if (deck.remaining <= 0) {
        alert('No more cards in deck!');
    }
    if (deck && deck.deck_id) {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
      const data = await response.json();
      setHand((prevCards) => [...prevCards, ...data.cards]);
      setHandSize((prevSize) => prevSize + 1);
      updateDeck({ ...deck, remaining: deck.remaining - 1 });
    }
  };

  const createNewHand = async () => {
    if (deck && deck.deck_id) {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${handSize}`);
      const data = await response.json();
      setHand(data.cards);
      updateDeck({ ...deck, remaining: deck.remaining - handSize });
    }
  };

  const Column = ({ id, children }) => {
    const { isOver, setNodeRef } = useDroppable({
      id,
    });

    const style = {
      border: isOver ? '2px solid green' : '2px dashed gray',
    };

    return (
      <div ref={setNodeRef} className="card_column" style={style}>
        {children}
      </div>
    );
  };

  return (
    <>
      {deck ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={hand.map(card => card.code)} strategy={horizontalListSortingStrategy}>
            <div className="hand" id="hand">
              {hand.map((card) => (
                <Card id={card.code} key={card.code} card={card} />
              ))}
            </div>
          </SortableContext>
          <DrawCardButton drawCard={drawCard} />
          <button onClick={createNewHand}>Create New Hand</button>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            {Object.keys(columns).map((columnId) => (
              <Column key={columnId} id={columnId}>
                {columns[columnId].map((card, index) => (
                  <Card id={card.code} key={card.code} card={card} style={{ top: `${index * 20}px`, left: `${index * 20}px` }} />
                ))}
              </Column>
            ))}
          </div>
        </DndContext>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};