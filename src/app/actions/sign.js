import action from '../library/action'

// 登入
export const LOGIN = 'LOGIN'
export const login = (target) => action(LOGIN, { target })

// 登入結果
export const SET_LOGIN = 'SET_LOGIN'
export const setLogin = () => action(SET_LOGIN)

// 登出
export const LOGOUT = 'LOGOUT'
export const logout = () => action(LOGOUT)

// 刷新
export const REFRESH = 'REFRESH'
export const refresh = () => action(REFRESH)

// 刷新成功
export const SUCCESS_REFRESH = 'SUCCESS_REFRESH'
export const successRefresh = () => action(SUCCESS_REFRESH)