import videoReducer from './videoReducer'
import popupReducer from './popupReducer'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const popup = combineReducers({ video: videoReducer, popup: popupReducer })

export default combineReducers({ popup, routing: routerReducer })
