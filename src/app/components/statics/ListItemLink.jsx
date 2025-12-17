import React, { useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink,useLocation } from 'react-router-dom'
import classNames from 'classnames'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { drawerActiveColor } from 'Config'
import { left } from '../../library/tools'




// const ListItemLink = React.forwardRef(( props, ref ) => {
function ListItemLink(props) {
  const { to, Icon, children, secondary, func } = props
  const location = useLocation()
  const isOutLink = left(to, 4) === 'http'
  const opt = !isOutLink ? {
    to,
    // selected,
    // activeClassName: `active ${drawerActiveColor}`,
    // onlyActiveOnIndex: true,
    onClick: func
  } : { href: to }
  return (
    <ListItem
      button
      component={!isOutLink ? Link : 'a'}
      // selected={!location.pathname.indexOf(to)}
      {...opt}
    >
      {Icon && <ListItemIcon><Icon /></ListItemIcon>}
      <ListItemText primary={children} secondary={secondary} />
    </ListItem>
  )

}
// )
ListItemLink.propTypes = {
  to: PropTypes.string.isRequired,
  Icon: PropTypes.object,
  children: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  func: PropTypes.func
}

export default ListItemLink
