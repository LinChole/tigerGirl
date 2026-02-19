import action from '../library/action'

// -------project-------
// 取得服務項目
export const GET_PROJECT = 'GET_PROJECT'
export const getProject = () => action(GET_PROJECT)

export const SET_PROJECT = 'SET_PROJECT'
export const setProject = (items, error = '') => action(SET_PROJECT, { items, error })

// 選擇服務項目
export const SELECT_PROJECT = 'SELECT_PROJECT'
export const selectProject = (id) => action(SELECT_PROJECT, { id })

//取得服務子項目
export const GET_SUBPROJECT = 'GET_SUBPROJECT'
export const getSubproject = (pid) => action(GET_SUBPROJECT, { pid })

export const SET_SUBPOTJECT = 'SET_SUBPOTJECT'
export const setSubproject = (items, error = '') => action(SET_SUBPOTJECT, { items, error })

// 選擇子項目
export const SELECT_SUBPROJECT = 'SELECT_SUBPROJECT'
export const selectSubproject = (id) => action(SELECT_SUBPROJECT, { id })

// -------dateTime-------
//取得可選日期時間
export const GET_PROJECT_DATETIME = 'GET_PROJECT_DATETIME'
export const getProjectDateTime = () => action(GET_PROJECT_DATETIME)

export const SET_PROJECT_DATETIME = 'SET_PROJECT_DATETIME'
export const setProjectDateTime = (items, error = '') => action(SET_PROJECT_DATETIME, { items, error })

export const SELECT_DATETIME = 'SELECT_DATETIME'
export const selectDateTime = (id) => action(SELECT_DATETIME, { id })

// 計算可選時間段
export const GET_AVAILABLE_TIMES = 'GET_AVAILABLE_TIMES'
export const getAvailableTimes = (date) => action(GET_AVAILABLE_TIMES, { date })

export const SET_AVAILABLE_TIMES = 'SET_AVAILABLE_TIMES'
export const setAvailableTimes = (times, error = '') => action(SET_AVAILABLE_TIMES, { times, error })

// 確認預約資料
export const GET_PROJECT_CONFIRM = 'GET_PROJECT_CONFIRM'
export const getProjectConfirm = () => action(GET_PROJECT_CONFIRM)

export const SET_PROJECT_CONFIRM = 'SET_PROJECT_CONFIRM'
export const setProjectConfirm = (items) => action(SET_PROJECT_CONFIRM, { items })

// 送出預約內容
export const SUBMIT_BOOKING = 'SUBMIT_BOOKING'
export const submitBooking = () => action(SUBMIT_BOOKING)

export const SUCCESS_SUBMIT_BOOKING = 'SUCCESS_SUBMIT_BOOKING'
export const successSubmitBooking = () => action(SUCCESS_SUBMIT_BOOKING)

export const FINSH_SUBMIT_BOOKING = 'FINSH_SUBMIT_BOOKING'
export const finshSubmitBooking = () => action(FINSH_SUBMIT_BOOKING)
