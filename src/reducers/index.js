import { combineReducers } from "@reduxjs/toolkit";
import cartReducer, { addItem, removeItem, incrementItem, decrementItem } from "./cartReducer";


export{
    addItem,
    removeItem,
    incrementItem,
    decrementItem
}

export const rootReducer =  combineReducers({
    cart :cartReducer
})