// root > client > src > reducers > alert.js

//this is our alert reducer
// it will take in a state and an action
// an action will be dispatched from the actions file
// states in this example will have 
// an Id, msg and alertType

import {SET_ALERT, REMOVE_ALERT} from "../actions/types";

const initialState =[];


export default function(state = initialState, action) {
    //destruct
    const {type , payload} = action;
    
    
    // we will evaluation the type and return the right function
    switch(action.type) {
        case "SET_ALERT":
            return [...state, payload];
            //remember states are immutable
            //payload can be whatever we want
        case "REMOVE_ALERT":
            return state.filter(alert => alert.id !== payload);
            // return everything BUT the one we want to remove
            // when we update states, we want to update on a copy
            // when we remore states, its ok to work on the original!
        default:
            return state
    }
}