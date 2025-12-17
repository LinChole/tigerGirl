/**
 * by Bin
 * 2017/07/05、2023/06/09
 */
import moment from "moment";


export function sec2time(secs) {
  secs = Math.round(secs)

  let hr = Math.floor(secs / 3600)
  let min = Math.floor((secs - (hr * 3600)) / 60)
  let sec = parseInt(secs - (hr * 3600) - (min * 60))

  hr = hr < 10 ? '0' + hr : hr
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec

  return hr + ':' + min + ':' + sec
}

export function time2sec(time) {
  let arr = []
  arr = time.split(':')

  return (+arr[0]) * 3600 + (+arr[1]) * 60 + (+arr[2])
}

export function formatTime(time) {
  let res

  if (time) {
    // 01:20:34 --> 01
    const hour = time.substr(0, time.length - 6)
    // 01:20:34 --> 20:34
    const minsec = time.substr(time.length - 5, time.length)

    if (hour === '00' && minsec.substr(0, 1) === '0') { // 00:01:24 --> 1:24
      res = minsec.substr(1, minsec.length)
    } else if (hour === '00') { // 00:11:24 --> 11:24
      res = minsec
    } else if (hour.substr(0, 1) === '0') { // 01:11:24 --> 1:11:24
      res = hour.substr(1, hour.length) + ':' + minsec
    } else {
      res = hour + ':' + minsec
    }

    return res
  }
}

export function formatNumber(count, type) {
  let res
  let million, billion, trillion

  if (count) {
    count = count.toString()
    let length = count.length
    const regex = /\B(?=(\d{3})+(?!\d))/g
    switch (type) {
      case 1: // 需要格式化的
        if (length > 4 && length < 9) { // 萬 ~ 千萬
          million = count.substr(0, length - 4) + '.' + count.substr(length - 4, length)
          if (length >= 7) {
            res = Math.round(million).toString().replace(regex, ',') + '萬'
          } else {
            res = Math.round(million * 10) / 10 + '萬'
          }
        } else if (length > 8 && length < 13) { // 億 ~ 千億
          billion = count.substr(0, length - 8) + '.' + count.substr(length - 8, length)
          if (length >= 11) {
            res = Math.round(billion).toString().replace(regex, ',') + '億'
          } else {
            res = Math.round(billion * 100) / 100 + '億'
          }
        } else if (length > 12 && length < 17) { // 兆 ~ 千兆
          trillion = count.substr(0, length - 12) + '.' + count.substr(length - 12, length)
          if (length >= 15) {
            res = Math.round(trillion).toString().replace(regex, ',') + '兆'
          } else {
            res = Math.round(trillion * 1000) / 1000 + '兆'
          }
        } else if (length > 16) {
          // 太多了...
        } else { // 個 ~ 千
          res = count.replace(regex, ',')
        }
        break
      case 2: // 不需要格式化的
        res = count.replace(regex, ',')
        break
    }

    return res
  }
}

export function clearInterval(ytVideoSetInterval) {
  // 當網頁離開時，清空計時器內容
  return window.clearInterval(ytVideoSetInterval)
}

export function orderRouter(order) {
  let res
  switch (order) {
    case 'v':
      res = 'viewcount_d'
      break
    case 'sa':
      res = 'since_a'
      break
    case 'sd':
      res = 'since_d'
      break
    default:
      res = 'since_d'
  }
  return res
}

export function formatDateTime(datetime, {
  symbol = '',
  isTime = false,
  isTimeCH = false,
  isPaddingLeft = true,
  isSpace = false,
  isRoc = false,
  timeOpt = 0
}) {
  let res

  const ndt = new Date(datetime)
  let dd = ndt.getDate()
  let mm = ndt.getMonth() + 1
  let yy = ndt.getFullYear()
  let hh = ndt.getHours()
  let min = ndt.getMinutes()
  let ss = ndt.getSeconds()
  let timeCH = ''

  if (isRoc) {
    yy = yy - 1911
  }
  if (isTimeCH) {
    timeCH = hh >= 12 ? '下午 ' : '上午 '
    hh = hh > 12 ? hh - 12 : hh
  }

  const space = isSpace ? ' ' : ''
  if (isPaddingLeft) {
    mm = paddingLeft(mm.toString(), 2)
    dd = paddingLeft(dd.toString(), 2)
    if (isTime) {
      hh = paddingLeft(hh.toString(), 2)
      min = paddingLeft(min.toString(), 2)
      ss = paddingLeft(ss.toString(), 2)
    }
  }
  let switchTime = `${hh}:${min}:${ss}`
  switch (timeOpt) {
    case 1:
      switchTime = `${hh}:${min}`
      break
    case 2:
      switchTime = hh
      break
    case 3:
      switchTime = `${min}:${ss}`
      break
    case 4:
      switchTime = min
      break
    case 5:
      switchTime = ss
      break
  }
  const t = isTime ? ` ${timeCH}${switchTime}` : ''

  res = !symbol
    ? `${yy}${space}年${space}${mm}${space}月${space}${dd}${space}日${t}`
    : `${yy}${symbol}${mm}${symbol}${dd}${t}`

  return res
}

