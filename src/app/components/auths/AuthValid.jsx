import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { forwardTo } from '../../library/cookie'
import { DEFAULT_ROOT } from '../../actions/system'

function AuthValid(props) {
  const { children, items, pathname } = props
  useEffect(() => {
    !items.Valid && forwardTo(`${DEFAULT_ROOT}/chgpwd`)
  }, [pathname])
  return children
}

AuthValid.propTypes = {
  children: PropTypes.element,
  items: PropTypes.object,
  pathname: PropTypes.string.isRequired
}

export default AuthValid