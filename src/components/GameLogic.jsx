
export default function CardCodetoValue(card) {
    if (card === "ACE") {
        return 1;
    } else if (card === "JACK") {
        return 11;
    } else if (card === "QUEEN") {
        return 12;
    } else if (card === "KING") {
        return 13;
    } else {
        return parseInt(card);
    }
}