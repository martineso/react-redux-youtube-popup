import React, { Component } from 'react'
import styles from '../../css/Comment.css'
import avatar from './../../img/avatar.jpg'
class Comment extends Component {
	render() {
		return (
			<div className={styles.mainWrapper}>

				<div className={styles.commentTop}>
					<img src={avatar} className={styles.avatar}></img>
					<span className={styles.titleWrapper}>
						<h3 className={styles.author}>{this.props.author}</h3>
						<p className={styles.date}>{this.props.datePosted}</p>
					</span>
				</div>

				<div className={styles.textFrame}>
					<p className={styles.text}>{this.props.text}</p>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Comment