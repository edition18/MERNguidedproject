// root > client > src > actions > auth.js

import {setAlert} from "./alert";
import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,CLEAR_PROFILE} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
    // if token in local storage, always send it with the global header
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get("/api/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data 
        })
        // pass on the user information 
        // we got from the /api/auth
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }

}


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

        dispatch(loadUser());
        //we want to load the User once we have registered
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


// Login user
export const login = (email, password) => async dispatch => {
    //we need async for dispatch since its going to be a async operation (dealing with backend)
    
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        } // this is needed since we sending data
    
        const body = JSON.stringify({email,password});
    
        try {
            const res = await axios.post("/api/auth", body, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
                // .data is an object that axios gets
            });

            dispatch(loadUser());
            //we want to load the User once we have login
        } catch (err) {
            const errors = err.response.data.errors;
            //.response is an object that axios sends back on fail
    
            if(errors) {
                errors.forEach(error => dispatch(setAlert(error.msg,"danger")));
            } //show an alert for each error
    
            dispatch({
                type: LOGIN_FAIL
            });
        }
    }


    // logout / clear profile

    export const logout = () => dispatch => {
        dispatch({type: CLEAR_PROFILE});
        dispatch({type: LOGOUT});
    };