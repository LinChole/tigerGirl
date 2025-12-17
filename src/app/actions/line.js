import action from '../library/action'

export const GET_LINE = 'GET_LINE'
export const getLine = (CID) => action(GET_LINE, {CID})

export const SET_LINE = 'SET_LINE'
export const setLine = (items, error = '') => action(SET_LINE, { items, error })

// 取得管理端評論
export const GET_ADM_MESSAGE = 'GET_ADM_MESSAGE'
export const getAdmMessage = (cid) => action(GET_ADM_MESSAGE, { cid })

export const SET_ADM_MESSAGE = 'SET_ADM_MESSAGE'
export const setAdmMessage = (items, error = '') => action(SET_ADM_MESSAGE, { items, error })

export const DELETE_ADM_MESSAGE = 'DELETE_ADM_MESSAGE'
export const deleteAdmMessage = (cid, rid) => action(DELETE_ADM_MESSAGE, { cid, rid })

export const SUCCESS_DELETE_ADM_MESSAGE = 'SUCCESS_DELETE_ADM_MESSAGE'
export const successDeleteAdmMessage = (rid) => action(SUCCESS_DELETE_ADM_MESSAGE, { rid })

// 下一步驟
export const NEXT_LINE = 'NEXT_LINE'
export const nextLine = (cid, oid) => action(NEXT_LINE, { cid, oid })

export const SUCCESS_NEXT_LINE = 'SUCCESS_NEXT_LINE'
export const successNextLine = () => action(SUCCESS_NEXT_LINE)

// 上一步驟
export const PREV_LINE = 'PREV_LINE'
export const prevLine = () => action(PREV_LINE)

export const SUCCESS_PREV_LINE = 'SUCCESS_PREV_LINE'
export const successPrevLine = () => action(SUCCESS_PREV_LINE)

// 指定步驟
export const ASSIGN_LINE = 'ASSIGN_LINE'
export const assignLine = (step) => action(ASSIGN_LINE, { step })