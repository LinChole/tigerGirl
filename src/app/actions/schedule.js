import action from '../library/action'

// 會員取得預約資料
export const GET_SCHEDULE = 'GET_SCHEDULE'
export const getSchedule = () => action(GET_SCHEDULE)

export const SET_SCHEDULE = 'SET_SCHEDULE'
export const setSchedule = (items, error = '') => action(SET_SCHEDULE, { items, error })

// 會員取消預約
export const CANCEL_SCHEDULE = 'CANCEL_SCHEDULE'
export const cancelSchedule = (oid) => action(CANCEL_SCHEDULE, { oid })

export const SUCCESS_CANCEL_SCHEDULE = 'SUCCESS_CANCEL_SCHEDULE'
export const successCancelSchedule = (oid) => action(SUCCESS_CANCEL_SCHEDULE, { oid })

export const FINSH_CANCEL_SCHEDULE = 'FINSH_CANCEL_SCHEDULE'
export const finshCancelSchedule = (msg = '') => action(FINSH_CANCEL_SCHEDULE, { msg })