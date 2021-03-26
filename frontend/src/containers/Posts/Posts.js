import React, { Component } from 'react'
import Post from '../../components/Post/Post';
import { connect } from 'react-redux';
import { fetchPosts } from '../../redux/actions/post.actions';
import { deletePost } from '../../redux/actions/post.actions';
import { history } from '../../index';

class Posts extends Component {
    constructor(props) {
        super(props)
    }

	componentDidMount() {
		this.props.onFetch();
	}

	handleEdit(post) {
		history.push({
			pathname: `/edit/${post.id}`,
			state: {
				post: post
			}
		});
	}

    render() {
		if(this.props.isLoading) {
			return (
				<p>Loading...</p>
			)
		} else if (this.props.error) {
			return (
				<div className="alert alert-danger" role="alert">
					{this.props.error.message}
				</div>
			)
		} else {
			return (
				<div>
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Id</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.posts.map(post => {
									return (
										<Post 
											key={post.id} 
											post={post}
											onEdit={this.handleEdit.bind(this)}
											onDelete={this.props.onDelete}
										/>
									)
								})
							}
						</tbody>
					</table>
				</div>
			)
		}
        
    }
}

const mapStateToProps = (state) => {
	return {
		posts: state.postsData.posts || [],
		error: state.postsData.error || null,
		isLoading: state.postsData.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch: () => {
			dispatch(fetchPosts());
		},

		onDelete: (id) => {
			dispatch(deletePost(id));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);