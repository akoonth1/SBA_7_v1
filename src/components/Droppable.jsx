import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    border: isOver ? '2px solid green' : '2px dashed gray',
    padding: '1rem',
    minHeight: '200px',
    flex: 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export { Droppable };