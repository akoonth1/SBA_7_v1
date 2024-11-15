
import React from 'react';
import { Droppable } from '../components/Droppable'; // Corrected import path

export default function PlayArea() {
  return (
    <div style={{ height: '50vh', width: '60vw', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Droppable id="play-area">
        <p>Drop cards here</p>
      </Droppable>
    </div>
  );
}