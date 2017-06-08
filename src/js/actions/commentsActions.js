// Comments actions

import moment from 'moment'

let nextId = 0

export function addComment ({ text, author = "Marti" }) {
	const id = nextId++;
	let date = moment().format('ll[ AT ] LT');

	return {
		type: 'ADD_COMMENT',
		payload: {
			id,
			author,
			text,
			date,
		}
	}
}

export function removeComment ({ id }) {
	return {
		type: 'REMOVE_COMMENT',
		payload: {
			id,
		}
	}
}

export function editComment ({ id, text }) {
	return {
		type: 'EDIT_COMMENT',
		payload: {
			id,
			text,
		}
	}
}

export function addReply ({ replyToId, text, author = "Marti" }) {
	const id = nextId++;
	let date = moment().format('ll[ at ] LT');

	return {
		type: 'ADD_REPLY',

		payload: {
			id,
			author,
			text,
			date,
			replyToId
		}
	}
}