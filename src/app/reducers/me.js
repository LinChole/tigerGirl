import {
  GET_ME,
  SET_ME,
  TOGGLE_PROFILE,
  CLOSE_PROFILE
} from '../actions'
import { dtf, size } from '../library/tools'

const initState = {
  fetching: false,
  items: {},
  error: '',
}
export function me(state = initState, action) {
  switch (action.type) {
    case GET_ME:
      if (action.wakeUp) {
        return state
      }
      return {
        ...state,
        open: false,
        fetching: true,
        items: {},
        error: '',
      }
    case SET_ME:
      if (size(action.items)) {
        const { LastLoginDT } = action.items
        return {
          ...state,
          fetching: false,
          items: {
            ...action.items,
            // ...action.user,
            LastLoginDT: LastLoginDT ? dtf(LastLoginDT, 'YYYY-MM-DD HH:mm:ss') : null
          },
        }
      } else return {
        ...state,
        fetching: false
      }
    case TOGGLE_PROFILE:
      return {
        ...state,
        open: !state.open
      }
    case CLOSE_PROFILE:
      return {
        ...state,
        open: false
      }
    default:
      return state
  }
}
