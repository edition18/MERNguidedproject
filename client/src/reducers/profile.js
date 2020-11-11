// root > client > src > reducers > profile.js

import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE, GET_PROFILES,GET_REPOS } from "../actions/types";

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

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
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