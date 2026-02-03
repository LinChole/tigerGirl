import { delay } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import axiosProps from '../library/api'
import { ipDevHost, ipProHost } from 'Config'

const ipHost = process.env.NODE_ENV === 'development' ? ipDevHost : ipProHost

import {
  getMe,
  setMe,
  successUpdateUserInfo,
  finshUpdateUserInfo
} from '../actions/me'

import { openSnackbar } from '../actions/setting'


export function* GetMe(action) {
  const json = yield call(axiosProps, {
    cmd: 'me'
  });

  const { ok, status, body } = json;
  if (ok && status === 200) {
    yield put(setMe(body))
    yield delay(10 * 60 * 1000)
    yield put(getMe(true))
  } else if (status === 401) {
    // window.location.assign('/login')
  }
}

export function* UpdateUserInfo(action) {
  const { items } = yield select(state => state.me)
  const json = yield call(axiosProps, {
    cmd: 'me',
    method: 'put',
    data: items
  })

  const { ok, status, body } = json
  if (ok && status === 200 && body.result) {
    yield put(successUpdateUserInfo())
    yield put(openSnackbar("資料更新成功"))
  } else {
    yield put(finshUpdateUserInfo())
    yield put(openSnackbar(`資料更新失敗 ${body.ErrorMsg}`))
  }

}


