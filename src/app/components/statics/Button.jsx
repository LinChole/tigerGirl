import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { left } from '../../library/tools'
import Tooltip from '@material-ui/core/Tooltip'

function Button(props) {
  let { to, type, id, color, isBorder, padding, download, onClick, disabled, full, title, children, target, isMargin } = props
  isBorder = isBorder || color === 'light-gray'
  const btnContent = (
    <button
      type={type}
      id={id}
      className={classNames(`w3-button w3-round w3-${color}`, {
        'w3-border': isBorder,
        [`w3-padding-${padding}`]: padding,
        'w3-disabled': disabled,
        'fw-w-100': full,
        'w3-section-4': isMargin
      })}
      onClick={onClick}
      disabled={disabled}
    >{children}</button>
  )
  const Comp = to
    ? left(to, 4) !== 'http'
      ? <Link to={to}>{btnContent}</Link>
      : <a href={to} target={target} download={download}>{btnContent}</a>
    : btnContent
  return !title
    ? Comp
    : <Tooltip title={title}>{Comp}</Tooltip>
}

Button.defaultProps = {
  type: 'button',
  color: 'light-gray',
  isBorder: false,
  target: '_blank'
}

Button.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
  isBorder: PropTypes.bool,
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  download: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  full: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  target: PropTypes.string,
  isMargin: PropTypes.bool
}

export default Button
