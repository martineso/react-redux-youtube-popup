import commentReducer from './commentReducer'

const videoReducer = (state = {
	isEnabled: false,
	videoUrl: undefined,
	comments: {
		comments: [],
		allReplies: [],
	},
}, action) => {
	switch (action.type) {

		case 'TOGGLE_VIDEO':

			if(action.payload.url) {
				return Object.assign({}, state, {
					isEnabled: !state.isEnabled,
					videoUrl: action.payload.url
				});
			} else {
				return Object.assign({}, state, {
					isEnabled: !state.isEnabled,
					videoUrl: undefined
				});
			}

		case 'ADD_COMMENT':
		case 'ADD_REPLY':
		case 'TOGGLE_REPLYING':
			return Object.assign({}, state, { comments: commentReducer(state.comments, action) });
		default:
			return state;
	}
}

export default videoReducer