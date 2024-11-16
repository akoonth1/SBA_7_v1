


import React, { useContext, useEffect, useState } from 'react';
import { DeckContext } from '../components/DeckProvider';
import { HandContext } from '../components/HandContext'; 
import { Card } from '../components/Card'; 
import "./PlayerHand.css";
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import DrawCardButton from '../components/DrawCardButton'; 
import { useSortable } from '@dnd-kit/sortable';
import CardCodetoValue from '../components/GameLogic';

export const HandInfo = () => {
  const { deck, updateDeck } = useContext(DeckContext);
  const { hand, setHand } = useContext(HandContext);
  const [handSize, setHandSize] = useState(4);
  const [columns, setColumns] = useState({
    'column-1': { cards: [], lastCardValue: 14 },
    'column-2': { cards: [], lastCardValue: 14 },
    'column-3': { cards: [], lastCardValue: 14 },
    'column-4': { cards: [], lastCardValue: 14 },
    'column-5': { cards: [], lastCardValue: 14 },
    'column-6': { cards: [], lastCardValue: 14 },
    'column-7': { cards: [], lastCardValue: 14 },
    'column-8': { cards: [], lastCardValue: 14 },
  });

  useEffect(() => {
    async function fetchCards() {
      if (deck && deck.deck_id) {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${handSize}`);
        const data = await response.json();
        setColumns((prevColumns) => ({
          ...prevColumns,
          'column-1': { cards: data.cards, lastCardValue: data.cards[data.cards.length - 1].value },
        }));
        updateDeck({ ...deck, remaining: deck.remaining - handSize });
      }
    }
    fetchCards();
  }, []);

 
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (over.id.startsWith('column-')) {
      const activeCard =
        hand.find((item) => item.code === active.id) ||
        Object.values(columns).flatMap((col) => col.cards).find((item) => item.code === active.id);

      if (!activeCard) return;

      const overColumn = columns[over.id].cards;
      const lastCardInOverColumn = overColumn[overColumn.length - 1];

      // Use CardCodetoValue for value comparison
      if (lastCardInOverColumn) {
        const activeCardValue = CardCodetoValue(activeCard.value);
        const lastCardValue = CardCodetoValue(lastCardInOverColumn.value);
        if (activeCardValue >= lastCardValue) return;
      }

      if (hand.some((item) => item.code === active.id)) {
        // Moving from hand to column
        const newHand = hand.filter((item) => item.code !== active.id);
        const newOverColumnCards = [...overColumn, activeCard];
        setHand(newHand);


        
        setColumns((prevColumns) => ({
          ...prevColumns,
          [over.id]: {
            cards: newOverColumnCards,
            lastCardValue: newOverColumnCards[newOverColumnCards.length - 1].value,
          },
        }));
      } else {
        // Moving from one column to another
        const fromColumnId = Object.keys(columns).find((key) =>
          columns[key].cards.some((item) => item.code === active.id)
        );
        if (!fromColumnId) return;
        const newFromColumnCards = columns[fromColumnId].cards.filter((item) => item.code !== active.id);
        const newOverColumnCards = [...overColumn, activeCard];
        setColumns((prevColumns) => ({
          ...prevColumns,
          [fromColumnId]: {
            cards: newFromColumnCards,
            lastCardValue:
              newFromColumnCards.length > 0
                ? newFromColumnCards[newFromColumnCards.length - 1].value
                : null,
          },
          [over.id]: {
            cards: newOverColumnCards,
            lastCardValue: newOverColumnCards[newOverColumnCards.length - 1].value,
          },
        }));
        
      }
    }

  };



  const drawCard = async () => {
    if (deck.remaining <= 0) {
      alert('No more cards in deck!');
      return;
    }
    if (deck && deck.deck_id) {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
      const data = await response.json();
      const newCards = [...columns['column-1'].cards, ...data.cards];
      setColumns((prevColumns) => ({
        ...prevColumns,
        'column-1': { cards: newCards, lastCardValue: newCards[newCards.length - 1].value },
      }));
      updateDeck({ ...deck, remaining: deck.remaining - 1 });
    }
  };

  const createNewHand = async () => {
     let reshuffledCardCount = 0
    if (deck && deck.deck_id) {
    const firstColumnCards = columns['column-1'].cards.map(card => card.code).join(',');
    reshuffledCardCount = columns['column-1'].cards.length;
 
        console.log(firstColumnCards.length);
    //   Return cards to the deck

        if (firstColumnCards.length > 0) {
        await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/return/?cards=${firstColumnCards}`);
      }

      // Draw new hand
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${handSize}`);
      const data = await response.json();
      setColumns((prevColumns) => ({
        ...prevColumns,
        'column-1': { cards: data.cards, lastCardValue: data.cards[data.cards.length - 1].value },
      }));
      updateDeck({ ...deck, remaining: deck.remaining - handSize + reshuffledCardCount });
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
                {columns[columnId].cards.map((card, index) => (
                  <Card id={card.code} key={card.code} card={card} style={{ top: `${index * 20}px` }} />
                ))}
                <p>Last Card Value: {columns[columnId].lastCardValue}</p>
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