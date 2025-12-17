import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { forwardTo } from '../../library/cookie'
import { defaultRoot } from 'Config'
import { intersectionArray } from '../../library/tools'

function AuthRole(props) {
  const { children, items, pathname, role } = props
  const intersection = intersectionArray(role, items.Role).length
  useEffect(() => {
    !intersection && forwardTo(defaultRoot)
  }, [pathname])
  return !!intersection ? children : '沒有權限'
}

AuthRole.defaultProps = {
  role: ['A']
}

AuthRole.propTypes = {
  children: PropTypes.element,
  items: PropTypes.object,
  pathname: PropTypes.string.isRequired,
  role: PropTypes.array.isRequired
}

export default AuthRole