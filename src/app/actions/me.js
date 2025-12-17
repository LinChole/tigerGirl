import action from '../library/action'

export const GET_ME = 'GET_ME'
export const getMe = (wakeUp) => action(GET_ME, { wakeUp })

export const SET_ME = 'SET_ME'
export const setMe = (items) => action(SET_ME, { items })

// 切換開關Header個人檔案
export const TOGGLE_PROFILE = 'TOGGLE_PROFILE'
export const toggleProfile = () => action(TOGGLE_PROFILE)

// 關閉Header個人檔案
export const CLOSE_PROFILE = 'CLOSE_PROFILE'
export const closeProfile = () => action(CLOSE_PROFILE)