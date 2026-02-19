import { delay } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import { supabase } from '../library/supabaseClient'
import { getCookie } from '../library/cookie'

import {
  getMe,
  setMe,
  successUpdateUserInfo,
  finshUpdateUserInfo
} from '../actions/me'

import { openSnackbar } from '../actions/setting'


export function* GetMe(action) {
  const token = getCookie('token')
  if (!token) return

  const { data, error } = yield call(
    () => supabase
      .from('users')
      .select('*')
      .eq('token', token)
  )

  if (!error && data && data.length > 0) {
    yield put(setMe(data[0]))
    yield delay(10 * 60 * 1000)
    yield put(getMe(true))
  }
}

export function* UpdateUserInfo(action) {
  const token = getCookie('token')
  if (!token) return

  const { items } = yield select(state => state.me)
  const { name, phone, email, password } = items

  const updateData = { name, phone, email }
  if (password) {
    updateData.password = password
  }

  const { error } = yield call(
    () => supabase
      .from('users')
      .update(updateData)
      .eq('token', token)
  )

  if (!error) {
    yield put(successUpdateUserInfo())
    yield put(openSnackbar('資料更新成功'))
  } else {
    yield put(finshUpdateUserInfo())
    yield put(openSnackbar(`資料更新失敗 ${error.message}`))
  }
}



