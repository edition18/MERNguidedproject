// root > client > src > App,js

import React, {Fragment , useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import AddExperience from "./components/profile-forms/AddExperience"
import AddEducation from "./components/profile-forms/AddEducation"
import Profiles from "./components/profiles/Profiles"
import './App.css';
// Redux
import {Provider} from "react-redux";
// redux is seperate from react
// the provider can combine them together
import store from "./store";
import {loadUser} from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";


if(localStorage.token) { 
  setAuthToken(localStorage.token);
}//on app load we must have the token as a header

const App = () => {
  useEffect(()=> {
    store.dispatch(loadUser());
  }, []); 
  // when the state updates, useEffect will keep running
  // the [] second param forces it to only run once 
  // component did mount, if u add stuff into the [] it will force 
  // it to run only at certain props / states
  //READ UP:life cycle methods react components (class only)
  //component did mount
  //exact keyword is used only when you want to render a component when there is an exact match of route.
return (
  <Provider store={store}>
  <Router>
  <Fragment> 
    <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch> 
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/add-experience" component={AddExperience} />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
        </Switch> 
      </section>
  </Fragment>
  </Router>
  </Provider>
)}
//Fragment is an invisiable element in DOM
//SWITCH can only have routes

export default App;
