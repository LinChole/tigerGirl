import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { size } from '../../library/tools'

function Me(props) {
  const {
    children, fetching, items, error,
    getMe
  } = props
  useEffect(() => {
    getMe()
  }, [])
  if (fetching) return <h1 className='w3-container'>權限驗證中</h1>
  if (!size(items)) return '驗證失敗'
  return children
}

Me.propTypes = {
  children: PropTypes.element.isRequired,
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.object,
  error: PropTypes.string,
  getMe: PropTypes.func.isRequired
}

export default Me
