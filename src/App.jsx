import { useState } from 'react'

import './App.css'

import { DndContext } from '@dnd-kit/core'
import { Draggable } from './components/Draggable'
import { Droppable } from './components/Droppable'

import APIcall from './components/APIcall'
import Card from './components/Card'

function App() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable"> <APIcall /></Draggable>
  );

  return (
    <>
   
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <div className='droppable-box'>
        <Droppable key={id} id={id} className='droppable-box'>
          {parent === id ? draggableMarkup : 'Drop here'}
        </Droppable>
        </div>
      ))}
    </DndContext>
    </>
  );

  function handleDragEnd(event) {
    const {over} = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};

export default App
