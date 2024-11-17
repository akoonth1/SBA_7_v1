

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