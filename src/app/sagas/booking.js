import { put, call, select, take } from 'redux-saga/effects'
import axiosProps from '../library/api'
import {
  setProject, setSubproject,
  setProjectDateTime, setProjectConfirm,
  successSubmitBooking, finshSubmitBooking
} from '../actions/booking'
import { openSnackbar } from '../actions/setting'


// 取得服務項目
export function* GetProject(action) {
  const json = yield call(axiosProps, {
    cmd: `project`
  })
  const { ok, status, body } = json
  if (ok && status === 200) {
    yield put(setProject(body))
  } else yield put(setProject([], body.title))
}

//取得服務子項目
export function* GetSubproject(action) {
  const json = yield call(axiosProps, {
    cmd: `subproject`,
    data: {
      pid: action.pid
    }
  })
  const { ok, status, body } = json
  if (ok && status === 200) {
    yield put(setSubproject(body))
  } else yield put(setSubproject([], body.title))
}

export function* GetProjectDateTime(action) {
  const json = yield call(axiosProps, {
    cmd: `availableTimes`
  })
  const { ok, status, body } = json
  if (ok && status === 200) {
    yield put(setProjectDateTime(body))
  } else yield put(setProjectDateTime([], body.title))
}

export function* GetProjectConfirm(action) {
  const p = yield select(state => state.project.items)
  const sp = yield select(state => state.subproject.items)
  const pdt = yield select(state => state.projectDateTime.items)
  let data = {
    name: p.filter(f => f.selected)[0]?.Name,
    cname: sp?.filter(f => f.selected)[0]?.Name,
    dateTime: pdt.filter(f => f.selected)[0]?.dateTime,
    price: sp?.filter(f => f.selected)[0]?.Price || p.filter(f => f.selected)[0]?.Price
  }
  yield put(setProjectConfirm(data))
}

import { getCookie } from '../library/cookie'

export function* SubmitBooking(action) {
  const { items } = yield select(state => state.projectConfirm)
  const uid = yield call(getCookie, 'uid')
  let data = {
    user_id: parseInt(uid) || 1, // backend expected user_id (mapped from user in Postgrest)
    date: items.dateTime,
    service: items.name,
    status: 0
  }
  const json = yield call(axiosProps, {
    cmd: `schedules`,
    method: 'post',
    data
  })
  const { ok, status, body } = json
  if (ok && status === 200 && body.result) {
    yield put(openSnackbar("送出成功"))
    yield put(successSubmitBooking())
    window.location.assign('/schedule')
  } else {
    yield put(finshSubmitBooking())
    yield put(openSnackbar(`送出失敗 ${body.ErrorMsg}`))
  }
}

// #管理端建立項目時目項>子項目>價格>花費時間