export function paddingLeft(str, length) {
  if (str.length >= length) return str
  else return paddingLeft('0' + str, length)
}

export function since2time(since) {
  let tt = since.substring(11, since.length)

  return tt
}

export function shuffle(array) {
  let currentIndex = array.length
  let temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length)
  this.length = from < 0 ? this.length + from : from
  return this.push.apply(this, rest)
}

export function indexPageVideoShowCount(width) {
  const n = width
  let count

  if (n < 485) count = 1
  else if (n >= 485 && n < 695) count = 2
  else if (n >= 695 && n < 905) count = 3
  else if (n >= 905 && n < 1115) count = 4
  else if (n >= 1115 && n < 1220) count = 5
  else if (n >= 1220 && n < 1430) count = 4
  else if (n >= 1430 && n < 1640) count = 5
  else count = 6

  return count
}

export function getHour(secs) {
  secs = Math.round(secs)
  return Math.floor(secs / 3600)
}

export function getMinute(secs) {
  secs = Math.round(secs)
  const hr = Math.floor(secs / 3600)
  return Math.floor((secs - (hr * 3600)) / 60)
}

export function getSecond(secs) {
  secs = Math.round(secs)
  const hr = Math.floor(secs / 3600)
  const min = Math.floor((secs - (hr * 3600)) / 60)
  return parseInt(secs - (hr * 3600) - (min * 60))
}

export function isEmpty(value) {
  return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && size(value) === 0)
}

// 计算表达式的值
export function evil(fn) {
  var Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
  try {
    return new Fn('return ' + fn)()
  } catch (err) {
    const str = err.toString()
    switch (str) {
      case 'SyntaxError: Unexpected token }':
        // default :
        console.log('【new Function Warning】', `\n【${str}】`, `\n${fn}`)
    }
    return new Fn(fn)()
  }
}

export function keyMatch(o, r) {
  var c = 0
  var nO = {}

  Object.keys(o).forEach(function (k) {
    c++
    if (k.match(r)) nO[k] = o[k]
  })

  // JSON.stringify(JSON.parse(nO))
  return (~c ? nO : null)
}

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
// #region
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value)
  }
  value = +value
  exp = +exp
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN
  }
  // Shift
  value = value.toString().split('e')
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))
  // Shift back
  value = value.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
}

// Decimal round
if (!Math.round10) {
  Math.round10 = function (value, exp) {
    return decimalAdjust('round', value, exp)
  }
}
// Decimal floor
if (!Math.floor10) {
  Math.floor10 = function (value, exp) {
    return decimalAdjust('floor', value, exp)
  }
}
// Decimal ceil
if (!Math.ceil10) {
  Math.ceil10 = function (value, exp) {
    return decimalAdjust('ceil', value, exp)
  }
}
// #endregion

Object.size = function (obj) {
  var size = 0; var key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++
  }
  return size
}

if (typeof Array.prototype.forEach !== 'function') {
  Array.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
      callback.apply(this, [this[i], i, this])
    }
  }
}

export function compareSmallerDateTime(dt1, dt2) {
  const ps1 = Date.parse(dt1).valueOf()
  const ps2 = Date.parse(dt2).valueOf()
  if (ps1 < ps2) return true
  else return false
}

export function ad2roc(datetime, symbol = false, isTime = false) {
  const ndt = new Date(datetime)
  const fdt = formatDateTime(ndt, { symbol, isTime, isRoc: true })
  const splFdt = symbol ? fdt.split(symbol) : fdt.split('年')
  return splFdt[0] < 0
    ? `${fdt}\n時間格式錯誤` : fdt
}

