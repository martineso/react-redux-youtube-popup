import React from 'react'
import inputStyles from '../../css/Input.css'


class Input extends React.Component {
	render () {
		return (
			<div className={inputStyles.wrapper}>
					<p className={inputStyles.label}>{"Enter a url:"}</p>
					<input type="text" 
								 className={inputStyles.input}
								 onChange={this.props.onChange} />
			</div>
		)
	}
}

export default Input