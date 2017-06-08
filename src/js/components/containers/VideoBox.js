import React from 'react'
import { connect } from 'react-redux'
import { toggleVideo } from '../../actions/toggleActions'
import Button from '../Button'
import LikeIcon from 'react-icons/lib/fa/heart-o'
import ShareIcon from 'react-icons/lib/fa/share-alt'
import VideoFrame from '../VideoFrame'
import EnabledCommentArea from './EnabledCommentArea'
import CommentsWrapper from '../CommentsWrapper'
import buttonStyle from '../../../css/Button.css'
import videoBoxStyles from '../../../css/VideoBox.css'

class VideoBox extends React.Component {

	removeVideo = () => {
		this.props.dispatch(toggleVideo({}))
	}

	getYTVideoIdFromUrl = (url) => {
		return url.match(/([^=])*$/)[0];
	}

	parseUrl = (url) => {
		let start = "http://www.youtube.com/embed/";
		let videoId = this.getYTVideoIdFromUrl(url);
		let jsAPI = "?enablejsapi=1";
		let controls = "&controls=0"
		let annotations = "&iv_load_policy=3";
		let relVideos = "&rel=0";
		let search = "&showsearch=1";


		/*return "".concat(
			start,
			videoId,
			jsAPI,
			controls,
			annotations,
			relVideos,
			search);*/

			return videoId;
	}

	render () {
		let src = this.parseUrl(this.props.url.toString());
		return (
			<div>
			<div className={videoBoxStyles.wrapper}>
				<VideoFrame src={src} />
					<div className={videoBoxStyles.buttonsWrapper}>
						<span className={videoBoxStyles.leftButtons}>
							<Button className={buttonStyle.iconButton}>
									<LikeIcon className={buttonStyle.icon}/>
									{" Like"}
							</Button>
							<Button className={buttonStyle.iconButton}>
									<ShareIcon className={buttonStyle.icon}/>
									{" Share"}
							</Button>
						</span>
						<span className={videoBoxStyles.rightButtons}>
							<Button className={buttonStyle.edit}>
									{"Edit"}
							</Button>
							<Button className={buttonStyle.delete} onClick={this.removeVideo}>
									{"Delete"}
							</Button>
						</span>
					</div>
			</div>
			<CommentsWrapper />
			</div>
		)
	}
}

VideoBox = connect()(VideoBox)

export default VideoBox