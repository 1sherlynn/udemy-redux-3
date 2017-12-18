import axios from 'axios'; 

export const FETCH_POSTS = 'fetch_posts'; 

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=PAPERCLIP43215'; 
//create a unique api key. Cannot be any string, use after "?key="

export function fetchPosts() {
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`); 
	//we want to 'get' from reduxblog API

	return {
		type: FETCH_POSTS, 
		payload: request
		// redux-promise will resolve this request for us 
	}; 
}