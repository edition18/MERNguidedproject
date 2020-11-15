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
                profile: null,
                // We found a security flaw in this app. If a guest user browses a dev profile and then registers, the browsed users profile data is still in the "profile" state and the newly registered user then sees and can edit the users info
                // There are many ways to handle this, the easiest being to clear that "profile" state when no profile is found for the new user.
                // In the profile reducer (reducers/profile.js), in the PROFILE_ERROR case, add profile: null
                error: payload,
                loading: false
            };
        default:
            return state;

    }

}