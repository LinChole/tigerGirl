import { put, call, select } from 'redux-saga/effects'
import {
  setProject, setSubproject,
  setProjectDateTime, setProjectConfirm,
  setAvailableTimes,
  successSubmitBooking, finshSubmitBooking
} from '../actions/booking'
import { openSnackbar } from '../actions/setting'
import { supabase } from '../library/supabaseClient'
import { getCookie } from "../library/cookie"


// 取得服務項目
export function* GetProject(action) {
  const { data, error } = yield call(
    () => supabase
      .from('projects')
      .select('*')
  )
  if (!error && data) {
    let sort = data.sort((a, b) => a.id - b.id)
    yield put(setProject(sort))
  } else yield put(setProject([], error?.message || ''))
}

//取得服務子項目
export function* GetSubproject(action) {
  const { data, error } = yield call(
    () => supabase
      .from('subprojects')
      .select('*')
      .eq('pid', action.pid)
  )
  if (!error && data) {
    let sort = data.sort((a, b) => a.id - b.id)
    yield put(setSubproject(sort))
  } else yield put(setSubproject([], error?.message || ''))
}

// 取得可選日期（僅日期清單，時間段另外計算）
export function* GetProjectDateTime(action) {
  const { data, error } = yield call(
    () => supabase
      .from('available_dates')
      .select('id, date')
  )
  if (!error && data) {
    let sort = data.sort((a, b) => a.date.localeCompare(b.date))
    yield put(setProjectDateTime(sort))
  } else yield put(setProjectDateTime([], error?.message || ''))
}

// ---- 時間計算工具 ----
function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0')
  const m = (minutes % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

// 點選日期後計算可用時間段
export function* GetAvailableTimes(action) {
  const { date } = action

  // 取得選擇的服務時長（優先子項目，其次主項目）
  const projects = yield select(state => state.project.items)
  const subprojects = yield select(state => state.subproject.items)
  const selectedSubproject = subprojects.find(p => p.selected)
  const selectedProject = projects.find(p => p.selected)
  const duration = selectedSubproject?.duration || selectedProject?.duration || 60

  // 查詢當天已有的預約（排除已取消 status=2）
  const { data: bookings, error } = yield call(
    () => supabase
      .from('schedules')
      .select('time, duration')
      .eq('date', date)
      .neq('status', 2)
  )

  if (error) {
    yield put(setAvailableTimes([], error.message))
    return
  }

  // 計算可用時段
  const WORK_START = 10 * 60   // 10:00
  const WORK_END = 21 * 60     // 21:00
  const LUNCH_START = 12 * 60  // 12:00
  const LUNCH_END = 13 * 60    // 13:00
  const INTERVAL = 10          // 每 10 分鐘一個時段

  const slots = []

  for (let start = WORK_START; start + duration <= WORK_END; start += INTERVAL) {
    const end = start + duration

    // 排除午休時段（12:00–13:00）
    if (start < LUNCH_END && end > LUNCH_START) continue

    // 排除已有預約重疊的時段
    const blocked = (bookings || []).some(b => {
      const bStart = timeToMinutes(b.time)
      const bEnd = bStart + b.duration
      return start < bEnd && end > bStart
    })
    if (blocked) continue

    slots.push({ id: `${date}_${minutesToTime(start)}`, time: minutesToTime(start) })
  }

  yield put(setAvailableTimes(slots))
}

export function* GetProjectConfirm(action) {
  const p = yield select(state => state.project.items)
  const sp = yield select(state => state.subproject.items)
  const pdt = yield select(state => state.projectDateTime)
  const selectedTime = pdt.times.find(t => t.selected)
  let data = {
    name: p.filter(f => f.selected)[0]?.name,
    cname: sp?.filter(f => f.selected)[0]?.name,
    dateTime: selectedTime ? selectedTime.id.replace('_', ' ') : undefined,
    price: sp?.filter(f => f.selected)[0]?.price || p.filter(f => f.selected)[0]?.price
  }
  yield put(setProjectConfirm(data))
}


export function* SubmitBooking(action) {
  const token = getCookie('token')

  // 用 token 查出使用者 ID
  const { data: userData, error: userError } = yield call(
    () => supabase
      .from('users')
      .select('id')
      .eq('token', token)
  )

  if (userError || !userData || userData.length === 0) {
    yield put(finshSubmitBooking())
    yield put(openSnackbar('送出失敗：無法確認身份'))
    return
  }

  const userId = userData[0].id

  // 從 Redux state 取得已選擇的預約資料
  const projects = yield select(state => state.project.items)
  const subprojects = yield select(state => state.subproject.items)
  const pdt = yield select(state => state.projectDateTime)

  const selectedProject = projects.find(p => p.selected)
  const selectedSubproject = subprojects.find(p => p.selected)
  const selectedTime = pdt.times.find(t => t.selected)

  if (!selectedProject || !selectedTime) {
    yield put(finshSubmitBooking())
    yield put(openSnackbar('送出失敗：請選擇完整預約資料'))
    return
  }

  const [date, time] = selectedTime.id.split('_')

  const booking = {
    sid: userId,
    pid: selectedProject.id,
    pcid: selectedSubproject?.id || null,
    service: selectedProject.name || null,
    pcname: selectedSubproject?.name || null,
    date,
    time,
    duration: selectedSubproject?.duration || selectedProject?.duration,
    price: selectedSubproject?.price || selectedProject?.price,
    status: 0
  }

  const { error } = yield call(
    () => supabase
      .from('schedules')
      .insert([booking])
  )

  if (!error) {
    yield put(openSnackbar('預約成功！'))
    yield put(successSubmitBooking())
    window.location.assign('/schedule')
  } else {
    yield put(finshSubmitBooking())
    yield put(openSnackbar(`送出失敗：${error.message}`))
  }
}

// #管理端建立項目時目項>子項目>價格>花費時間
