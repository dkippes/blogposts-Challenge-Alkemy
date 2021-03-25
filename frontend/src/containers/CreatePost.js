import React, { Component } from 'react';
import { createPost } from '../redux/actions/post.actions';
import { connect } from 'react-redux';
import './CreatePost.css';

class CreatePost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: 0,
			title: '',
			body: ''
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onAdd(this.state);
	}

	hadleOnValueChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	hadleReset(e) {
		e.preventDefault();
		this.setState({
			title: '',
			body: ''
		})
	}

	componentDidMount() {
		const props = this.props;

		if (props.location && props.location.state) {
			const post = props.location.state.post;

			this.setState({
				id: post.id,
				title: post.title,
				body: post.body
			});
		}
	}

	render() {
		return (
			<div className="create-post">
				{this.props.error ? 
					<div className="alert alert-danger" role="alert">
						{this.props.error.message}
					</div>	: ''
				}
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label for='title'>Title:</label>
						<input 
							id="title"
							type="text"
							className="form-control"
							name="title"
							placeholder="Enter Title"
							value={this.state.title}
							onChange={this.hadleOnValueChange.bind(this)}
						/>
					</div>
					<div className="form-group">
						<label for='body'>Body:</label>
						<input 
							id="body"
							type="text"
							className="form-control"
							name="body"
							placeholder="Enter Body"
							value={this.state.body}
							onChange={this.hadleOnValueChange.bind(this)}
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Add
							</button>
						<button type="button" className="btn btn-default"
							onClick={this.hadleReset.bind(this)}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.postsData.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAdd: (post) => {
			dispatch(createPost(post));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);