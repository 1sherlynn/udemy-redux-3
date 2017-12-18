# Redux Part 3: Blog Post API (Udemy Stephen Grider)

- Blog Posts API: http://reduxblog.herokuapp.com/

_________________________________________________________

### Installing React Router 

- **npm install --save react-router-dom@4.0.0**

_________________________________________________________


### What React Router Does

#### How the Web used to work
1) User clicks on link on web page and changes the URL
2) Request made to server for a new web page
3) Server sends new html page to browser

- With React router, it intercepts changes to the URL and instead, **manually looks at the URL and changes the components rendered to the screen**

#### How React Router works
1) User clicks on link on web page and changes the URL
2) **History** library takes the changed URL, does some parsing over it and **figures out what changed in the URL** and then passes it to **React Router**
3) **React Router** updates the **react components** that should be shown on the screen, depending on the URL 
4) **React** renders those components to the screen as content 

- Idea behind **Single Page Application (SPA)**, whereby users no longer navigate between distinct HTML documents that are being created by some remote web server
- Instead, we are always dealing with a single HTML document and relying on Javascript to change the set of components that a user sees appearing on the screen 
- So in practice, the user **only loads a single HTML document**
- Sort of 'tricking' the user into thinking that they actually are navigating to other pages when in fact we are showing them **different sets of components**

_________________________________________________________

### The Basics of React Router 


- src/index.js: 
```javascript 
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom'; 
//Browser interacts with the history library, tells react router to look at the entire URL and decides what components to show on screen 
//Route provides the configuration to React Router 

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class Hello extends React.Component {
	render() { return <div>Hello!</div> }
}

class Goodbye extends React.Component {
	render() { return <div>Goodbye!</div> }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    		Header
    		<Route path="/hello" component={Hello} />
    		<Route path="/goodbye" component={Goodbye} />
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
```

_________________________________________________________

### Route Design 

- Name of the path we create **does not need to match the component name**
- Route: '/' == 'myblog.com/', will show a list of blogposts 
```javascript
<Route path='/' component={PostsIndex} />
```
- Route: '/posts/5' == 'myblog.com/posts/5', will show a particular blog post (post 5)
- **:id** is like a wildcard which matches and accepts any number 
```javascript
<Route path='/posts/:id' component={PostsShow} />
```
- Route: '/posts/new' == 'myblog.com/posts/new', will show a path to create a new blog post
```javascript
<Route path='/posts/new' component={PostsNew} />
```

_________________________________________________________

### Our First Route Definition 

- src/components/posts_index.js: 
```javascript
import React, { Component } from 'react'; 
 
class PostsIndex extends Component {
	render() {
		return (
			<div> 
			  Posts Index
			</div>
			); 
	}
}

export default PostsIndex; 
```

- src/index.js:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom'; 
//Browser interacts with the history library, tells react router to look at the entire URL and decides what components to show on screen 
//Route provides the configuration to React Router 

import reducers from './reducers';
import PostsIndex from './components/posts_index'; 

const createStoreWithMiddleware = applyMiddleware()(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    		<Route path="/" component={PostsIndex} />
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
```

_________________________________________________________

### State as an Object 

- **URL** is a **critical piece** of application state
- URL is not any different from any other piece of state
- In the show page, the **:id** is providing the state information 
- Hence, we don't need a 'activePost' piece of state 
- Previously, **Key**: posts and Type: **array** 
- We change it to: Type: **object** to make it easier to find a particular post
- If we use an array, we need a for-loop or find array helper
- By changing **type** to an **object**, it makes the lookup process easier 


- key: post :id 
- value: the post itself 
- **state.posts[postId]**

_________________________________________________________

### Back to Redux - Index Action 

- 1st **action creator** would be to fetch a list of posts and serve them up to our PostsIndex component
- **$ npm install --save axios redux-promise**
- src/actions/index.js: 
```javascript
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
```
_________________________________________________________

### Implementing Posts Reducer 

- When we first make the request, will have an empty array as we have not added any posts

- Goal in the reducer: store/produce the post piece of state
- Reducer: to return an object that contains the **id** of every post as the **key** and the **value** with be the actual post itself 
- However, the API which we are working with returns a list of posts in an **array** and hence we have to do a transformation for it to be an object 


- Solution: Lodash mapKeys method. Example: 
```javascript
const posts = [
  { id: 1, title: "Hi"}, 
  { id: 2, title: "Bye"}, 
  { id: 3, title: "How is it going"}
]; 

const state = _.mapKeys(posts, "id")
state["1"]
```

- src/reducers/reducer_posts.js: 
```javascript
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
```

_________________________________________________________

### Action Creator Shortcuts 


- Previously, we created our **fetchPosts** action creator as well as our reducer_posts reducer
- Now to wire up the **fetchPosts action** creator to the posts_index component 
- src/components/posts_index.js: 
```javascript
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
```

- A **lifecycle method** is a **function** on a React component class that is **automatically** called by React 
- We will use **componentDidMount()**
- This function wil be automatically called by React **immediately after this component has showed up in the DOM**
- Makes it a perfect location to go and fetch some data or initiate some one time loading procedure whenever this component shows up on the page 
- Fetching our data is an asynchronous operation
- React does not have any concept of figuring out how to not render the componet until we do some pre-loading configuration 
- React is always going to eagerly load itself as soon as it can 

- Test it out, go to browser, then in the dev tools, go to **Network**, XHR requests (ajax requests), and will see a request, go to **preview** and we see an empty array (no blog posts added yet to this particular API key)

_________________________________________________________

### Rendering a List of Posts 




















