import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { importAll } from '../library/action'

const cnt = require.context(__dirname, true, /^((?!index).)*\.js$/)
const reducersNames = importAll(cnt, true)


//將routing路由與其它reducer函式一同合併導出
const rootReducer = combineReducers({
  routing: routerReducer,
  ...reducersNames
})

export default rootReducer
