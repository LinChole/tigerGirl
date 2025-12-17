import action from '../library/action'

//取得client首頁的輪播圖片
export const GET_HOME_PAGE_IMAGES = 'GET_HOME_PAGE_IMAGES'
export const getHomePageImages = () => action(GET_HOME_PAGE_IMAGES,)

export const SET_HOME_PAGE_IMAGES = 'SET_HOME_PAGE_IMAGES'
export const setHomePageImages = (items, error = '') => action(SET_HOME_PAGE_IMAGES, { items, error })