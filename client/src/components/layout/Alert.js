// root > client > components > layout > Alert.js

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    //we destructed props.alerts to simply { alert } here
    // we already know that each alert has a id property, msg and alertType property based on the payload
    // whenever we map these sort of list we need to have a key which reflects their uniquer id
    
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
));

alert.propTypes = {
    alerts: PropTypes.array.isRequired
    // technically not a mandatory part of the app
};

const mapStateToProps = state => ({
    alerts: state.alert // to get the state within alert
    // array of alerts
    // for each redux state recieved from rootreducer
    // with that state from the index.js combinedReducer
    // in this case we are only interested in the alert reducer
    // with this props.alert is available to us, but we destruct it instead
})

export default connect(mapStateToProps)(Alert)
//connect takes in two things
// 1. any states u wanna connect 
// 2. object with any action you want to use (in this case none)
