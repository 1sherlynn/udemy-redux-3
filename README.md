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
- **<Route path='/' component={PostsIndex} />**
- Route: '/posts/5' == 'myblog.com/posts/5', will show a particular blog post (post 5). 
- **:id** is like a wildcard which matches and accepts any number 
- **<Route path='/posts/:id' component={PostsShow} />**
- Route: '/posts/new' == 'myblog.com/posts/new', will show a path to create a new blog post
- **<Route path='/posts/new' component={PostsNew} />**

_________________________________________________________

### Our First Route Definition 

- 





























