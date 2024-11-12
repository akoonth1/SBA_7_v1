// import React from 'react';
// import {useDraggable} from '@dnd-kit/core';
// //import {CSS} from '@dnd-kit/utilities';

// function Draggable(props) {
//   const {attributes, listeners, setNodeRef, transform} = useDraggable({
//     id: props.id,
//   });
//   const style = {
//     // Outputs `translate3d(x, y, 0)`
//     transform: CSS.Translate.toString(transform),
//   };

//   return (
//     <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       {props.children}
//     </button>
//   );
// }

import React from 'react';
import {useDraggable} from '@dnd-kit/core';

import {CSS} from '@dnd-kit/utilities';

// Within your component that receives `transform` from `useDraggable`:
// const style = {
//   transform: CSS.Translate.toString(transform),
// }

function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

export { Draggable }