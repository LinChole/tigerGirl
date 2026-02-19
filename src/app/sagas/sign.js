import { put, call } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../library/supabaseClient'
import { setCookie, removeCookie, getCookie } from "../library/cookie"
import { openSnackbar } from '../actions/setting'


export function* Login(action) {
  const { email, password } = action.target

  // 查詢 users table 驗證帳號密碼
  const { data, error } = yield call(
    () => supabase
      .from('users')
      .select('id, email, role')
      .eq('email', email)
      .eq('password', password)
  )

  if (error || !data || data.length === 0) {
    yield put(openSnackbar(`【登入】失敗: ${(error && error.message) || '帳號或密碼錯誤'}`))
    return
  }

  const matched = data[0]

  // 產生不易猜測的 UUID token
  const token = uuidv4()

  // 將 token 寫入 users table
  const { error: updateError } = yield call(
    () => supabase
      .from('users')
      .update({ token })
      .eq('id', matched.id)
  )

  if (updateError) {
    yield put(openSnackbar(`【登入】失敗: 無法建立 Token`))
    return
  }

  window.alert('【登入】成功')
  console.log(matched)
  const role = matched.role
  yield call(setCookie, 'role', role, 1)
  yield call(setCookie, 'token', token, 1)   // 存 token 取代明文 id/email
  window.location.assign(role.toUpperCase() === 'G' ? '/admin' : '/')
}

export function* Logout(action) {
  const token = getCookie('token')

  // 清除 DB 中的 token
  if (token) {
    yield call(
      () => supabase
        .from('users')
        .update({ token: null })
        .eq('token', token)
    )
  }

  yield call(removeCookie, 'role')
  yield call(removeCookie, 'token')
  yield call(removeCookie, 'uid')
  yield call(removeCookie, 'sid')
  window.alert('【登出】成功')
  window.location.assign('/')
}
