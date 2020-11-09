// root > client > src > actions > profile.js

import {setAlert} from "./alert";
import axios from "axios";

import {GET_PROFILE, PROFILE_ERROR} from "./types"

//GET current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data
            //res.data in this case is a profile
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

// create or update profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
    // history object has a method called push
    // will redirect us to a client side route
    // edit boolean tells us if we are creating or editing a profile
    // false by default

    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.post("/api/profile", formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"))

        if(!edit) {
            history.push("/dashboard");
        } 

        // redirecting in an ACTION needs to use this history.push() method
        // rather than the redirect in the HTML we used
    } catch (err) {
        const errors = err.response.data.errors;
        

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")));
        } 

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

