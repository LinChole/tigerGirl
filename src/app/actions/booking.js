import action from '../library/action'


// 會員建立預約
export const ADD_BOOKING = 'ADD_BOOKING'
export const addBooking = (data) => action(ADD_BOOKING, { data })

export const SUCCESS_ADD_BOOKING = 'SUCCESS_ADD_BOOKING'
export const successAddBooking = () => action(SUCCESS_ADD_BOOKING)

export const FINSH_ADD_BOOKING = 'FINSH_ADD_BOOKING'
export const finshAddBooking = (error = '') => action(FINSH_ADD_BOOKING, { error })
