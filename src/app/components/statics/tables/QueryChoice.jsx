import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { obj2Query } from '../../../library/tools'

function QueryChoice(props) {
  const { cid, ccid, year, choice, page } = props
  return choice.map((option, index) => (
    <Fragment key={index}>
      <Link to={`${page}/${cid}/${ccid}?${obj2Query({
        year,
        status: index
      })}`} className='w3-text-blue fw-a fw-keepall'>{option}</Link>
      {(index < choice.length - 1) && '‧'}
    </Fragment>
  ))
}

QueryChoice.propTypes = {
  cid: PropTypes.number.isRequired,
  ccid: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  choice: PropTypes.array.isRequired,
  page: PropTypes.string.isRequired
}

export default QueryChoice