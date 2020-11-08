// root > client > src > components > routing > PrivateRoute.js

import React from 'react';
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
// we need to interact with auth state so need to { connect }

const PrivateRoute = ({component: Component, auth: {isAuthenticated, loading}, ...rest}) => (
    // a PrivateRoute component need to accept the component prop 
    // as well as any custom props passed into it
    // ...rest takes in any other arg passed in
    // we also destructed in auth property
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/login" />) : (<Component {...props} />)} />
    // if not authed and not loading , redirect to login, else go to the component with any props passed into it 
    // see the render function above
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps)(PrivateRoute)
