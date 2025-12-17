const importAll = require('../library/action').importAll

const cnt = require.context(__dirname, true, /\.js$/)
const actionsNames = importAll(cnt, true)

module.exports = actionsNames
