import classNames from 'classnames'
import { evil, inc, reverseString, cloneDict, diffArray } from '../tools'
import { retTrIndex } from './building'
import { inputDisabledClassname, tdDisabledClassname } from 'Config'

export function retDataType(dataType) {
  return inc(dataType, '_') ? dataType.split('_')[0] : dataType
}

export function retRemoveBracket(column) {
  return column.substr(1, column.length - 2)
}

export function inputClass(type, readOnly, red, full = true) {
  const sele = ['radio', 'checkbox']
  const redObj = { 'fw-input-warning': red }
  const disabledClassName = type !== 'string' ? inputDisabledClassname : tdDisabledClassname
  return inc(sele, type)
    ? `w3-${type === 'radio' ? type : 'check'} ${classNames({ 'w3-disabled': readOnly }, redObj)}`
    : classNames(
      { 'fw-w-100': !inc(['string', 'file'], type) && full },
      { [disabledClassName]: readOnly },
      redObj
    )
}

// 在指定元素上畫出反斜線
export function slash(ele = '.slash', color = '#cbcbcb') {
  const slash = document.querySelectorAll(ele)
  if (slash) {
    slash.forEach((c) => {
      const _c = c.parentNode
      const _w = _c.offsetWidth
      const _h = _c.offsetHeight
      c.width = _w
      c.height = _h

      const ctx = c.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(_w, _h)
      ctx.strokeStyle = color
      ctx.stroke()
    })
  }
}

export function getType(type) {
  switch (type) {
    case 'text':
    case 'radio':
    case 'select':
      return type
    case 'int':
    case 'float':
      return 'number'
  }
}

export function retErrorDesMsg2oo(msg) {
  if (!msg) return
  function repOO(str) {
    const regOO = /○○.○○/
    const repStr = str.replace(regOO, '○○')
    if (regOO.test(repStr)) return repOO(repStr)
    else return repStr
  }
  const repMsg = msg.replace(/\[[\w\*]+\]|value/g, '○○')
  return repOO(repMsg)
}

export function retErrorDesMsg(items, msg) {
  const regChinese = /[\u4E00-\u9FCC]+/g
  const regColumnName = /\[[\w\*]+\]/
  const regColumnNameAll = new RegExp(regColumnName, 'g')
  const regMsgCnt = /\([\w\[\]\+\-\*\/\u4E00-\u9FCC]+\)/g
  const regCalc = /\+|\-/g
  const regStrValue = /\bvalue\b/

  function isCH(w) {
    const repStr = w.replace(regColumnNameAll, (w2) => {
      const substr = retRemoveBracket(w2)
      const { ColumnValue } = lookupInfo(items, substr)
      return evil(`Number('${ColumnValue}')`)
    })
    return repStr
  }
  function notCH(w) {
    const isCalcW = regCalc.test(w)
    const substr = retRemoveBracket(w) // 去除小括號
    const repStr = substr.replace(regColumnNameAll, (w2) => {
      const substr2 = retRemoveBracket(w2)
      const { ColumnValue } = lookupInfo(items, substr2)
      return isCalcW ? `Number('${ColumnValue}')` : ColumnValue
    })
    const absStr = `Math.abs(${repStr || '\'\''})`
    return absStr
  }

  if (regColumnName.test(msg)) {
    // console.log('原始ErrorDes =>', msg)
    const repColumnsName = msg.replace(regMsgCnt, (w) => {
      // 剔除集合內無 [] or 存在未替換的 value 字樣
      if (!regColumnName.test(w) || regStrValue.test(w)) return w
      // console.log('擷取之ErrorDes =>', w)
      if (regChinese.test(w)) { // 集合內有中文
        // console.log('有中文 =>', w)
        const repStr = isCH(w)
        return repStr
      } else { // e.p ([SchoolArea]-20)
        // console.log('沒中文 =>', w)
        try {
          const absStr = notCH(w)
          return evil(absStr)
        } catch (err) {
          // console.log('其實有中文 =>', w, err)
          const repStr = isCH(w)
          return repStr
        }
      }
    })
    // console.log('修改後ErrorDes =>', repColumnsName, '\n\n')
    return repColumnsName
  } else return msg
}

