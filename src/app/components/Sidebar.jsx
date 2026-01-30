import React, { useState, useEffect, Fragment, useRef } from "react"
import { Link } from 'react-router-dom'

import PropTypes from "prop-types"
import classNames from "classnames"


import { makeStyles } from "@material-ui/core/styles"

import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListSubheader from "@material-ui/core/ListSubheader"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"

import HomeIcon from '@material-ui/icons/Home'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import ListAltIcon from '@material-ui/icons/ListAlt'
import Toolbar from '@material-ui/core/Toolbar'
import TodayIcon from '@material-ui/icons/Today'
import SettingsIcon from '@material-ui/icons/Settings'

import { size } from "../library/tools"

import { sidebarWidth } from "Config"



const useStyles = makeStyles((theme) => ({
  sideBar: {
    marginTop: 50,
    [theme.breakpoints.down("sm")]: {
      marginTop: 50,
    }
  },
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: sidebarWidth,
  },
  toolbar: theme.mixins.toolbar,
  banner: {
    padding: theme.spacing(5, 0)
  },
}));

const iconSet = {
  HomeIcon,
  ListAltIcon,
  ImportContactsIcon,
  TodayIcon,
  SettingsIcon
};

function HideOnScroll(props) {
  const { docked, children } = props;
  const trigger = useScrollTrigger();
  return !trigger && docked && children;
}

HideOnScroll.propTypes = {
  docked: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

function Sidebar(props) {
  const classes = useStyles();
  const {
    fetching,
    anchor,
    open,
    docked,
    left, routing,
    menu,
    getMe,
    closeSidebarVisibility
  } = props;


  useEffect(() => {
    getMe()
  }, [])


  return (
    <Drawer
      anchor={anchor}
      className={classes.drawer}
      variant={docked ? "persistent" : "temporary"}
      // variant="persistent"
      open={open}
      onClose={() => closeSidebarVisibility(anchor)}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div
        onClick={() => closeSidebarVisibility(anchor)}
        onKeyDown={() => closeSidebarVisibility(anchor)}
      >

        {/* <HideOnScroll {...props}> */}
        <div className={classNames({ [classes.banner]: docked })} />
        {/* </HideOnScroll> */}
        {(() => {
          // if (fetching) return <Loading full>資料請求中</Loading>;
          if (!size(menu)) return <div className="w3-container">請先登入</div>;
          return menu.map((item, index) => {
            const { name, content } = item;

            return (
              <Fragment key={index}>
                <List key={index} subheader={
                  <ListSubheader component='div' id='nested-list-subheader' disableSticky >
                    {name}
                  </ListSubheader>
                }>
                  {/* {content.map((lst, index2) => {
                    const Icon = iconSet[lst.Icon];
                    return (
                      <ListItemLink to={lst.page} Icon={Icon} key={index2}
                      // selected
                      >
                        {lst.name}
                      </ListItemLink>
                    );
                  })} */}
                </List>
                {menu.length > index + 1 && <Divider />}
              </Fragment>
            );
          });
        })()}
      </div>
    </Drawer>
  );
}

Sidebar.propTypes = {
  fetching: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  menu: PropTypes.array,
  closeSidebarVisibility: PropTypes.func.isRequired,
};

export default Sidebar;
