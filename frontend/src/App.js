import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Posts from './containers/Posts/Posts';
import PostForm from './containers/PostForm/PostForm';
import Nav from './components/Nav/Nav';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

	this.state = {
		pathname: '',
	};

	this.notifyPathname = this.notifyPathname.bind(this);
  }

  notifyPathname(pathname) {
	  this.setState({
		  pathname: pathname,
	  });
  }

  render() {
	  return (
		  <Router>
			  <div className="App">
				<Nav 
					notifyPathname={this.notifyPathname}
					pathname={this.state.pathname}
				/>
				<Switch>
					<Route 
						path="/" 
						exact 
						component={() => <Posts />} 
					/>
					<Route
						path="/create" 
						exact 
						component={() => <PostForm />} 
					/>
					<Route
						path="/edit/:id" 
						exact 
						component={(props) => <PostForm { ...props } />} 
					/>
				</Switch>
    		</div>
		  </Router>
		
	  )
  }
}

export default App;