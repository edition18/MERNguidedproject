// root > client > src > components > dashboard > Education.js

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment"
import { deleteEducation } from "../../actions/profile";
import { connect } from "react-redux";


const Education = ({ education, deleteEducation}) => {
    // we want Education passed on from Parent Dashboard.js
    // Education now becomes a prop
    // here react is keeping track if getCurrentProfile has changed and will run getCurrentProfile()
    //in our case it never changes, so no difference

    const educations = education.map(edu => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td className="hide-sm">{edu.degree}</td>
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
              onClick={() => deleteEducation(edu._id)}
              className="btn btn-danger"
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
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
