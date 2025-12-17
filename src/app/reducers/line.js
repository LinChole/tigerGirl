import {
  GET_LINE,
  SET_LINE,
  GET_ADM_MESSAGE,
  SET_ADM_MESSAGE,
  SUCCESS_DELETE_ADM_MESSAGE
} from '../actions/line'
import { formatDateTime,dtf } from '../library/tools'

const initState = {
  fetching: false,
  items: [],
  error: ''
}

export function line(state = initState, action) {
  switch (action.type) {
    case GET_LINE:
      return {
        ...state,
        fetching: true,
        items: [],
        error: ''
      }
    case SET_LINE:
      return {
        ...state,
        fetching: false,
        items: action.items.map((item) => ({
          ...item,
          startTime: item.startTime ? dtf(item.startTime, 'YYYY年MM月DD日',{ isRoc: true  }): null,
          // startTime: item.startTime ? dtf(item.startTime, 'YYYY年MM月DD日',{ exportRoc: true   }): null,
          endTime: item.endTime ? dtf(item.endTime,'YYYY年MM月DD日',{ isRoc: true  }) : null
          // endTime: item.endTime ? dtf(item.endTime,'YYYY年MM月DD日',{ exportRoc: true  }) : null
        })),
        items_en:action.items.map((item) => ({
          ...item,
          startTime: item.startTime ?dtf(item.startTime, 'YYYY-MM-DD') : null,
          endTime: item.endTime ? dtf(item.endTime, 'YYYY-MM-DD') : null
        })),
        error: action.error
      }
    default:
      return state
  }
}

export function message(state = initState, action) {
  switch (action.type) {
    case GET_ADM_MESSAGE:
      return {
        ...state,
        fetching: true,
        items: [],
        error: ''
      }
    case SET_ADM_MESSAGE:
      return {
        ...state,
        fetching: false,
        items: action.items.map(d => ({
          ...d,
          ReceiveTime: formatDateTime(d.ReceiveTime, { symbol: '-', isTime: true, isTimeCH: true })
        })),
        error: action.error
      }
    case SUCCESS_DELETE_ADM_MESSAGE:
      return {
        ...state,
        items: state.items.filter(f => f.RID !== action.rid)
      }
    default:
      return state
  }
}
