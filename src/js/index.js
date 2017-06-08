import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from './store/store'
import Layout from './components/containers/Layout'
import Popup from './components/containers/Popup'
import { addReply, addComment, toggleReplying } from './actions/commentsActions'

const store = createStore
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(addComment({ text: "It's only after we've lost everything that we're free to do anything." , author: 'Tyler Durden' }))



const app = document.getElementById('app')
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
				<Route path="/" component={Layout}>
					<Route path="popup" component={Popup}></Route>
				</Route>
		</Router>
	</Provider>,
app)