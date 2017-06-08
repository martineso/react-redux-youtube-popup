// Toggle actions

export function togglePopup () {
	return { 
		type: 'TOGGLE_POPUP'
	};
}


export function toggleVideo ({ url }) {
	return { 
		type: 'TOGGLE_VIDEO',
		payload: {
			url,
		}
	};
}

export function toggleReplying ({ id }) {
	return {
		type: 'TOGGLE_REPLYING',
		payload: {
			id,
		}
	}
}