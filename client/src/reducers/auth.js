// root > client > src > reducers > auth.js

import {REGISTER_SUCCESS, REGISTER_FAIL} from "../actions/types";

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
        case REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default: 
            return state
    }
}