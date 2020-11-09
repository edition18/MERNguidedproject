// root > client > src > components > Dashboard.js

import React, { useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/profile";
import Spinner from "../layout/Spinner"

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: {profile, loading} })=> {
    useEffect(() => {
        getCurrentProfile();
    }, []); 
    // use hooks/useEffect to call get current profile when Dashboard loads
    // the [] is there to ensure it only loads once, doesnt loop

    return loading && profile === null ? (<Spinner />) : (<Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name} 
      </p>
        {profile !== null ? (
            <Fragment>has</Fragment>
        ) : (
            <Fragment>
                <p>You do not have an profile yet, please set up</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
                </Link>
            </Fragment>
        )}

    </Fragment>);
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)
