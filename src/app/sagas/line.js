import { put, call, select } from 'redux-saga/effects'
import axiosProps from '../library/api'

import {
  setLine,
  setAdmMessage,
  successNextLine,
  successPrevLine,
  successDeleteAdmMessage
} from '../actions/line'
import {
  openSnackbar,
  openDialog
} from '../actions/setting'
import { compareSmallerDateTime, today } from '../library/tools'
import { forwardTo } from '../library/cookie'
import { ADMIN_ROOT } from '../actions/system'

export function* GetLine(action) {
 

  const {CID} = action
  const json = yield call(axiosProps, {
    cmd: `api/Activity/${CID}/StepLine`
  
  })
  const { ok, status, body } = json

  if (ok && status === 200) {
    yield put(setLine(body.data))
} else yield put(setLine([], body.title))
}


export function* GetAdmMessage(action) {
  const json = yield call(axiosProps, {
    cmd: `activity/${action.cid}/message`
  })
  const { ok, status, body } = json
  if (ok && status === 200) yield put(setAdmMessage(body.data))
  else yield put(setAdmMessage([], body.title))
}

export function* NextLine(action) {
  const json = yield call(axiosProps, {
    cmd: 'api/'
  })
  const { ok, status, body } = json
  if (ok && status === 200 && body.result) yield put(successNextLine())
  else {
    yield put(openSnackbar('繳交失敗'))
    yield put(successNextLine())
  }
}

export function* PrevLine(action) {
  let { CID, step } = yield select(state => state.activityDetail.items)
  let oidStr = ''
  let adm = false
  if (!step) {
    const { OID, Status } = yield select(state => state.applicantDetail.items)
    oidStr = `/${OID}`
    step = Status
    adm = true
  }
  const json = yield call(axiosProps, {
    cmd: `api/activity/${CID}/previousStep${step}${oidStr}`,
    method: 'post'
  })
  const { ok, status, body } = json
  if (ok && status === 200 && body.result) {
    if (!adm) yield put(successPrevLine())
    else yield call(forwardTo, `${ADMIN_ROOT}/activity/${CID}`)
  } else yield put(openSnackbar('返回失敗：' + body))
}

export function* CheckLineTime(step) {
  console.log(step);
  const items = yield select(state => state.line.items)
  const { startTime, endTime } = items.filter((f) => f.step === step)[0]
  if (compareSmallerDateTime(endTime, today())) {
    yield put(openDialog('已經超過截止日期！'))
  } else if (compareSmallerDateTime(today(), startTime)) {
    yield put(openDialog('尚未到達填寫日期！'))
  }
}

export function* DeleteAdmMessage(action) {
  const json = yield call(axiosProps, {
    cmd: `api/activity/${action.CID}/message/${action.rid}`,
    method: 'delete'
  })
  const { ok, status, body } = json
  if (ok && status === 200 && body.result) {
    yield put(openSnackbar('已隱藏提醒'))
    yield put(successDeleteAdmMessage(action.rid))
  } else yield put(openSnackbar('操作失敗'))
}