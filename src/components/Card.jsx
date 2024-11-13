import React, { useEffect, useState } from 'react';

export default function Card(props) {
    const card_url = `https://deckofcardsapi.com/api/deck/${props.deckId}/draw/?count=1`;
     
    const [card, setCard] = useState({});

    async function getCard() {
        try {
            const response = await fetch(card_url);
            const data = await response.json();
            console.log(data);
            setCard(data.cards[0]); // Assuming the API returns an array of cards
        } catch (error) {
            console.log(error);
            setCard({error: "An error occurred"});
        }
    }

    useEffect(() => {
        if (props.deckId) {
            getCard();
        }
    }, [props.deckId]);
    
    return (
        <div>
            <h3>Card</h3>
            {props.deckId && (
                <div>
                    <p>Deck ID: {props.deckId}</p>
                    {card.error ? (
                        <p>{card.error}</p>
                    ) : (
                        <div>
                            <p>Card: {card.value} of {card.suit}</p>
                            <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}