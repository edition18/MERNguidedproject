// root > client > src > reducers > post.js

import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
} from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state = initialState,action) {
    const {type, payload} = action;

    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false 
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post),
                // for each post, check if they are the one we are on (by postId)
                // if so, just manipulate the likes property
                // if not map that post as it was
                loading: false
            }
        default:
            return state;
    }
    
}