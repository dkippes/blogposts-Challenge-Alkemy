import { 
	ADD_POST_ERROR, 
	ADD_POST_LOADING, 
	ADD_POST_SUCCESS, 
	DELETE_POST_ERROR, 
	DELETE_POST_LOADING, 
	DELETE_POST_SUCCESS, 
	EDIT_POST_ERROR, 
	EDIT_POST_LOADING, 
	EDIT_POST_SUCCESS, 
	FETCH_POSTS_ERROR,
	FETCH_POSTS_LOADING,
	FETCH_POSTS_SUCCESS
} from "./types";

import axios from 'axios';
import { history } from '../../index';

const url = 'https://jsonplaceholder.typicode.com/posts';
const urlCreatePost = 'https://jsonplaceholder.typicode.com/posts';
const urlEditPost = 'https://jsonplaceholder.typicode.com/posts/';

//CREATE -------------------------------------------------------------------
export const createPostSuccess = (data) => {
	return {
		type: ADD_POST_SUCCESS,
		payload: data
	}
}

export const createPostError = (data) => {
	return {
		type: ADD_POST_ERROR,
		payload: data
	}
}

export const createPost = (post) => {

	if (post.id) {
		const data = {
			id: post.id,
			title: post.title,
			body: post.body
		}

		return (dispatch) => {
			dispatch(editPost(data));
		}

	} else {

		const data = {
			title: post.title,
			body: post.body
		}
		return (dispatch) => {
			return axios.post(urlCreatePost, data)
				.then(({data}) => {
					console.log(data);
					alert('Added a post - check your console.log: ');
	
					dispatch(createPostSuccess(data));
					history.push('/');
				})
				.catch(err => {
					const errorPayload = {};
	
					errorPayload['message'] = 'Error when creating a post';
					errorPayload['status'] = 400;
	
					console.log(errorPayload);
					alert('Error - check your console.log: ');
					dispatch(createPostError(errorPayload));
				})
		}

	}
	
}

//EDIT ---------------------------------------------------------------------
export const editPostError = (data) => {
	return {
		type: EDIT_POST_ERROR,
		payload: data
	}
}

export const editPostSuccess = (data) => {
	return {
		type: EDIT_POST_SUCCESS,
		payload: data
	}
}

export const editPost = (data) => {
	const id = data.id;

	return (dispatch) => {
		return axios.put(urlEditPost + id, data)
			.then(({data}) => {
				console.log(data);
				alert('Post edited succesfully - check your console.log: ');

				dispatch(editPostSuccess(data));
				history.push('/');
			})
			.catch(err => {
				const errorPayload = {};
	
				errorPayload['message'] = 'Error when editing a post';
				errorPayload['status'] = 400;
	
				console.log(errorPayload);
				alert('Error - check your console.log: ');
				dispatch(editPostError(errorPayload));
			})
	}
}
//DELETE -------------------------------------------------------------------

//FETCH --------------------------------------------------------------------

export const fetchPostsSuccess = (data) => {
	return {
		type: FETCH_POSTS_SUCCESS,
		payload: data
	}
}

export const fetchPostsLoading = (data) => {
	return {
		type: FETCH_POSTS_LOADING,
		payload: data
	};
};

export const fetchPostsError = (data) => {
	return {
		type: FETCH_POSTS_ERROR,
		payload: data
	}
}

export const fetchPosts = () => {
	let isLoading = true;

	return(dispatch) => {
		dispatch(fetchPostsLoading(isLoading));
		return axios.get(url)
			.then(({data}) => {
				dispatch(fetchPostsSuccess(data));
				isLoading = false;
				dispatch(fetchPostsLoading(isLoading));
			})
			.catch(error => {
				const errorPayload = {};
				errorPayload['message'] = 'Not Found';
				errorPayload['status'] = 404;

				dispatch(fetchPostsError(errorPayload));
				isLoading = false;
				dispatch(fetchPostsLoading(isLoading));
			});
	}
}