export function retAddRow(format, data) {
  const copyData = cloneDict(data)
  const trArray = retTrIndex(copyData, 2)
  let lastTrAddOne = null
  if (trArray.length) {
    // 找出最後一個tr
    const lastTr = trArray[trArray.length - 1]
    lastTrAddOne = parseInt(lastTr) + 1
    // 從data裡找出指定的節點
    Object.keys(copyData)
      .filter((key) => key.split('_')[2] === lastTr)
      .map((key) => {
        // ColumnName
        let spl = key.split('_')
        spl[2] = lastTrAddOne
        const newKey = spl.join('_')
        copyData[newKey] = ''
      })
  } else {
    lastTrAddOne = 0
    Object.keys(format).forEach((key) => {
      copyData[key] = ''
    })
  }
  return [copyData, lastTrAddOne]
}

export function appbarHeight(innerWidth, maxWidth) {
  return innerWidth > maxWidth ? 64 : 48
}

// 補data格子
export function supplementColumn(format, data) {
  const formatColumn = format.map((item) => item.ColumnName)
  const dataColumn = data.map((item) => item.ColumnName)
  let diff = diffArray(formatColumn, dataColumn)
  const copyData = [...data]
  diff.forEach((name) => {
    copyData.push({
      ColumnName: name,
      ColumnValue: ''
    })
  })
  return copyData
}

// 切換節點
export function checkoutKey(key, oriName, newName) {
  let spl = key.split('_')
  spl[spl.indexOf(oriName)] = newName
  return spl.join('_')
}

export function retPaleFormat(items, anchorEl, enable = false) {
  const elem = anchorEl.querySelector('[name^=sbd_]')
  const [type, part, tr, td] = elem.name.split('_')
  let dotFormat = `format_${part}`
  const copyFormat = cloneDict(items[dotFormat])
  Object.keys(copyFormat).forEach((key) => {
    if (inc(key, `${type}_${part}_${tr}_`)) {
      copyFormat[key].pale = enable
    }
  })
  return {
    ...items,
    [dotFormat]: copyFormat
  }
}

export function retRedFormat(items, matchArray) {
  const copyItems = cloneDict(items)
  Object.keys(copyItems).forEach((key) => {
    // 找出表節點且format_結尾, 還有warnDes節點
    if (inc(key, 'format_') || key === 'warnDes') {
      const formatObj = copyItems[key]
      if (!matchArray) {
        Object.values(formatObj).forEach((obj) => {
          // 清除紅框
          if (obj.red) obj.red = false
        })
      } else {
        Object.keys(formatObj).forEach((key) => {
          if (inc(matchArray, key)) {
            // 將指定的欄位標上紅框
            formatObj[key].red = true
          }
        })
      }
    }
  })
  return copyItems
}

export function lookupInfo(items, colname, symbol) {
  if (!symbol) {
    let info = {}
    Object.keys(items)
      .filter((key) => inc(key, 'format_'))
      .forEach((key) => {
        let formatObj = items[key]
        const newKey = checkoutKey(key, 'format', 'data')
        let dataObj = items[newKey]
        Object.keys(formatObj)
          .filter((key) => key === colname)
          .forEach((key) => {
            info = formatObj[key]
            info.ColumnValue = dataObj[key]
            info.ColumnName = key
          })
      })
    return info
  } else {
    let resultArr = []
    let [pre, suf] = colname.split(symbol)

    Object.keys(items)
      .filter((key) => inc(key, 'format_'))
      .forEach((key) => {
        let formatObj = items[key]
        const newKey = checkoutKey(key, 'format', 'data')
        let dataObj = items[newKey]
        Object.keys(formatObj)
          .filter((key) => key.substr(0, pre.length) === pre &&
            reverseString(key).substr(0, suf.length) === reverseString(suf))
          .forEach((key) => {
            let info = formatObj[key]
            info.ColumnValue = dataObj[key]
            info.ColumnName = key
            resultArr.push(info)
          })
      })
    return resultArr
  }
}

export function checkNum(num) {
  return ((num & 1) === 0) ? true : false
}

export function retPropsS(props, part) {
  return {
    ...props,
    formatS: props[`formatD${part}`],
    dataS: props[`dataD${part}`]
  }
}
