import React, { useContext, useEffect, useState } from 'react';
import { DeckContext } from '../components/DeckProvider';
import { HandContext } from '../components/HandContext'; 
import { Card } from '../components/Card'; 
import "./PlayerHand.css";
import { horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, useDroppable, DragOverlay, closestCorners, rectIntersection } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import DrawCardButton from '../components/DrawCardButton'; 
import { useSortable } from '@dnd-kit/sortable';
import CardCodetoValue from '../components/GameLogic';

export const HandInfo = () => {

  const { deck, updateDeck } = useContext(DeckContext);

  const { hand, setHand } = useContext(HandContext);

  const [handSize, setHandSize] = useState(4);

  const [columns, setColumns] = useState({
    'column-1': { cards: [], lastCardValue: null },
    'column-2': { cards: [], lastCardValue: null },
    'column-3': { cards: [], lastCardValue: null },
    'column-4': { cards: [], lastCardValue: null },
    'column-5': { cards: [], lastCardValue: null},
    'column-6': { cards: [], lastCardValue: null },
    'column-7': { cards: [], lastCardValue: null},
    'column-8': { cards: [], lastCardValue: null },
  });


  const [activeDragItem, setActiveDragItem] = useState(null);

  //Infinte loop will occur if deck is included in the dependency array
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
  
    const activeId = active.id;
    const overId = over.id;
  
    // Find the column IDs
    const fromColumnId = Object.keys(columns).find((key) =>
      columns[key].cards.some((item) => item.code === activeId)
    );
    const toColumnId = overId;
  
    if (!fromColumnId || !toColumnId) return;
  
    // Check if the move is within the same column
    const isSameColumn = fromColumnId === toColumnId;
  
    // Identify restricted columns (columns 2 to 8)
    const restrictedColumns = [
      'column-2',
      'column-3',
      'column-4',
      'column-5',
      'column-6',
      'column-7',
      'column-8',
    ];
  
    // If moving within the same restricted column, prevent the move
    if (isSameColumn && restrictedColumns.includes(fromColumnId)) {
      return; // Do not allow moving within columns 2-8
    }
  

  // Get the columns
  const fromColumn = columns[fromColumnId];
  const toColumn = columns[toColumnId];

  // Get the active card
  const activeCard = fromColumn.cards.find((item) => item.code === activeId);

  if (!activeCard) return;

  // Check if the active card is the last card in the restricted column
  if (restrictedColumns.includes(fromColumnId)) {
    const lastCardInFromColumn = fromColumn.cards[fromColumn.cards.length - 1];
    if (activeCard.code !== lastCardInFromColumn.code) {
      return; // Do not allow moving if the active card is not the last card in the restricted column
    }
  }

  // Get the last card in the target column
  const lastCardInToColumn = toColumn.cards[toColumn.cards.length - 1];

  // If moving to a different column, enforce the rule
  if (fromColumnId !== toColumnId) {
    // Use CardCodetoValue for value comparison
    if (lastCardInToColumn) {
      const activeCardValue = CardCodetoValue(activeCard.value);
      const lastCardValue = CardCodetoValue(lastCardInToColumn.value);

      // Only allow move if activeCardValue is less than lastCardValue
      if (activeCardValue >= lastCardValue) {
        // Invalid move, do not proceed
        return;
      }
    }
  }

  // Proceed with the move
  const newFromColumnCards = fromColumn.cards.filter((item) => item.code !== activeId);
  const newToColumnCards = [...toColumn.cards, activeCard];

  setColumns((prevColumns) => {
    const updatedColumns = {
      ...prevColumns,
      [fromColumnId]: {
        cards: newFromColumnCards,
        lastCardValue: newFromColumnCards.length
          ? newFromColumnCards[newFromColumnCards.length - 1].value
          : null,
      },
      [toColumnId]: {
        cards: newToColumnCards,
        lastCardValue: newToColumnCards[newToColumnCards.length - 1].value,
      },
    };

    // Check if four columns have 13 cards
    const columnsWith13Cards = Object.values(updatedColumns).filter(
      (column) => column.cards.length === 13
    ).length;

    if (columnsWith13Cards >= 4) {
      alert('You win!');
    }

    return updatedColumns;
  });
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

  const Column = ({ id, label, children }) => {
    const { isOver, setNodeRef } = useDroppable({
      id,
    });
  

  const style = {
    background: isOver ? 'lightblue' : 'white',
    flex: 1,
    minHeight: '300px', // Increased minHeight
    minWidth: '200px',
    padding: '15px',
    margin: '1px',
    position: 'relative', // Added relative positioning
  };

  return (
    <div ref={setNodeRef} className="card_column" style={style}>
    <h3 style={{ textAlign: 'center' }}>{label}</h3>
    {children}
  </div>
  );
};


const handleDragStart = (event) => {
  const { active } = event;
  const activeId = active.id;

  // Find the active card
  const activeCard =
    hand.find((item) => item.code === activeId) ||
    Object.values(columns)
      .flatMap((col) => col.cards)
      .find((item) => item.code === activeId);

  setActiveDragItem(activeCard);
};
const handleDragCancel = () => {
  setActiveDragItem(null);
};

// Custom collision detection strategy


const customCollisionDetection = (args) => {
    const rectIntersectionResult = rectIntersection(args);
    const closestCenterResult = closestCenter(args);

    // Combine the results of both strategies
    return closestCenterResult.length > 0 ? closestCenterResult : rectIntersectionResult;
  };
  
  
  

  return (
    <>
      {deck ? (
        <DndContext 
        collisionDetection={customCollisionDetection} 
        onDragEnd={handleDragEnd} 
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        >

            <DragOverlay>
              {activeDragItem ? (
                <Card id={activeDragItem.code} card={activeDragItem} />
              ) : null}
            </DragOverlay>

          <SortableContext items={hand.map(card => card.code)} strategy={horizontalListSortingStrategy}>
            <div className="hand" id="hand">
              {hand.map((card) => (
                <Card id={card.code} key={card.code} card={card} />
              ))}
            </div>
          </SortableContext>

          <DrawCardButton drawCard={drawCard} />

          <button onClick={createNewHand}>Create New Hand</button>

        <div style={{ display: 'flex', marginTop: '10px', alignItems: 'flex-start' }}>
          {Object.keys(columns).map((columnId, index) => (
            <SortableContext
              key={columnId}
              items={columns[columnId].cards.map((card) => card.code)}
              strategy={verticalListSortingStrategy}
            >
              <Column id={columnId} label={`Column ${index + 1}`}>
                {columns[columnId].cards.map((card, cardIndex) => (
                  <Card
                    id={card.code}
                    key={card.code}
                    card={card}
                    style={{
                      marginTop: `${-75}px`,
                      zIndex: cardIndex,
                      position: 'relative',
                    }}
                  />
                ))}
                <p>Last Card Value: {columns[columnId].lastCardValue}</p>
              </Column>
            </SortableContext>
          ))}
        </div>

        </DndContext>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};