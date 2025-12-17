const importAll = require('../library/action').importAll

const cnt = require.context(__dirname, true, /^((?!index).)*\.jsx$/)
const containersNames = importAll(cnt)

module.exports = containersNames

