// root > client > src > actions > profile.js

import {setAlert} from "./alert";
import axios from "axios";

import {CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR,UPDATE_PROFILE,ACCOUNT_DELETED} from "./types"

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

        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"))

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

// add experience

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.put("/api/profile/experience", formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Experience Added", "sucess"))


        history.push("/dashboard");

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

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.put("/api/profile/education", formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Education Added", "sucess"))


        history.push("/dashboard");

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

// Delete experience

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Experience Removed","success"));

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


// Delete education

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Education Removed","success"));

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

// Delete Account

export const deleteAccount = id => async dispatch => {
    if (window.confirm("Are you sure?")) { // confirm if u want to delete
        try {
            const res = await axios.delete(`/api/profile`);
    
            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });
    
            dispatch(setAlert("Your account has been permanently deleted"));
    
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


}