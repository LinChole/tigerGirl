import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const ButtonLink = ({ to, children }) => {
  return (
    <Button color='inherit' component={Link} to={to}>{children}</Button>
  )
}

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default ButtonLink
