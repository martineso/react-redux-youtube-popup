
const popupReducer = (state = {
	visible: false
}, action) => {

	switch (action.type) {

		case 'TOGGLE_POPUP':
			return Object.assign({}, state, { visible: !state.visible });
			
		default:
			return state;
	}
}

export default popupReducer