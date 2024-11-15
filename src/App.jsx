import React from 'react';
import './App.css';
import DeckProvider from './components/DeckProvider'; // Corrected import path
import HandProvider from './components/HandContext'; // Corrected import path
import { HandInfo } from './pages/PlayerHand'; // Corrected import path
import { DeckInfo } from './components/DeckInfo'; // Corrected import path
import PlayArea from './pages/PlayArea'; // Corrected import path
import { DndContext } from '@dnd-kit/core';

function App() {
  return (
    <DeckProvider>
      <HandProvider>
        <DndContext>
          {/* <DeckInfo /> */}
          <HandInfo />
          
          {/* <PlayArea /> */}
        </DndContext>
      </HandProvider>
    </DeckProvider>
  );
}

export default App;