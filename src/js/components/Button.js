import React from 'react'

class Button extends React.Component {
	render() {
		return (
			<button className={this.props.className}
							name={this.props.name} 
							onClick={this.props.onClick}
							disabled={this.props.disabled}>
				{this.props.children}
			</button>
		)
	}
}

export default Button