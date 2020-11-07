// root > client > src > actions > auth.js

import {setAlert} from "./alert";
import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_FAIL} from "./types";

// Register User

export const register = ({name, email, password}) => async dispatch => {
//we need async for dispatch since its going to be a async operation (dealing with backend)

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    } // this is needed since we sending data

    const body = JSON.stringify({ name,email,password});

    try {
        const res = await axios.post("/api/users", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
            // .data is an object that axios gets
        });
    } catch (err) {
        const errors = err.response.data.errors;
        //.response is an object that axios sends back on fail

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")));
        } //show an alert for each error

        dispatch({
            type: REGISTER_FAIL
        });
    }
}