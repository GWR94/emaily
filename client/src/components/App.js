import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './SurveyNew';
import Header from './Header';

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<div className="container">
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
