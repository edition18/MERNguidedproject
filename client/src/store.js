// root > client > src > index.js

import { createStore, applyMiddleware } from "redux"; 
// we need a store for the state as well as the ability to add middleware to it
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
//the only middleware here
import rootReducer from "./reducers";
// we have have various reducers but we will be centralizing it in the reducers folder


const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store