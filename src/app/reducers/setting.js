import { LOCATION_CHANGE } from 'react-router-redux'
import {
  RESIZE_WINDOW,
  TOGGLE_SIDEBAR_VISIBILITY,
  CLOSE_SIDEBAR_VISIBILITY,
  OPEN_DROPDOWN_MENU,
  CLOSE_DROPDOWN_MENU,
  OPEN_CONFIRM,
  CLOSE_CONFIRM,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  PREV_STEP,
  NEXT_STEP,
  RESET_STEP,
  SET_ME,
  SET_HEADER_TITLE,
  GET_CODE,
  SET_CODE
} from '../actions'
import { containerMaxWidth, sidebarWidth } from 'Config'

export function sidebar(state = {
  left: false,
  right: false,
  docked: false,
  innerWidth: 0,
  title: ''
}, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return window.innerWidth > containerMaxWidth
        ? {
          ...state,
          left: true,
          right: window.innerWidth > containerMaxWidth + sidebarWidth,
          docked: true,
          innerWidth: window.innerWidth
        } : {
          ...state,
          left: false,
          right: false,
          docked: false,
          innerWidth: window.innerWidth
        }
    case TOGGLE_SIDEBAR_VISIBILITY:
      return {
        ...state,
        [action.anchor]: !state[action.anchor]
      }
    case CLOSE_SIDEBAR_VISIBILITY:
      const closeSidebarObj = {
        ...state,
        [action.anchor]: false
      }
      // console.log(!action.enforce,window.innerWidth > containerMaxWidth,containerMaxWidth)
      return !action.enforce
        ? window.innerWidth > containerMaxWidth
          ? state
          : closeSidebarObj
        : closeSidebarObj
      // return {
      //   ...state,
      //   [action.anchor]: false
      // }
    case LOCATION_CHANGE:
      return {
        ...state,
        title: '',
      }
    case SET_HEADER_TITLE:
      return {
        ...state,
        title: action.name
      }
    default:
      return state
  }
}

export function dropdownMenu(state = {
  open: false,
  anchorEl: null,
  anchorReference: 'anchorPosition', // anchorEl or anchorPosition,
  anchorPosition: {
    top: 200,
    left: 400
  },
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  content: null
}, action) {
  switch (action.type) {
    case OPEN_DROPDOWN_MENU:
      return {
        ...state,
        open: true,
        anchorEl: action.anchorEl,
        anchorPosition: {
          top: action.top,
          left: action.left
        },
        content: action.content
      }
    case CLOSE_DROPDOWN_MENU:
    case CLOSE_CONFIRM:
      return {
        ...state,
        open: false
      }
    default:
      return state
  }
}

export function confirm(state = {
  open: false,
  title: '',
  content: '',
  agreeFunc: null
}, action) {
  switch (action.type) {
    case OPEN_CONFIRM:
      return {
        ...state,
        open: true,
        title: '確認嗎？',
        content: action.content,
        agreeFunc: action.agreeFunc
      }
    case CLOSE_CONFIRM:
      return {
        ...state,
        open: false
      }
    default:
      return state
  }
}

export function dialog(state = {
  open: false,
  title: '',
  content: '',
  userClose: true,
  maxWidth: false,
  fullScreen: false
}, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        open: true,
        title: action.title,
        content: action.content,
        userClose: action.args.userClose,
        maxWidth: action.args.maxWidth,
        fullScreen: action.args.fullScreen
      }
    case CLOSE_DIALOG:
      return {
        ...state,
        open: false
      }
    default:
      return state
  }
}

export function snackbar(state = {
  open: false,
  content: ''
}, action) {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        open: true,
        content: action.content
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        open: false
      }
    default:
      return state
  }
}

export function step(state = {
  stepIndex: 0
}, action) {
  switch (action.type) {
    case PREV_STEP:
      let si = state.stepIndex
      return {
        ...state,
        stepIndex: si > 0 ? si - 1 : si
      }
    case NEXT_STEP:
      return {
        ...state,
        stepIndex: state.stepIndex + 1
      }
    case RESET_STEP:
      return {
        ...state,
        stepIndex: 0
      }
    default:
      return state
  }
}

export function validateCode(state = {
  fetching: false,
  items: null,
  error: ''
}, action) {
  switch (action.type) {
    case GET_CODE:
      return {
        ...state,
        fetching: true,
        items: null,
        error: ''
      }
    case SET_CODE:
      return {
        ...state,
        fetching: false,
        items: action.items,
        error: action.error
      }
    default:
      return state
  }
}