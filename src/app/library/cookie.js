// import { browserHistory } from 'react-router'
import { today } from './tools'
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

// 新增 Cookie
export function setCookie(cname, cvalue, exdays, path = '/') {
  var d = today()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  var cnt = `${cname}=${cvalue};${expires};path=${path}`
  document.cookie = cnt
}

// 尋找 Cookie
export function getCookie(cname) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

// 移除
export function removeCookie(cname) {
  // document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// 轉址
export function forwardTo(location) {
  history.push(location)
}

// 回上頁
export function goBack() {
  history.goBack()
}

export function reload() {
  window.location.reload()
}
