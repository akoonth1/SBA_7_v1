import React from 'react';
import './App.css';
import DeckProvider from './components/DeckProvider'; 
import HandProvider from './components/HandContext'; 
import { HandInfo } from './pages/PlayerHand'; 
import { DeckInfo } from './components/DeckInfo'; 
import PlayArea from './pages/PlayArea';
import { DndContext } from '@dnd-kit/core';

function App() {
  return (
    <DeckProvider>
      <HandProvider>
        <DndContext>
          <DeckInfo />
          <HandInfo />
          
          {/* <PlayArea /> */}
        </DndContext>
      </HandProvider>
    </DeckProvider>
  );
}

export default App;