import { delay } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import axiosProps from '../library/api'
import { ipDevHost, ipProHost } from 'Config'

const ipHost = process.env.NODE_ENV === 'development' ? ipDevHost : ipProHost

import {
  getMe,
  setMe
} from '../actions/me'


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
    window.location.assign(ipHost)
  }
}


