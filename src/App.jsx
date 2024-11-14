
import React from 'react';
import './App.css';
import DeckProvider from './components/DeckProvider';
import {DeckInfo} from './components/DeckInfo';
import {HandInfo} from './pages/PlayerHand';
import { Draggable } from './components/draggable';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { Droppable } from './components/Droppable';
import PlayArea from './pages/PlayArea';
import HandProvider from './components/HandContext'; // Corrected import path



function App() {
  return (
    <DeckProvider>
      <HandProvider>
        <DeckInfo />
        <HandInfo />
      </HandProvider>
    </DeckProvider>
  );
}

export default App;