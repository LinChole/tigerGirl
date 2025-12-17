import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { orange, teal, green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import { clickToTop } from '../../library/table/events'

const colorObj = {
  orange, teal, green
}

function Fabs(props) {
  const { Icon, type, children, isTop, rank, color, position, disabled, size } = props
  const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(rank * 2 + (rank - 1) * 6),
      right: theme.spacing(2),
      zIndex: 1
    },
    color: {
      color: color && theme.palette.getContrastText(colorObj[color][500]),
      backgroundColor: color && colorObj[color][500],
      '&:hover': {
        backgroundColor: color && colorObj[color][700]
      }
    }
  }))

  const classes = useStyles()
  const handleToTop = () => {
    clickToTop(0)
  }
  const ele = (
    <Fab
      type={type}
      color='primary'
      className={classNames(classes.fab, { [classes.color]: color })}
      onClick={isTop ? handleToTop : null}
      disabled={disabled}
      size={size}
    ><Icon /></Fab>
  )
  return (
    children ? (
      <Tooltip title={children} placement={position}>
        {
          !disabled
            ? ele
            : <span>{ele}</span>
        }
      </Tooltip>
    ) : ele
  )
}

Fabs.defaultProps = {
  type: 'button',
  rank: 1
}

Fabs.propTypes = {
  Icon: PropTypes.object.isRequired,
  type: PropTypes.string,
  children: PropTypes.string,
  isTop: PropTypes.bool,
  rank: PropTypes.number,
  color: PropTypes.string,
  position: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string
}

export default Fabs
