import {
  // 取得服務項目
  GET_PROJECT,
  SET_PROJECT,
  // 選擇項目
  SELECT_PROJECT,
  //取得服務子項目
  GET_SUBPROJECT,
  SET_SUBPOTJECT,
  // 選擇子項目
  SELECT_SUBPROJECT,
  //取得可選日期時間
  GET_PROJECT_DATETIME,
  SET_PROJECT_DATETIME,
  // 計算可選時間段
  GET_AVAILABLE_TIMES,
  SET_AVAILABLE_TIMES,
  // 選擇日期時間
  SELECT_DATETIME,
  // 確認預約資料
  GET_PROJECT_CONFIRM,
  SET_PROJECT_CONFIRM,
  // 送出預約內容
  SUBMIT_BOOKING,
  SUCCESS_SUBMIT_BOOKING,
  FINSH_SUBMIT_BOOKING
} from "../actions/booking"

const initialState = {
  fetching: false,
  pfetching: false,
  items: [],
  error: ''
}

export function project(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        fetching: true,
        items: [],
        error: ''
      }
    case SET_PROJECT:
      return {
        ...state,
        fetching: false,
        items: action.items.map(d => ({
          ...d,
          selected: false
        })),
        error: action.error
      }
    case SELECT_PROJECT:
      return {
        ...state,
        items: state.items.map(d =>
          d.id === action.id ?
            ({
              ...d,
              selected: !d.selected
            }) : {
              ...d,
              selected: false
            })
      }
    default:
      return state
  }
}

export function subproject(state = initialState, action) {
  switch (action.type) {
    case GET_SUBPROJECT:
      return {
        ...state,
        fetching: true,
        items: [],
        error: ''
      }
    case SET_SUBPOTJECT:
      return {
        ...state,
        fetching: false,
        items: action.items.map(d => ({
          ...d,
          selected: false
        })),
        error: action.error
      }
    case SELECT_SUBPROJECT:
      return {
        ...state,
        items: state.items.map(d =>
          d.id === action.id ?
            ({
              ...d,
              selected: !d.selected
            }) : {
              ...d,
              selected: false
            })
      }
    default:
      return state
  }
}

const dateTimeInitialState = {
  fetching: false,
  pfetching: false,
  items: [],   // 可選日期 [{id, date}]
  times: [],   // 計算後的可選時間段 [{id, time, selected}]
  error: ''
}

export function projectDateTime(state = dateTimeInitialState, action) {
  switch (action.type) {
    case GET_PROJECT_DATETIME:
      return {
        ...state,
        fetching: true,
        items: [],
        times: [],
        error: ''
      }
    case SET_PROJECT_DATETIME:
      return {
        ...state,
        fetching: false,
        items: action.items,
        error: action.error
      }
    case GET_AVAILABLE_TIMES:
      return {
        ...state,
        fetching: true,
        times: [],
        error: ''
      }
    case SET_AVAILABLE_TIMES:
      return {
        ...state,
        fetching: false,
        times: action.times.map(d => ({ ...d, selected: false })),
        error: action.error
      }
    case SELECT_DATETIME:
      return {
        ...state,
        times: state.times.map(d =>
          d.id === action.id ?
            ({ ...d, selected: !d.selected }) :
            { ...d, selected: false }
        )
      }
    default:
      return state
  }
}


export function projectConfirm(state = { ...initialState, items: {} }, action) {
  switch (action.type) {
    case GET_PROJECT_CONFIRM:
      return {
        ...state,
        fetching: true,
        items: {},
        error: ''
      }
    case SET_PROJECT_CONFIRM:
      return {
        ...state,
        fetching: false,
        items: action.items
      }
    case SUBMIT_BOOKING:
      return {
        ...state,
        pfetching: true
      }
    case SUCCESS_SUBMIT_BOOKING:
    case FINSH_SUBMIT_BOOKING:
      return {
        ...state,
        pfetching: false
      }
    default:
      return state
  }
}