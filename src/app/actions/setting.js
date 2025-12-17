import action from '../library/action'

// 初始抓網頁寬度
export const RESIZE_WINDOW = 'RESIZE_WINDOW'
export const resizeWindow = () => action(RESIZE_WINDOW)

// 切換側欄狀態
export const TOGGLE_SIDEBAR_VISIBILITY = 'TOGGLE_SIDEBAR_VISIBILITY'
export const toggleSidebarVisibility = (anchor) => action(TOGGLE_SIDEBAR_VISIBILITY, { anchor })

// 關閉側欄狀態
export const CLOSE_SIDEBAR_VISIBILITY = 'CLOSE_SIDEBAR_VISIBILITY'
export const closeSidebarVisibility = (anchor, enforce = false) => action(CLOSE_SIDEBAR_VISIBILITY, { anchor, enforce })

// 打開下拉式選單
export const OPEN_DROPDOWN_MENU = 'OPEN_DROPDOWN_MENU'
export const openDropdownMenu = (top, left, anchorEl, content) => action(OPEN_DROPDOWN_MENU, { top, left, anchorEl, content })

// 關閉下拉式選單
export const CLOSE_DROPDOWN_MENU = 'CLOSE_DROPDOWN_MENU'
export const closeDropdownMenu = () => action(CLOSE_DROPDOWN_MENU)

// 打開確認對話視窗
export const OPEN_CONFIRM = 'OPEN_CONFIRM'
export const openConfirm = (content, agreeFunc) => action(OPEN_CONFIRM, { content, agreeFunc })

// 關閉確認對話視窗
export const CLOSE_CONFIRM = 'CLOSE_CONFIRM'
export const closeConfirm = () => action(CLOSE_CONFIRM)

// 確認對話視窗-同意
export const AGREE_CONFIRM = 'AGREE_CONFIRM'
export const agreeConfirm = (name) => action(AGREE_CONFIRM, { name })

// 打開對話視窗
export const OPEN_DIALOG = 'OPEN_DIALOG'
export const openDialog = (title, content, args = {
  userClose: true,
  maxWidth: false,
  fullScreen: false
}) => action(OPEN_DIALOG, { title, content, args })

// 關閉對話視窗
export const CLOSE_DIALOG = 'CLOSE_DIALOG'
export const closeDialog = () => action(CLOSE_DIALOG)

// 打開小提示視窗
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const openSnackbar = (content) => action(OPEN_SNACKBAR, { content })

// 關閉小提示視窗
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const closeSnackbar = () => action(CLOSE_SNACKBAR)

// 回上步驟
export const PREV_STEP = 'PREV_STEP'
export const prevStep = () => action(PREV_STEP)

// 下一步驟
export const NEXT_STEP = 'NEXT_STEP'
export const nextStep = () => action(NEXT_STEP)

// 步驟重來
export const RESET_STEP = 'RESET_STEP'
export const resetStep = () => action(RESET_STEP)

// 修改Header上面的文字
export const SET_HEADER_TITLE = 'SET_HEADER_TITLE'
export const setHeaderTitle = (name) => action(SET_HEADER_TITLE, { name })

// 重整驗證碼
export const GET_CODE = 'GET_CODE'
export const getCode = () => action(GET_CODE)

export const SET_CODE = 'SET_CODE'
export const setCode = (items, error = '') => action(SET_CODE, { items, error })