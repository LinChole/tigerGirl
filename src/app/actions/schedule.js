import action from '../library/action'

// 會員取得預約資料
export const GET_SCHEDULE = 'GET_SCHEDULE'
export const getSchedule = () => action(GET_SCHEDULE)

export const SET_SCHEDULE = 'SET_SCHEDULE'
export const setSchedule = (items, error = '') => action(SET_SCHEDULE, { items, error })