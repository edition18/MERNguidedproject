// root > client > src > components > dashboard > Education.js

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment"
import {connect} from "react-redux"

const Education =  ({ education }) => {
    // we want experience passed on from Parent Dashboard.js
    // experience now becomes a prop

    const educations = education.map(edu => (
        <tr key={edu._id}>
          <td>{edu.company}</td>
          <td className="hide-sm">{edu.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
            {edu.to === null ? ( 
              ' Now'
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )} 
          </td>
          <td>
            <button
              //onClick={() => deleteeducation(edu._id)}
              //className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));

    return (
        // hide-sm hides the element on mobile screens
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th> 
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
  education: PropTypes.array.isRequired
}

export default Education