export function groupBy(collection, property, typeObj = false) {
  var i = 0; var val; var index

  var values = []; var result = !typeObj ? [] : {}
  for (; i < collection.length; i++) {
    val = collection[i][property]
    index = values.indexOf(val)
    if (index > -1) {
      if (!typeObj) result[index].push(collection[i])
      else result[val].push(collection[i])
    } else {
      values.push(val)
      if (!typeObj) result.push([collection[i]])
      else result[val] = [collection[i]]
    }
  }
  return result
}

export function obj2Query(params) {
  return Object.keys(params).map((k) => `${k}=${encodeURIComponent(params[k])}`).join('&')
}

export function query2Obj(str) {
  str = `{"${decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`
  return JSON.parse(str)
}

export function isToday(datetime) {
  const search = formatDateTime(datetime, { symbol: '-' })
  const t = formatDateTime(today(), { symbol: '-' })
  // console.log(search, t)
  return search === t
}

export function cloneDict(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function today(type) {
  const t = new Date()
  switch (type) {
    case 'y':
      return t.getFullYear()
    case 'm':
      return t.getMonth() + 1
    case 'd':
      return t.getDate()
    default:
      return t
  }
}

export function repEmailSafeCnt(content) {
  // https://www.regexpal.com/94502
  const regUrl = /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/gm
  const regLess = /\</g
  const regMore = /\>/g
  return content.replace(regUrl, (w) => `<a href='${w}'>${w}</a>`).replace(regLess, '&lt;').replace(regMore, '&gt;')
}

export function inc(obj, symbol) {
  return obj?.includes(symbol)
}

export function reverseString(str) {
  return str.split('').reverse().join('')
}

export function getElementPosition(e) {
  let x = 0
  let y = 0
  while (e != null) {
    x += e.offsetLeft
    y += e.offsetTop
    e = e.offsetParent
  }
  return { x, y }
}

// https://bonze.tw/javascript-array-intersection-difference-set/
// 差集
export function diffArray(arr1, arr2) {
  return arr1.filter((v) => !inc(arr2, v))
}
// 交集
export function intersectionArray(arr1, arr2) {
  return arr1?.filter((v) => inc(arr2, v))
}
// 補集
export function complementArray(arr1, arr2) {
  return arr1.filter((v) => !inc(arr2, v)).concat(arr2.filter((v) => !inc(arr1, v)))
}
// 聯集
export function unionArray(arr1, arr2) {
  return arr1.concat(arr2.filter((v) => !inc(arr1, v)))
}

export function size(obj) {
  return Object.keys(obj || []).length
}

export function convertTimeStamp(dt) {
  return Math.floor(new Date(dt).getTime() / 1000)
}

export function nowConvertTimeStamp() {
  return convertTimeStamp(today())
}

export function is(obj, checkType = undefined) {
  return Object.is(obj, checkType)
}

export function left(str, num) {
  return str?.substring(0, num)
}

export function right(str, num) {
  return str?.substring(str.length - num, str.length)
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function toThousands(num) {
  var num = (num || 0).toString(), result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) { result = num + result }
  return result
}

export function sumArray(arr) {
  return arr?.reduce((a, b) => a + b, 0)
}

export function toBoolean(str) {
  return typeof str === 'string' ? (str?.toLowerCase().trim() === 'true') : str
}


//時間正規化
export function dtf(date, format, {
  parseSymbol = '-',
  exportRoc = false,
  language = 'en'
} = {}) {
  if (date) {
    if (parseSymbol !== '-') date = date?.replace(parseSymbol, '-')
    return !exportRoc
      ? moment(date).locale(language).format(format)
      : moment(date).add(-1911, 'year').locale(language).format(format).replace(/^0+/, '')
  } else return undefined
}
//年月日時分秒
// dtf(st, 'YYYY-MM-DD HH:mm:ss')

//改成民國
// dtf(st, 'YYYY.MM.DD', { exportRoc: true })

//年月日 上下午
// dtf(st, 'YYYY/MM/DD A hh:mm:ss', { language: 'zh-tw' })

//年月日改中文
// dtf(st, 'YYYY 年 MM 月 DD 日', { exportRoc: true })


export function linefm(line,stp) { 
  return line.find( f => f.step === stp).CName
}