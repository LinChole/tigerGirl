import { put, call } from 'redux-saga/effects'
import { supabase } from '../library/supabaseClient'
import { getCookie } from "../library/cookie"
import {
    getSchedule,
    setSchedule,
    successCancelSchedule, finshCancelSchedule
} from '../actions/schedule'

export function* GetSchedule(action) {
    const token = getCookie('token')
    if (!token) {
        yield put(setSchedule([]))
        return
    }

    // 先用 token 查出 user 的 id
    const { data: userData } = yield call(
        () => supabase
            .from('users')
            .select('id')
            .eq('token', token)
    )

    if (!userData || userData.length === 0) {
        yield put(setSchedule([]))
        return
    }

    const userId = userData[0].id

    // 用 user id 查 schedules
    const { data, error } = yield call(
        () => supabase
            .from('schedules')
            .select('*')
            .eq('sid', userId)
    )

    if (!error && data) yield put(setSchedule(data))
    else yield put(setSchedule([]))
}

export function* CancelSchedule(action) {
    const { error } = yield call(
        () => supabase
            .from('schedules')
            .delete()
            .eq('id', action.oid)
    )

    if (!error) {
        yield put(successCancelSchedule(action.oid))
        yield put(getSchedule())
    } else yield put(finshCancelSchedule(error.message))
}

