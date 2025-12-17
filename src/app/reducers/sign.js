import {
  LOGIN,
  SET_LOGIN,
  REFRESH,
  SUCCESS_REFRESH
} from '../actions'

const initState = {
  fetching: false,
  items: null,
  error: ''
}

export function sign(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        refreshing: false,
        pfetching: true
      }
    case SET_LOGIN:
      return {
        ...state,
        pfetching: false
      }
    case REFRESH:
      return {
        ...state,
        refreshing: true
      }
    case SUCCESS_REFRESH:
      return {
        ...state,
        refreshing: false
      }
    default:
      return state
  }
}
