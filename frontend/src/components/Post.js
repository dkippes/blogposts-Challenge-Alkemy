import React from 'react'
import './Post.css';

const Post = ({post, onDelete, onEdit}) => {
	return (
		<tr>
			<td>{post.id}</td>
			<td>{post.title}</td>
			<td className="td-edit-delete-post">
				<button type="button" className="btn btn-danger btn-edit-delete"
					onClick={() => onDelete(post.id)}
					>
					Delete
				</button>
				<button type="button" className="btn btn-warning btn-edit-delete"
					onClick={() => onEdit(post)}
					>
					Edit
				</button>
			</td>
		</tr>
)
}

export default Post;