import { cloneDict, evil, inc, size } from '../tools'
import { retDataType, retRemoveBracket } from './tools'

export function retGroupMapping(format) {
  function retGroupObj(name, type, options) {
    type = retDataType(type)
    return {
      ColumnName: name,
      Options: (
        type !== 'select' ? null : options
      )
    }
  }
  const obj = {}
  Object.keys(format).map((key) => {
    const { DataType, OptionsBak } = format[key]
    if (!inc(DataType, 'sumoutput')) {
      const groupID = DataType.match(/\d+/)
      if (groupID) {
        const chkObj = obj[groupID]
        const retObj = retGroupObj(key, DataType, OptionsBak)
        obj[groupID] = !chkObj
          ? [retObj]
          : [...chkObj, retObj]
      }
    }
  })
  return obj
}

export function retChgGroupProps(format, groupObj) {
  let resultObj = []
  const copyFormat = cloneDict(format)
  Object.keys(groupObj).forEach((key) => {
    let groupArray = []
    groupObj[key].forEach((gp) => {
      groupArray.push(gp.ColumnName)
    })
    groupObj[key].forEach((gp, index) => {
      const { ColumnName, Options } = gp
      let splOptions = []
      if (Options && inc(Options[0], '-')) {
        let seleString = ''
        let mainColumn = `[${ColumnName}]`

        // ["普通科|101-101-普通科", ..., "戲劇班|122-122-戲劇班"]
        splOptions = [...Options]

        let partArray = []
        splOptions.forEach((opt, index2) => {
          // ["普通科", "101-101-普通科"]
          const [main, cnt] = opt.split('|')
          // ["101", "101", "普通科"]
          const parts = cnt.split('-')

          const part = parts[index].trim()
          splOptions[index2] = `${main.trim()}|${part}`

          const declare = index2 === 0 ? 'if' : 'else if'
          seleString += `${declare}(${mainColumn}==='${part}'){return '`
          parts.forEach((p, index3) => {
            if (index !== index3) {
              const matchColumn = groupArray[index3]
              partArray.push(matchColumn)
              seleString += `${matchColumn}|${p.trim()},`
            }
          })
          // 去逗號
          seleString = seleString.substr(0, seleString.length - 1)
          seleString += '\'}'
        })
        // 最後補上else來判斷空值情況
        partArray = [...new Set(partArray)]
        partArray = partArray.map((col) => `${col}|`)
        seleString += `else{return '${partArray.join(',')}'}`
        // 新增/刪除 select group
        const formulaArray = resultObj.map((obj) => obj.formula)
        if (!inc(formulaArray, seleString)) {
          resultObj.push({ main: ColumnName, formula: seleString })
        }
      }
      // 更新每個select的Options
      if (Options) {
        copyFormat[ColumnName].colSpan = groupObj[key].length
        // 當splOptions不為空, Options才能覆蓋新值, 防止重複擷取
        if (splOptions.length) copyFormat[ColumnName].Options = splOptions
      } else copyFormat[ColumnName].hide = true
    })
  })
  return [copyFormat, resultObj]
}

export function retChgIntactValue(format, data, groupObj) {
  if (size(data)) {
    let selectObj = {}
    Object.keys(format)
      .filter((key) => inc(format[key].DataType, 'select_'))
      .map((key) => {
        const { DataType } = format[key]
        let intactValueArray = []
        let noUpdate = false
        const groupID = DataType.match(/\d+/)
        if (groupID) {
          const rootObj = groupObj[groupID]
          rootObj.map((gp) => {
            const val = data[gp.ColumnName]
            intactValueArray.push(val)
            // 如果群組其中一個欄位是空的, 則不顯示
            if (val === '' || val === null) noUpdate = true
          })
          selectObj[key] = {
            ...format[key],
            intactValue: !noUpdate
              ? intactValueArray.join('/')
              : null
          }
        }
      })
    return {
      ...format,
      ...selectObj
    }
  } else return format
}

export function processGroup(data, groupFormula) {
  const copyData = cloneDict(data)
  groupFormula.forEach((formula) => {
    let repFormula = formula.replace(/\[(\w+)\]/g, (w) => {
      // 去中括號
      const substr = retRemoveBracket(w)
      const val = copyData[substr]
      return `'${val}'`
    })
    repFormula = evil(repFormula).split(',')
    let searchArray = []
    repFormula.forEach((cnt) => {
      const [name, val] = cnt.split('|')
      searchArray.push({ name, val })
    })
    // 改變其餘欄位值 e.p. 修a 改bc
    searchArray.forEach((obj) => {
      copyData[obj.name] = obj.val
    })
  })
  return copyData
}
