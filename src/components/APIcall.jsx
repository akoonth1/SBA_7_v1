

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

export const DeckContext = createContext(null);

export const getDeck = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: "An error occurred" };
    }
}

