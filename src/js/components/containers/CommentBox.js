import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleReplying } from '../../actions/toggleActions'
import Comment from '../Comment'
import EnabledCommentArea from '../containers/EnabledCommentArea'
import Button from '../Button'
import LikeIcon from 'react-icons/lib/fa/heart-o'
import ShareIcon from 'react-icons/lib/fa/share-alt'
import FlagIcon from 'react-icons/lib/fa/flag-o'
import CommentIcon from 'react-icons/lib/md/comment'
import UpArrow from 'react-icons/lib/fa/angle-up'
import buttonStyles from '../../../css/Button.css'
import styles from '../../../css/CommentBox.css'


class CommentBox extends Component {

	// Enables the comment area for this comment
	enableReplying (id) {
		this.props.dispatch(toggleReplying({ id }));
	}

	// At the moment this method only changes the appearance of the
	// button but does not toggle any functionaly associated with it
	toggleActiveBtn = (e) => {
		let targetBtn = e.target;
		let allBtns = targetBtn.parentNode.children;
		
		for (let i = 0; i < allBtns.length; i++) {
			allBtns[i].setAttribute('class', buttonStyles.faded);

			if(targetBtn === allBtns[i]) {
				targetBtn.setAttribute('class', buttonStyles.active);
			}
		}
	}

	render() {
		const { comment } = this.props;
		const { 
			author, 
			text,
			date,
			id, 
			isBeingRepliedTo, 
			isReply 
		} = comment;
		
		return (
			<div>
				<Comment author={author}
								 datePosted={date}
								 text={text}>
					<div className={styles.buttonsWrapper}>
					<span>
						<Button className={buttonStyles.iconButton}>
							<LikeIcon className={buttonStyles.icon}/>{" like"}
						</Button>
						<Button className={buttonStyles.iconButton}>
							<ShareIcon className={buttonStyles.icon}/>{" share"}
						</Button>
					</span>

					{isReply ? '' : (
					<span>
						<Button onClick={() => this.enableReplying(id)}
										className={buttonStyles.iconButton}>
							<CommentIcon className={buttonStyles.icon}/>{" comment"}
						</Button>

						<span className={styles.reportButtonFrame}>
						<Button className={buttonStyles.reportButton}>
							<FlagIcon className={buttonStyles.fadedIcon}/>{" report"}
						</Button>
						</span>

					</span>
					)}
					</div>

					<hr className={styles.separator}/>

				</Comment>
				{isBeingRepliedTo ? (
					<div className={styles.replyFrame}>
						<div className={styles.replyFrameButtons}>
							<Button className={buttonStyles.active}
											onClick={this.toggleActiveBtn}>{"Comment"}</Button>
							<Button className={buttonStyles.faded}
											onClick={this.toggleActiveBtn}>{"Photo"}</Button>
							<Button className={buttonStyles.faded}
											onClick={this.toggleActiveBtn}>{"Feedback"}</Button>
						</div>
						<EnabledCommentArea type={"reply"} 
															  replyToId={id}
															  placeholder={"reply..."} 
															  hide={() => this.enableReplying(id)} />
					</div>) : ''}
				
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

CommentBox = connect()(CommentBox)

export default CommentBox