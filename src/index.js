import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
//Browser interacts with the history library, tells react router to look at the entire URL and decides what components to show on screen 
//Route provides the configuration to React Router 
import promise from 'redux-promise'; 

import reducers from './reducers';
import PostsIndex from './components/posts_index'; 
import PostsNew from './components/posts_new'; 

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    	<Switch>
    		<Route path="/posts/new" component={PostsNew} />    	
    		<Route path="/" component={PostsIndex} />
    	</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
