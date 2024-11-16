// import React from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import '../pages/PlayerHand.css';


// export const Card = ({ card }) => {
//    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.code });
// const style = {
//     transform: CSS.Translate.toString(transform),
//     transition
//   };

//   const imageStyle = {
//     width: '80px', // Adjust the width to make the card smaller or larger
//     height: 'auto',
//     margin: '50 auto',
//     text-align: 'center',
//   };

//   return (
//     <>
//       {card ? (
//         <div ref={setNodeRef} {...attributes}{...listeners}     className="card-image" style={imageStyle}>
//           <p>Card ID: {card.code}</p>
//           <img src={card.image} alt={card.code} />
//           <p>Card: {card.value} of {card.suit}</p>
//               className="card-image"
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };


// import React from 'react';
// import { useDraggable } from '@dnd-kit/core';

// export const Card = ({ card }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
//     id: card.code,
//   });

//   const style = {
//     transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} className="card" style={style} {...attributes} {...listeners}>
//       {/* <h5>Card ID: {card.code}</h5> */}
//       <img src={card.image} alt={card.code} />
//       {/* <p>Card: {card.value} of {card.suit}</p> */}
//     </div>
//   );
// };

// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import '../pages/PlayerHand.css';

// export const Card = ({ id, card }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

//    const style = {
//     transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
//     transition,
//   };


//   const imageStyle = {
//     width: '80px', // Adjust the width to make the card smaller or larger
//     height: 'auto',
//     margin: '50 auto',
//   };



//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//     <img
//       src={card.image}
//       alt={`${card.value} of ${card.suit}`}
//       className="card-image"
//     />
//        {/* <h5>Card ID: {card.code}</h5> */}

//      {/* <p>Card: {card.value} of {card.suit}</p> */}
//   </div>
//   );



// };

// import { useDraggable } from '@dnd-kit/core';
// import { CSS } from '@dnd-kit/utilities';
// import '../pages/PlayerHand.css';
// export const Card = ({ id, card }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const imageStyle = {
//     width: '80px', // Adjust the width to make the card smaller or larger
//     height: 'auto',
//     margin: '50 auto',
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <img
//         src={card.image}
//         alt={`${card.value} of ${card.suit}`}
//         className="card-image"
//         style={imageStyle}
//       />
//       {/* <h5>Card ID: {card.code}</h5> */}
//       {/* <p>Card: {card.value} of {card.suit}</p> */}
//     </div>
//   );
// };

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../pages/PlayerHand.css';

export const Card = ({ id, card, style: customStyle }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform ? 'none' : transition, // Remove transition when dragging
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...customStyle, // Apply custom styles if provided
  };

  const imageStyle = {
    width: '80px', // Adjust the width to make the card smaller or larger
    height: 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={card.image}
        alt={`${card.value} of ${card.suit}`}
        className="card-image"
        style={imageStyle}
      />
      {/* <p>Card ID: {card.code}</p>
      <p>Card: {card.value} of {card.suit}</p> */}
    </div>
  );
};