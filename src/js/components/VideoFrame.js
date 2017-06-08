import React from 'react'
import Youtube from 'react-youtube'
import frameStyles from '../../css/VideoFrame.css'
import Button from './Button'
import buttonStyles from '../../css/Button.css'
import PlayIcon from 'react-icons/lib/fa/play'
import PauseIcon from 'react-icons/lib/fa/pause'
import VolumeIcon from 'react-icons/lib/fa/volume-up'
import VolumeIconMuted from 'react-icons/lib/fa/volume-off'

class VideoFrame extends React.Component {

	constructor() {
		super();
		this.state = {
			player: undefined,
			isPlaying: false,
			isMuted: false,
			updater: undefined,
			time: '0:00',
		};
	}

	updateTime = () => {
		const { player } = this.state;

		let timeMin = parseInt(player.getCurrentTime() / 60);
		let timeSecs = parseInt(player.getCurrentTime()) % 60;

		if(timeSecs < 10) { timeSecs = '0' + timeSecs;}
		this.setState({time: timeMin + ':' + timeSecs});

	}
	
	updateSeekSlider = () => {
		const { player } = this.state;
		const max = this.seekSlider.max;

		let sliderValue = player.getCurrentTime() * (max / player.getDuration());
		this.seekSlider.value = Math.ceil(sliderValue);
		this.updateTime();
	}

	onReady = (e) => {
		this.setState({
      player: e.target,
    });
	}

	onPlayVideo = () => {
		if(!this.state.isPlaying) {
			this.state.player.playVideo();
			this.setState({isPlaying: true});
		} else {
			this.state.player.pauseVideo();
			this.setState({isPlaying: false});
		}
	}

	onMute = (e) => {
		if(!this.state.isMuted) {
			this.state.player.mute();
			this.setState({isMuted: true});
		} else {
			this.state.player.unMute();
			this.setState({isMuted: false});
		}
	}

	onSeek = (e) => {
		const { player } = this.state;
		const slider = e.target;

		console.log(e)

		if(player === 'undefined') {
			return;
		}

		e.preventDefault();

		// Get the x position of the seekSlider

		let rect = this.seekSlider.getBoundingClientRect();
		let clickPos = e.clientX - rect.left;
		let newTime = player.getDuration() * (clickPos / e.target.clientWidth);
		player.seekTo(newTime);
	}

	onPlayerStateChange = (e) => {
		switch (e.data) {

		case Youtube.PlayerState.PLAYING:
			let updater = setInterval(() => this.updateSeekSlider(), 300);
			this.setState({updater: updater, isPlaying: true});
			break;

		case Youtube.PlayerState.CUED:
			console.log('cued')
			break;

		case Youtube.PlayerState.UNSTARTED:
			console.log('unstarted')
			break;

		case Youtube.PlayerState.PAUSED:
			console.log('paused');

		default:
	 		clearInterval(this.state.updater);
			return;
		}
	}

	onMouseEnter = () => {
		this.controls.style.bottom = "3px";
		this.controls.style.zIndex = "1";
		this.timer.style.bottom = "40px";
	}

	onMouseLeave = () => {
		this.controls.style.bottom = "-57px";
		this.controls.style.zIndex = "-99";
		this.timer.style.bottom = "3px";
	}

	componentDidMount() {
		this.seekSlider.value = 0;
	}

	render () {

		const opts = {
      playerVars: {
        controls: 0,
        iv_load_policy: 3,
        rel: 0,
        showsearch: 1,
        showinfo: 0,
        modestbranding: 1
      }
    };

		return (
			
			<div className={frameStyles.frameWrapper}
					 onMouseEnter={this.onMouseEnter}
					 onMouseLeave={this.onMouseLeave}>
				<Youtube className={frameStyles.frame}
								 videoId={this.props.src}
								 opts={opts}
								 onReady={this.onReady}
								 onStateChange={this.onPlayerStateChange}/>
				<p className={frameStyles.time}
					 ref={(timer) => this.timer = timer}>{this.state.time}</p>
				<div className={buttonStyles.videoButtonsWrapper}
						 ref={(controls) => this.controls = controls}>
					<Button onClick={this.onPlayVideo}
								className={buttonStyles.playBtn}>
								{this.state.isPlaying ? <PauseIcon /> : <PlayIcon />}
					</Button>
					<Button onClick={this.onMute}
									className={buttonStyles.volumeBtn}>
								{this.state.isMuted ? <VolumeIconMuted /> : <VolumeIcon />}
					</Button>
					<div className={buttonStyles.seekSliderWrapper}>
					<input type={"range"}
								 min={0}
								 max={100}
								 className={buttonStyles.seekSlider}
								 onClick={this.onSeek}
								 ref={(slider) => this.seekSlider = slider } />
					</div>
				</div>
			</div>
			
		)
	}
}

export default VideoFrame