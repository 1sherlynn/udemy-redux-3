import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import { Field, reduxForm } from 'redux-form'; //reduxForm is similar to the connect helper from react-redux

class PostsNew extends Component {
	renderTitleField(field) {
		return (
		<div>
			<input 
				type="text"
				{...field.input} //this is the same as the below: 
				// onChange={field.input.onChange}
				// onFocus={field.input.onFocus}
				// onBlur={field.input.onBlur}
			/> 
		</div>
		); 
	}

	render() {
		return (
		<div>
		<div className="text-xs-right">
			<Link className="btn btn-success" to="/">
				Back to Home
			</Link>
		</div>
		<h3>Add a New Post</h3>
			<form>
				<Field
				name="title"
				component={this.renderTitleField} 
				/>
			</form>
		</div>
		)
	}
}

export default reduxForm({
	form: 'PostsNewForm' //unique (must) string to ensure that if we are showing multiple different forms at the same time, 
	//redux forms will handle it correctly (will not merge state and etc)
	//like how we use the connect function to connect to the redux store 
})(PostsNew); 

