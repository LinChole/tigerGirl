import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { obj2Query, cloneDict } from '../../library/tools'
import ListItemLink from './ListItemLink'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const NestedList = ({ main, name, anchor, nestData, setNestData, closeSidebarVisibility }) => {
  const classes = useStyles()
  const handleNestClick = (e) => {
    const val = e.target.innerText
    const copyNestData = cloneDict(nestData)
    const objValue = copyNestData[val]
    copyNestData[val] = !objValue
    setNestData(copyNestData)
  }
  const nestOpen = nestData[name]
  return (
    <Fragment>
      <ListItem button onClick={(e) => handleNestClick(e, name)}>
        <ListItemText primary={name} />
        {nestOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={nestOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {
            main.map((item, index) => {
              const { cid, oid, year, type, dn, page } = item
              const q = obj2Query({ cid, oid, lid: 0, year })
              const str = `${type}${dn !== '-' ? ` (${dn})` : ''}`
              return (
                <ListItemLink to={`${page}?${q}`} cn={classes.nested} func={() => closeSidebarVisibility(anchor)} key={index}>{str}</ListItemLink>
              )
            })
          }
        </List>
      </Collapse>
    </Fragment>
  )
}

NestedList.propTypes = {
  main: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired,
  nestData: PropTypes.object.isRequired,
  setNestData: PropTypes.func.isRequired,
  closeSidebarVisibility: PropTypes.func.isRequired
}

export default NestedList
