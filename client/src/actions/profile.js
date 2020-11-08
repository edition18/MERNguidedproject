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