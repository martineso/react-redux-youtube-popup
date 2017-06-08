import React from 'react'
import commentAreaStyles from '../../css/CommentArea.css'

class CommentArea extends React.Component {

	render() {
		return (
			<form onSubmit={this.props.onSubmit}>
				<textarea className={commentAreaStyles.textarea}
									name={"text"} 
									onFocus={this.props.onFocus} 
									onChange={this.props.onChange}
				 					placeholder={this.props.placeholder}>
				</textarea>
				{this.props.enabled ? (this.props.children) : ''}
			</form>
		)
	}
}

export default CommentArea