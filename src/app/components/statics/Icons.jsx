import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Icons(props) {
  const { size, Icon, color, cursor, printDisabled, isInlineButton, onClick } = props
  const styles = {
    fontSize: size,
    verticalAlign: !isInlineButton
      ? 'middle'
      : 'bottom',
    margin: !isInlineButton
      ? '0 5px'
      : '0 5px 0 0',
    cursor: cursor
  }
  return (
    <Icon className={classNames(
      { [`w3-text-${color}`]: color },
      { 'noprint': printDisabled }
    )} style={styles} onClick={onClick} />
  )
}

Icons.defaultProps = {
  size: 25,
  cursor: 'auto'
}

Icons.propTypes = {
  size: PropTypes.number,
  Icon: PropTypes.object.isRequired,
  color: PropTypes.string,
  cursor: PropTypes.string,
  printDisabled: PropTypes.bool,
  isInlineButton: PropTypes.bool,
  onClick: PropTypes.func
}

export default Icons
