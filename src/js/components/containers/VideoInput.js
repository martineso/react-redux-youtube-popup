import React from 'react'
import { connect } from 'react-redux'
import Input from '../Input'
import { toggleVideo } from '../../actions/toggleActions'

class VideoInput extends React.Component {
	
	onChange = (e) => {
		let url = e.target.value;
		this.props.dispatch(toggleVideo({url}));
	}

	render () {
		return (
			<Input onChange={this.onChange} />
		)
	}
}

VideoInput = connect()(VideoInput)

export default VideoInput