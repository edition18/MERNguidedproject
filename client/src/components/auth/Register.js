import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import PropTypes from 'prop-types'



const Register = ({setAlert}) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    // formData is the values, we have set them as default ""
    //setFormData allows us to set the values
    });

    const {name,email,password,password2} = formData;
    //destruct

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    // the brackets create a key
    // this allows us to retain the current formData Object but changing only 1 state variable 
    // .target is a html variable, it is the element that had triggered the event
    // a new state instance is being created with this

    const onSubmit = async e => {
        e.preventDefault(); //prevent default submit behavior
        if(password !== password2) {
            setAlert("password not match","danger",3000);
        } else {
            console.log("ok");
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
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
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2} onChange={e => onChange(e)} required
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(Register);

//connect takes in two things
// 1. any states u wanna connect
// 2. object with any action you want to use
// with the setAlert passed, we would be able to access props.setAlert
