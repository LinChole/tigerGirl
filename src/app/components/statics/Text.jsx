import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { left } from '../../library/tools'

function Text(props) {
  const { color, children, strong, bColor, to, del, italic, download, size, cursor, panel, underline } = props
  const cn = classNames(
    { [`w3-text-${color}`]: color && !to },
    { [`w3-${bColor}`]: bColor },
    { 'fw-del': del },
    { 'fw-italic': italic },
    { [`w3-${size}`]: size },
    { 'w3-panel w3-leftbar w3-padding-12 w3-block': panel },
    { 'fw-underline': underline }
  )
  const styles = {
    cursor: cursor
  }
  const cnt = !strong
    ? <span className={cn} style={styles}>{children}</span>
    : <strong className={cn} style={styles}>{children}</strong>
  const Comp = to
    ? left(to, 4) !== 'http'
      ? (
        <Link to={to} className={
          classNames('fw-a',
            { 'w3-text-blue w3-hover-red': !color },
            { [`w3-hover-text-white w3-hover-red w3-text-${color}`]: color }
          )
        } download={download} target={download ? '_blank' : null}>{children ? cnt : to}</Link>
      ) : (
        <a href={to} target='_blank' className={
          classNames('fw-a',
            { 'w3-text-blue w3-hover-red': !color },
            { [`w3-hover-text-white w3-hover-red w3-text-${color}`]: color }
          )
        } download={download}>{children ? cnt : to}</a >
      )
    : cnt
  return Comp
}

Text.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
  strong: PropTypes.bool,
  bColor: PropTypes.string,
  to: PropTypes.string,
  del: PropTypes.bool,
  italic: PropTypes.bool,
  download: PropTypes.bool,
  size: PropTypes.string,
  cursor: PropTypes.string,
  panel: PropTypes.bool,
  underline: PropTypes.bool
}

export default Text
