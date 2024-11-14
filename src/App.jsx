
import React from 'react';
import './App.css';
import DeckProvider from './components/DeckProvider';
import {DeckInfo} from './components/DeckInfo';
import {HandInfo} from './pages/PlayerHand';
import { Draggable } from './components/draggable';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { Droppable } from './components/Droppable';
import PlayArea from './pages/PlayArea';

function App() {


  const handleDragEnd = (event) => {
   const {active, over} = event;
   if (active.id !== over.id) {
    setCards((items) => {
      const oldIndex = items.findIndex((item) => item.code === active.id);
      const newIndex = items.findIndex((item) => item.code === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }
};

  return (

    <DeckProvider>
      <DndContext collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}>
        <PlayArea />
      {/* <DeckInfo /> */}
      <HandInfo />
      </DndContext>
    </DeckProvider>
  );
}

export default App;