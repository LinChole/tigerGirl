import { put, call } from 'redux-saga/effects'
import axiosProps from '../library/saga'
import { setCookie, removeCookie } from "../library/cookie"
import { openSnackbar } from '../actions/setting'


export function* Login(action) {
  const { email, password } = action.target
  const json = yield call(axiosProps, {
    cmd: 'login',
    method: 'post',
    data: { email, password }
  })
  const { ok, status, body } = json
  console.log(body)
  if (ok && status === 200) {
    window.alert('【登入】成功')
    yield call(setCookie, 'role', body.role, 1)
    yield call(setCookie, 'uid', body.uid, 1)
    window.location.assign(`${body.role.toUpperCase() === 'G' ? '/admin' : '/'}`)
  } else {
    yield put(openSnackbar(`【登入】失敗: ${body.ErrorMsg || '帳號或密碼錯誤'}`))
  }
}

export function* Logout(action) {
  // const json = yield call(axiosProps, {
  //   cmd: 'api/logout', 
  //   method: 'post'
  // })
  // const { ok, status, body } = json
  // console.log(json);
  // if (ok && status === 200 && body.result) {
  yield call(removeCookie, 'role')
  window.alert('【登出】成功')
  window.location.assign('/')
  // } else yield put(openSnackbar('【登出】失敗'))
}