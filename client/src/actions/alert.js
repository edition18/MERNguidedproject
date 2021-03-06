// root > client > src > actions > alert.js

import {SET_ALERT, REMOVE_ALERT} from "./types";
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    // double arrows possible through thunk
    const id = uuidv4();
    dispatch({ //this is the action that dispatches  the state
        type: SET_ALERT,
        payload: {msg, alertType, id}
    }); 

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}