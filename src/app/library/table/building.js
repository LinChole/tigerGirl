import { paddingLeft, cloneDict, exist, inc, size, intersectionArray } from '../tools'
import { retGroupColumns, retGroupMapping } from './group'

export function retTrIndex(obj, position = 2) {
  let trArray = []
  Object.keys(obj).filter((key) => inc(key, 'sbd_')).forEach((key) => {
    const trIndex = key.split('_')[position]
    trArray.push(trIndex)
  })
  return [...new Set(trArray)]
}

export function retIncrementFormat(format, data, chgObj) {
  const { log, chgCol, insIdx, delIdx } = chgObj
  const intersection = intersectionArray(insIdx, delIdx)
  let formatObj = {}
  const trArray = retTrIndex(data, 2)
  if (trArray.length) {
    trArray.forEach((tr, index) => {
      let filterObj = {}
      Object.keys(format)
        .filter((key) => key.split('_')[2] === trArray[0])
        .forEach((key) => {
          delete format[key].del
          filterObj[key] = format[key]
        })
      const copyFormat = cloneDict(filterObj)
      Object.keys(copyFormat).forEach((key) => {
        const { DataType } = copyFormat[key]
        // ColumnName
        let spl = key.split('_')
        spl[2] = tr
        const newKey = spl.join('_')
        // DataType
        if (!inc(DataType, 'sumoutput')) {
          const groupID = DataType.match(/\d+/)
          if (groupID) {
            // 每一列+1
            const newGroupID = parseInt(groupID) + index
            copyFormat[key].DataType = DataType.replace(groupID, newGroupID)
          }
        }
        // chg, ins, del
        if (log) {
          if (inc(chgCol, newKey)) copyFormat[key].red = true
          if (inc(insIdx, parseInt(tr))) copyFormat[key].green = true
        }
        if (inc(delIdx, parseInt(tr))) {
          if (!log) copyFormat[key].del = true
          else {
            if (inc(intersection, parseInt(tr))) copyFormat[key].del = true
            else copyFormat[key].pale = true
          }
        }
        formatObj[newKey] = copyFormat[key]
      })
    })
    return formatObj
  } else return format
}
