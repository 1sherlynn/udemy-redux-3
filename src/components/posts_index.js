import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { fetchPosts } from '../actions'; 
 
class PostsIndex extends Component {
	componentDidMount() {
		this.props.fetchPosts(); 
	}

	render() {
		return (
			<div> 
			  Posts Index
			</div>
			); 
	}
}

export default connect(null, { fetchPosts })(PostsIndex); 
//this is ES6 shortcut 

//when are we going to fetch the blogposts? 
// the instant we know the user is going to the url, we want to display the list of blog posts
// to do so, we will use React's lifecycle methods

