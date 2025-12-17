import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import ArrowTooltipIcons from './ArrowTooltipIcons'
import Icons from './Icons'

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5)
  }
}))

function Chips(props) {
  const classes = useStyles()
  const { color, children, onClick, onDelete, variant, onContextMenu, Icon, message, IconColor } = props
  return (
    <Chip
      avatar={Icon && <Avatar>{
        !message
          ? <Icons Icon={Icon} color={IconColor} cursor='auto' />
          : <ArrowTooltipIcons Icon={Icon} color={IconColor}>{message}</ArrowTooltipIcons>
      }</Avatar>}
      label={children}
      className={classNames(classes.chip, { [`w3-${color}`]: color })}
      onClick={onClick}
      onDelete={onDelete}
      variant={variant}
    />
  )
}

Chips.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  variant: PropTypes.oneOf([
    'default', 'outlined'
  ]),
  onContextMenu: PropTypes.func,
  Icon: PropTypes.object,
  message: PropTypes.string,
  IconColor: PropTypes.string
}

export default Chips
