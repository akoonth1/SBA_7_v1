
// import React from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// export const Card = ({ card }) => {
//    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.code });
// const style = {
//     transform: CSS.Translate.toString(transform),
//     transition
//   };

//   return (
//     <>
//       {card ? (
//         <div ref={setNodeRef} {...attributes}{...listeners}  style={style}>
//           <p>Card ID: {card.code}</p>
//           <img src={card.image} alt={card.code} />
//           <p>Card: {card.value} of {card.suit}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };


import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export const Card = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: card.code,
  });

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    transition,
  };

  return (
    <div ref={setNodeRef} className="card" style={style} {...attributes} {...listeners}>
      {/* <h5>Card ID: {card.code}</h5> */}
      <img src={card.image} alt={card.code} />
      {/* <p>Card: {card.value} of {card.suit}</p> */}
    </div>
  );
};