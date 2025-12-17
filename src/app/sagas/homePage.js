import { put, call, select } from 'redux-saga/effects'
import axiosProps from '../library/api_test'

import {
  setHomePageImages
} from "../actions/homePage"

export function* GetHomePageImages(action) {
  const json = yield call(axiosProps, {
    cmd: `images`
  })

  const { ok, status, body } = json
  if (ok && status === 200) yield put(setHomePageImages(body))
  else yield put(setHomePageImages([], body.title))
}