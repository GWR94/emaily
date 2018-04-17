import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import { connect } from 'react-redux';
import Header from './Header';

const Dashboard = ({ surveys }) => {
	return (
		<div>
			<Header />
			<div className="container" style={{ marginBottom: '100px' }}>
				<h4 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '700' }}>Dashboard</h4>
				{surveys.length === 0 ? (
					<div className="dashboard-text">
						<p>
							There are no surveys to display. To create a new survey, please click the red '+' button at
							the bottom of the page.
						</p>
						<p>
							You need at least one credit to send off a set of surveys, so before proceeding please purchase some credits 
							for $5.00 by using the blue 'Add Credits' button in the pages' header.
						</p>
					</div>
				) : (
					<div className="dashboard-text">
						<p>
							Here are your current survey responses. Responses can take a minute or so for the
							percentage to update after responses, so please be patient while this loads.
						</p>
						<p>To create a new survey, please click the red '+' button at the bottom right of the page</p>
					</div>
				)}
				<SurveyList />
				<div className="fixed-action-btn">
					<Link to="/surveys/new" className="fixed-add-btn">
						<i className="material-icons">add</i>
					</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ surveys }) => {
	return {
		surveys,
	};
};

export default connect(mapStateToProps)(Dashboard);
