import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { togglePopup } from '../../actions/toggleActions'
import CommentsWrapper from '../CommentsWrapper'
import Button from '../Button'
import VideoInput from './VideoInput'
import VideoBox from './VideoBox'
import ExitButton from 'react-icons/lib/fa/times-circle'
import buttonStyles from '../../../css/Button.css'
import popupStyles from '../../../css/Popup.css'

class Popup extends Component {

	render() {
		return (
			<div className={popupStyles.mainWrapper}>
				<div className={popupStyles.wrapper} >
					<Link to="/">
						<Button	className={buttonStyles.x} onClick={() => this.props.dispatch(togglePopup())}>
						</Button>
					</Link>
					{(this.props.videoEnabled === false) ? (<VideoInput />) : (<VideoBox url={this.props.videoUrl} />)}
				</div>
			</div>
		)
	}
}

Popup = connect(
	(state) => {
		return {
			videoEnabled: state.popup.video.isEnabled,
			videoUrl: state.popup.video.videoUrl,
		}
	})(Popup)

export default Popup
