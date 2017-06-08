import React from 'react'
import { Link } from 'react-router'
import { togglePopup } from '../../actions/toggleActions'
import { connect } from 'react-redux'
import Button from '../Button'
import '../../../css/normalize.css'
import buttonStyle from '../../../css/Button.css'


class Layout extends React.Component {

	render() {
			let visible = this.props.popupIsVisible;
			let location = this.props.currentLocation;

			if(location === "/") {
				return (
				<div>
					<Link to="popup" onlyActiveOnIndex={true}>
						<Button className={buttonStyle.main} onClick={() => this.props.dispatch(togglePopup(true))}>
						{"Open Popup"}
						</Button>
					</Link>
				</div>
		)}
		  else { {/* Display the items as injected by the router */}
		  	return (
		  		<div>{this.props.children}</div>
		  	)
		  }
	}
}

Layout = connect(
	(state) => {
		return {
			popupIsVisible: state.popup.popup.visible,
			currentLocation: state.routing.locationBeforeTransitions.pathname,

		}
	})(Layout)
export default Layout