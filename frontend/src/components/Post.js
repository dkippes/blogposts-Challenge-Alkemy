import React from 'react'

const Post = ({post, onEdit}) => {
	return (
		<tr>
			<td>{post.id}</td>
			<td>{post.title}</td>
			<td>
				<button type="button" className="btn btn-danger">
					Delete
				</button>
				<button type="button" className="btn btn-default"
					onClick={() => onEdit(post)}
					>
					Edit
				</button>
			</td>
		</tr>
)
}

export default Post;