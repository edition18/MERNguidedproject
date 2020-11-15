//root > client > src > components > post > Post.js

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";


const Post = ({getPost, post: {post, loading}, match})=> {
    // we get the id from the url from props.match 
    // note that we had marked this dynamic input as :id in the routes
    // so react know where to look
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost]);
    
    
    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to="/posts" className="btn">Back to posts</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
    </Fragment>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps =  state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)
