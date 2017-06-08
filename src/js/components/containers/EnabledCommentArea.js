import React from 'react'
import { connect } from 'react-redux'
import CommentArea from '../CommentArea'
import Button from '../Button'
import { addComment, addReply } from '../../actions/commentsActions'
import buttonStyles from '../../../css/Button.css'

class EnabledCommentArea extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			enabled: false,
			submitBtnDisabled: true,
		};
		const { type } = this.props;
	}

	enabled = (state) => {
		this.setState(() => ({
			enabled: state
		}));
	}

	toggleSubmitBtn = (state) => {
		this.setState(() => ({
			submitBtnDisabled: state
		}));
	}

	onFocus = () => {
		this.enabled(true);
	}

	onSubmit = (e) => {

		const { type, dispatch, replyToId, hide } = this.props;
		e.preventDefault();
		const text = e.target.elements.text.value;
		e.target.elements.text.value = "";

		if (type === "reply") {
			dispatch(addReply({text, replyToId}))
		}
		else {
			dispatch(addComment({text}));
		}

		this.onHide();
	}

	onChange = (e) => {
		e.preventDefault();

		let text = e.target.value;
		const submitBtn = e.target.form.elements.submitBtn;
		
		if (text.length > 3) {
			this.toggleSubmitBtn(false);
		} else {
			this.toggleSubmitBtn(true);
		}

		submitBtn.disabled = this.state.submitBtnDisabled;
	}

	onCancel = (e) => {
		const { type } = this.props;
		this.enabled(false);
		e.target.form.reset();
		this.onHide();
	}

	onHide = () => {

		const { type, hide } = this.props;

		if(type === "reply") {
			return hide();
		} else {
			this.enabled(false);
		}
	}

	render() {
		
		return (
			<CommentArea onSubmit={this.onSubmit}
									 onFocus={this.onFocus}
									 enabled={this.state.enabled}
									 onChange={this.onChange}
									 placeholder={this.props.placeholder}>

				<Button name={"submitBtn"} 
								disabled={this.state.submitBtnDisabled}
								className={this.state.submitBtnDisabled ? (buttonStyles.disabled) : (buttonStyles.submit)}>
					{"Submit"}
				</Button>

				<Button onClick={this.onCancel}
								className={buttonStyles.cancel}>
					{"Cancel"}
				</Button>
				
			</CommentArea>
		)
	} 	
}

EnabledCommentArea = connect()(EnabledCommentArea)

export default EnabledCommentArea
