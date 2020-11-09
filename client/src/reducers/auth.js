// root > client > src > reducers > auth.js

import {REGISTER_SUCCESS, REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,CLEAR_PROFILE} from "../actions/types";


//note that the initial state is a object
const initialState = {
    token: localStorage.getItem("token"),
    //we are going to get that token within local storage
    isAuthenticated: null,
    // false at first, but will change it to true if auth succcess
    loading: true,
    // true at first, but false when we have loaded the data
    user: null
    // null by default, but when we get the user data from auth this will be populated
} 

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload //the payload is the respoonse (less password)
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false  
            }
        default: 
            return state
    }
}