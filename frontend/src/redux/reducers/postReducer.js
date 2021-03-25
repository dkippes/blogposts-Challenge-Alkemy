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
} from "../actions/types";

const defaultState = {
	posts: [],
	error: null,
	isLoading: false
}

const postReducer = (state = defaultState, action) => {
	switch(action.type) {
		case ADD_POST_SUCCESS:
			return { ...state, posts: [ ...state.posts, action.payload ] };
		case ADD_POST_ERROR:
			return { ...state, error: action.payload };
		case EDIT_POST_SUCCESS:
			const updatedPosts = state.posts.filter(post => post.id !== action.payload.id)
			return { ...state, posts: [ ...updatedPosts, action.payload ] }
		case EDIT_POST_ERROR:
			return { ...state, error: action.payload };
		case DELETE_POST_SUCCESS:
			const filteredPosts = state.posts.filter(post => post.id !== action.payload.id);
			return { ...state, posts: filteredPosts };
		case DELETE_POST_ERROR:
			return { ...state, error: action.payload };
		case FETCH_POSTS_SUCCESS:
			return { ...state, posts: action.payload };
		case FETCH_POSTS_LOADING:
			return { ...state, isLoading: action.payload };
		case FETCH_POSTS_ERROR:
			return { ...state, error: action.payload };
		default: return state;
	}
}

export default postReducer;