// root > client > src > reducers > profile.js

import { PROFILE_ERROR, GET_PROFILE } from "../actions/types";

const initialState = {
    profile: null, 
    //when we login, we will get all the profile data
    //if we visit another users page, we will also get their profile
    profiles: [],
    //list of developers
    repos: [],
    //when we fetch the github repos
    loading: true,
    error: []
    // for any error objects
}

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };       
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;

    }

}