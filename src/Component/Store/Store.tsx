import CartReducer from "./Reducer";
import { createStore } from "redux";

export const store = createStore(CartReducer)