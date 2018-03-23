import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<div className="fixed-action-btn">
				<Link to="/surveys/new" className="btn-floating btn-large waves-effect waves-light red">
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
