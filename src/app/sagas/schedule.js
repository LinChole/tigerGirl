import { put, call, select, take } from 'redux-saga/effects'
import axiosProps from '../library/api'
import { getCookie } from "../library/cookie"
import { setSchedule } from '../actions/schedule'

export function* GetSchedule(action) {
    const uid = yield call(getCookie, 'uid')
    const json = yield call(axiosProps, {
        cmd: `schedules`,
        data: {
            uid: uid
        }
    })
    const { ok, status, body } = json
    if (ok && status === 200) yield put(setSchedule(body))
    else yield put(setSchedule([], body.title))
}