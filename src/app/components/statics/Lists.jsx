import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const LabelArray = ({ classes, name, color }) => {
  return (
    <ListItem button className={classes.nested}>
      <ListItemText primary={name} classes={{ primary: color }} />
    </ListItem>
  )
}

const Lists = ({ background, color, open, docked, labelArray, onClickToggle, onClickOpen, onClickClose }) => {
  const classes = useStyles()
  return (
    <List component='nav' dense={!docked} onMouseEnter={onClickOpen} onMouseLeave={onClickClose}>
      <ListItem button onClick={onClickToggle}>
        <ListItemText primary={labelArray[0]} classes={{ primary: color }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit className={`fw-fixed ${background}`}>
        <List component='div' disablePadding>
          {
            labelArray.filter((_, i) => i > 0).map((name, index) => {
              return (
                <LabelArray classes={classes} name={name} color={color} key={index} />
              )
            })
          }
        </List>
      </Collapse>
    </List>
  )
}

Lists.propTypes = {
  background: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  labelArray: PropTypes.array.isRequired,
  onClickToggle: PropTypes.func.isRequired,
  onClickOpen: PropTypes.func.isRequired,
  onClickClose: PropTypes.func.isRequired
}

LabelArray.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default Lists
