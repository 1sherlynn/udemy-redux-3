import axios from 'axios'; 

export const FETCH_POSTS = 'fetch_posts'; 
export const CREATE_POST = 'create_post'; 

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=PAPERCLIP43215'; 
//create a unique api key. Cannot be any string, use after "?key="

// this is an action creator: 
export function fetchPosts() {
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`); 
	//we want to 'get' from reduxblog API
	return {
		type: FETCH_POSTS, 
		payload: request
		// redux-promise will resolve this request for us 
	}; 
}

// this is an action creator: 
export function createPost(values) {
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values); 
	//url as the first argument and the second argument is the object or data to be sent to be the remote API 
	return {
		type: CREATE_POST, 
		payload: request
		// redux-promise will resolve this request for us 
	}; 
}