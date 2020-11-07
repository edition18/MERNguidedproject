// root > client > src > actions > alert.js

import {SET_ALERT, REMOVE_ALERT} from "./types";
import uuid from "uuid"

export const setAlert = (msg, alertType) => dispatch => {
    // double arrows possible through thunk
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    }) 
}