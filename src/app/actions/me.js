import action from '../library/action'

// 取得個人資料
export const GET_ME = 'GET_ME'
export const getMe = (wakeUp) => action(GET_ME, { wakeUp })

export const SET_ME = 'SET_ME'
export const setMe = (items) => action(SET_ME, { items })

// 輸入修改資料
export const CHG_USER_INFO = 'CHG_USER_INFO'
export const chgUserInfo = (name, value) => action(CHG_USER_INFO, { name, value })

// 更新個人資訊
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const updateUserInfo = () => action(UPDATE_USER_INFO)

export const SUCCESS_UPDATE_USER_INFO = 'SUCCESS_UPDATE_USER_INFO'
export const successUpdateUserInfo = () => action(SUCCESS_UPDATE_USER_INFO)

export const FINSH_UPDATE_USER_INFO = 'FINSH_UPDATE_USER_INFO'
export const finshUpdateUserInfo = () => action(FINSH_UPDATE_USER_INFO)

// 切換開關Header個人檔案
export const TOGGLE_PROFILE = 'TOGGLE_PROFILE'
export const toggleProfile = () => action(TOGGLE_PROFILE)

// 關閉Header個人檔案
export const CLOSE_PROFILE = 'CLOSE_PROFILE'
export const closeProfile = () => action(CLOSE_PROFILE)