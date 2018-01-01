import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import { Field, reduxForm } from 'redux-form'; //reduxForm is similar to the connect helper from react-redux

class PostsNew extends Component {
	renderField(field) {
		return (
		<div className="form-group">
			<label>{field.label}</label>
			<input 
				className="form-control"
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
				label="Title for Post"
				name="title"
				//we have a label and name field cause at times they can be very different 
				//e.g. label="Title for a Post", whereas name is short and sweet 
				component={this.renderField} 
				/>
				<Field
				label="Categories"
				name="categories"
				component={this.renderField} 
				/>
				<Field
				label="Post Content"
				name="content"
				component={this.renderField} 
				/>
			</form>
		</div>
		)
	}
}

function validate(values) {
	// console.log(values) -> { title: 'hi', categories: 'hi', content: 'hi'}
	const errors = {}; 

	// Validate the inputs from the 'values'
	if (!values.title.length < 3) {
		errors.title = "Title must be at least 3 characters long!"; 
	}
	if (!values.title) {
		errors.title = "Enter a title!"; 
	}
	if (!values.categories) {
		errors.categories = "Enter some categories!"; 
	}
		if (!values.content) {
		errors.content = "Enter some content please!"; 
	}

	// If errors is empty, the form is fine to submit 
	// If errors has *any* properties, redux form assumes form is invalid 

	return errors; 
}

export default reduxForm({
	validate, //same as writing 'validate: validate'
	form: 'PostsNewForm' //unique (must) string to ensure that if we are showing multiple different forms at the same time, 
	//redux forms will handle it correctly (will not merge state and etc)
	//like how we use the connect function to connect to the redux store 
})(PostsNew); 
















