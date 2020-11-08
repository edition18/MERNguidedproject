// root > client > src > components > Dashboard.js


import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/profile";

const Dashboard = ({ getCurrentProfile, auth, profile })=> {
    useEffect(() => {
        getCurrentProfile();
    }, []); 
    // use hooks/useEffect to call get current profile when Dashboard loads
    // the [] is there to ensure it only loads once, doesnt loop

    return <div>Dashboard</div>
}

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
