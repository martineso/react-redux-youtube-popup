/* Helper Functons */

const updateCommentReplies = (state, action) => {
	return state.map(item => {
		if(item.id === action.payload.replyToId) {
			return Object.assign({}, item, 
				{repliesById: item.repliesById.concat(action.payload.id)}
			);
		}
		else {
			return item;
		}
	});
}

const initialState = {
	id: undefined,
	isReply: false,
	isBeingRepliedTo: false,
	author: undefined,
	date: undefined,
	text: undefined,
	repliesById: [],
}

const comment = (state = initialState, action) => {

	const { payload } = action;
	const { id, text, author, date } = payload;

	switch (action.type) {

		case 'ADD_COMMENT':
			return Object.assign({}, state, { 
						id: id, 
						date: date,
						text: text, 
						author: author, 
			});

		case 'ADD_REPLY':
			return Object.assign({}, state, { 
						id: id, 
						date: date,
						text: text, 
						author: author,
						isReply: true,
			});

		case 'EDIT_COMMENT':
			if (state.id !== id) {
        return state;
      }
      return Object.assign({}, state, {
        text: text
      });

    case 'TOGGLE_REPLYING':
     	if (state.id !== id) {
        return state;
      }

      return Object.assign({}, state, {
        isBeingRepliedTo: !state.isBeingRepliedTo,
      });

		default:
			return state;
	}
}

const comments = (state = [], action) => {
	switch (action.type) {

		case 'ADD_COMMENT':
		case 'ADD_REPLY':
			return [...state, comment(undefined, action)];

		case 'TOGGLE_REPLYING':
			return state.map(item => comment(item, action));

/*		case 'EDIT_COMMENT':
			return state.map(item => comment(item, action));

		case 'REMOVE_COMMENT':
			return state.filter(item => item.id !== action.payload.id);*/
			
		default:
			return state;
	}	
}

const commentReducer = (state = {}, action) => {
	switch (action.type) {

		case 'TOGGLE_REPLYING':
			return Object.assign({}, state, {
				comments: comments(state.comments, action),
			});

		case 'ADD_COMMENT':
			return Object.assign({}, state, {comments: comments(state.comments, action)});

		case 'ADD_REPLY': {
			let newState = comments(state.comments, action);
			newState = updateCommentReplies(newState, action);
			
			return Object.assign({}, state, {
				comments: newState,
				allReplies: state.allReplies.concat(action.payload.id),
			});
		}
		default:
			return state;
	}
}

export default commentReducer