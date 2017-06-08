import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import mainReducer from "../reducers/mainReducer"

const middleware = applyMiddleware(logger())

export default createStore(mainReducer, middleware)