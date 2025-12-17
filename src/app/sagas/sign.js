import { put, call } from 'redux-saga/effects'
import axiosProps from '../library/saga'
import { setCookie, forwardTo } from "../library/cookie"
import { openSnackbar } from '../actions/setting'
import { ipDevHost, ipProHost } from 'Config'
const ipHost = process.env.NODE_ENV === 'development' ? ipDevHost : ipProHost


export function* Login(action) {
  const { email, password } = action.target
  // const json = yield call(axiosProps, {
  //   cmd: 'login',
  //   method: 'post'
  // })
  // const { ok, status, body } = json
  // if (ok && status === 200 && body.result) {

  let r = 'C'
  // window.alert('【登入】成功')
  yield call(setCookie, 'role', r, 1)
  window.location.assign(`/`)
  // } else yield put(openSnackbar('【登入】失敗'))
}

export function* Logout(action) {
  const json = yield call(axiosProps, {
    cmd: 'api/logout',
    method: 'post'
  })
  const { ok, status, body } = json
  console.log(json);
  if (ok && status === 200 && body.result) {
    window.alert('【登出】成功')
    window.location.assign(ipHost)
  } else yield put(openSnackbar('【登出】失敗'))
}