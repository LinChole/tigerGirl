import {
  // 取得個人資料
  GET_ME,
  SET_ME,
  // 輸入修改資料
  CHG_USER_INFO,
  // 更新資料
  UPDATE_USER_INFO,
  SUCCESS_UPDATE_USER_INFO,
  FINSH_UPDATE_USER_INFO,
  TOGGLE_PROFILE,
  CLOSE_PROFILE
} from '../actions'
import { dtf, size } from '../library/tools'

const initState = {
  fetching: false,
  pfetching: false,
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
    case CHG_USER_INFO:
      return {
        ...state,
        items: {
          ...state.items,
          [action.name]: action.value
        }
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        pfetching: true,
      }
    case SUCCESS_UPDATE_USER_INFO:
    case FINSH_UPDATE_USER_INFO:
      return {
        ...state,
        pfetching: false,
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
