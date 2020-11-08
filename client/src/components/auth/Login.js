import React, { Fragment, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {login} from "../../actions/auth";
import auth from '../../reducers/auth';

const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    // formData is the values, we have set them as default ""
    //setFormData allows us to set the values
    });

    const {email,password} = formData;
    //destruct

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    // the brackets create a key
    // this allows us to retain the current formData Object but changing only 1 state variable 
    // .target is a html variable, it is the element that had triggered the event
    // a new state instance is being created with this

    const onSubmit = async e => {
        e.preventDefault(); //prevent default submit behavior
        login(email, password);
    }

    //redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
        // Redirect is a react router dom item
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign in</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password} onChange={e => onChange(e)} required
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't already have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool //ptb
}

const mapStateToProps = state => ({
    //bring in the state into the props of this components
    isAuthenticated: state.auth.isAuthenticated
    // i am only interested in the isAuthenticated boolean
})

export default connect(mapStateToProps, { login })(Login)
