/**
 * https://juejin.im/post/5b440f7ae51d45195759f345
 * take       : 監聽action (同步)
 * call       : 呼叫函數 (同步)
 * put        : 與redux的dispatch相似, 發出action (同步)
 * select     : 對應redux中的getState, 獲取store中的state (同步)
 * fork       : 使程序在背景執行 (非同步)
 * takeEvery  : 可同時監聽多個相同action, 啟動的saga彼此獨立, 並執行對應函數
 * takeLatest : 只監聽最後被觸發的action, 之前的動作還沒完成則取消, 並執行對應函數
 */

import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'


import * as actions from "../actions"

//取得登入者資料
import * as me from './me';
//Logout
import * as logout from './sign'

//首頁
import * as slidesImages from './homePage'

// schedule 歷史預約紀錄
import * as schedule from './schedule'

// bookin 預約內容
import * as booking from './booking'



export default function* rootSaga() {
  // 取得個人資料 
  yield takeEvery(actions.GET_ME, me.GetMe)
  // 更新個人資料
  yield takeEvery(actions.UPDATE_USER_INFO, me.UpdateUserInfo)
  yield takeEvery(actions.LOGIN, logout.Login)
  yield takeEvery(actions.LOGOUT, logout.Logout)

  //首頁
  //-輪播圖片
  yield takeEvery(actions.GET_HOME_PAGE_IMAGES, slidesImages.GetHomePageImages)

  // schedule
  // 歷史預約紀錄
  yield takeEvery(actions.GET_SCHEDULE, schedule.GetSchedule)
  // 取消預約
  yield takeEvery(actions.CANCEL_SCHEDULE, schedule.CancelSchedule)

  // booking
  // 選擇服務項目
  yield takeEvery(actions.GET_PROJECT, booking.GetProject)
  // 取得服務子項目
  yield takeEvery(actions.GET_SUBPROJECT, booking.GetSubproject)
  //取得可選日期時間
  yield takeEvery(actions.GET_PROJECT_DATETIME, booking.GetProjectDateTime)
  //確認預約資料
  yield takeEvery(actions.GET_PROJECT_CONFIRM, booking.GetProjectConfirm)
  // 送出預約內容
  yield takeEvery(actions.SUBMIT_BOOKING, booking.SubmitBooking)

}
