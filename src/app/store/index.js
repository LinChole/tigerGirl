import { createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from "redux-logger";

//chrome 查看state、action
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers'

//讓專案支援 saga 套件，能使用非同步方式向伺服器端點發出資料請求。
const sagaMiddleware = createSagaMiddleware()


export default function configureStore(initialState) {
  
  let middlewarelist =
    process.env.NODE_ENV === "production"
      ? [sagaMiddleware]
      : [logger, sagaMiddleware];
  
  return {
    ...createStore(
      rootReducer,
      initialState,
      composeWithDevTools( applyMiddleware(...middlewarelist,))
    ),
    runSaga: sagaMiddleware.run
  }
}