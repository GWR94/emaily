import React from 'react';
import Header from './Header';

const Landing = () => {
	return (
		<div className="background">
			<Header />
			<div className="welcome-box">
				<h3 className="emaily-text">Emaily</h3>
				<p>
					Easily send email surveys to up to 200,000 users to gain an accurate representation of your thoughts.
				</p>
				<a href="/auth/google" className="btn-flat red lighten-1 white-text">Login With Google</a>
			</div>
		</div>
	);
};

export default Landing;
