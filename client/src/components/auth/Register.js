import React, { Fragment, useState } from 'react'
import axios from "axios";
const Register = () => {

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
            console.log("password not match");
        } else {
            const newUser = {
                name,
                email,
                password
            }

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    } //post needs a content-type application/json
                }
    
                const body = JSON.stringify(newUser);
                const res = await axios.post("/api/users",body,config);

                console.log(res.data);
                //should be the data , being the auth token
            } catch (err) {
                console.error(err.response.data);
            }
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
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </Fragment>
    )
}

export default Register
