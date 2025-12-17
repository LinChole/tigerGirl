function action(type, payload = {}) {
  return {
    type,
    ...payload
  }
}

export function importAll(cnt, noMatch = false) {
  let fileNames = {}
  // 取得當前目錄下所有 *.js 檔案內，有導出(export)的宣告
  // ex. export const, export let, export function...
  cnt.keys().forEach((key) => {
    // export function of every *.js file
    const func = cnt(key)
    // assign function to dict
    Object.keys(func).map((f) => {
      const names = Object.keys(fileNames)
      const repeat = names.filter(v => v === f);
      //檢查action命名是否重複
      if (repeat.length) alert(`⚠️  偵測 Action Type：檔案 ${key.match(/[^/]*(?=\.[^.]+($|\?))/i)[0]}.js 中的 ${f} 重複命名`)
      if (!noMatch) {
        // regex to get filename not extension
        let filename = key.match(/[^/]*(?=\.[^.]+($|\?))/i)[0]
        // use split to get first filename
        filename = filename.split('.')[0]
        fileNames[filename] = func[f]
      } else {
        fileNames[f] = func[f]
      }
    })
  })
  return fileNames
}

export default action
