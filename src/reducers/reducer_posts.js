import _ from 'lodash'; 
import { FETCH_POSTS } from '../actions'; 

export default function(state, action) {
	switch (action.type) {
	case FETCH_POSTS: 
		return _.mapKeys(action.payload.data, 'id'); 
		// console.log(action.payload.data); // [post1, post2] but we need to transform it to object 
	default: 
		return state; 
	}
}