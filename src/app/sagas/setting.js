import { put, call } from 'redux-saga/effects'
import axiosProps from '../library/saga'

import {
  setCode
} from '../actions/setting'

export function* GetCode(action) {
  const json = yield call(axiosProps, {
    cmd: 'api/imagevalidatecode'
  })
  const { ok, status, body } = json
  if (ok && status === 200) {
    yield put(setCode(body.data))
  } else {
    yield put(setCode(null, body.title))
  }
}