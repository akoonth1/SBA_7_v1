import {useState, useEffect} from "react";
import Card from "./Card";
export default function APIcall() {



    //set Deck
    const [deck, setDeck] = useState({});

const url ="https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"


async function getDeck() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setDeck(data);
    } catch (error) {
        console.log(error);
        setDeck({error: "An error occurred"});
    }

}

useEffect(() => {
    getDeck(setDeck);
}
, []);


    return (
        <div>
        <h3>APIcall</h3>
        {deck.remaining}
        {/* {getDeck()} */}
        <Card deckId={deck.deck_id}>
                <h4>Card</h4>
            </Card>
        </div>
    );
    }