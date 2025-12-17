const importAll = require('../library/action').importAll

const cnt = require.context(__dirname, true, /^((?!index).)*\.jsx$/)
const componentsNames = importAll(cnt)

module.exports = componentsNames
