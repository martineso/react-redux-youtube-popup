import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentBox from './CommentBox'
import styles from '../../../css/CommentsList.css'

class CommentsList extends Component {

	mapReplies = (comment, allComments) => {
		const { repliesById } = comment;
		let validReplies = [];

		repliesById.forEach(id => {
			allComments.forEach(reply => {
				
				if(reply.id === id) {
					validReplies.push(reply);
				}
			})
		})
		return validReplies;
	}

	render() {
		const { comments } = this.props;

		return (
			<div className={styles.frame}>
				{comments.map((comment) => {

					let replies = this.mapReplies(comment, comments);
					if(!comment.isReply) {
						return (
							<CommentBox key={comment.id}
													comment={comment}>
								{/* replies */}
								<div className={styles.replies}>
								{replies.map((reply) => {
									return (
										<CommentBox key={reply.id}
																comment={reply} />
									)
								})}
								</div>
							</CommentBox>)
					}})}
			</div>
		)
	}
}

CommentsList = connect(
	(state) => {
		return {
			comments: state.popup.video.comments.comments,
		}
	})(CommentsList)

export default CommentsList