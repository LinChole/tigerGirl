import { put, call, select, take } from 'redux-saga/effects'
import axiosProps from '../library/api'
import { getCookie } from "../library/cookie"
import {
    setSchedule, successCancelSchedule, finshCancelSchedule
} from '../actions/schedule'

export function* GetSchedule(action) {
    const uid = yield call(getCookie, 'uid')
    const json = yield call(axiosProps, {
        cmd: `schedules`,
        data: {
            user: uid
        }
    })
    const { ok, status, body } = json
    if (ok && status === 200) yield put(setSchedule(body))
    else yield put(setSchedule([], body.title))
}

export function* CancelSchedule(action) {
    const json = yield call(axiosProps, {
        cmd: `schedules/${action.oid}`,
        method: 'DELETE'
    })
    const { ok, status, body } = json
    console.log(json)
    if (ok && status === 200 && body.result) yield put(successCancelSchedule(action.oid))
    else yield put(finshCancelSchedule(body.ErrorMsg))
}