import React from 'react'
import { connect } from 'react-redux'
import CommentsList from './containers/CommentsList'
import EnabledCommentArea from './containers/EnabledCommentArea'
import commentAreaStyles from '../../css/CommentArea.css'

class CommentsWrapper extends React.Component {

	render() {
			return (
				<div>
					<div className={commentAreaStyles.main} >
						<EnabledCommentArea type={"main"}
																placeholder={"comment..."}/>
					</div>
          <hr className={commentAreaStyles.mainSeparator}/>
          <CommentsList />
				</div>
		)
	}
}

export default CommentsWrapper