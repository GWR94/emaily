import React from 'react';
import Header from './Header';

const Landing = () => {
	return (
		<div className="background">
			<Header />
			<div className="welcome-box" style={{ textAlign: 'center', margin: '14vw auto', border: '2px solid black', background: 'white', padding: '10px 30px 30px 20px', width: '400px', borderRadius: '30px' }}>
				<h3 className="emaily-text">Emaily</h3>
				<p>
					Send surveys to hundreds of thousands of people to get an accurate representation of your their thoughts.
				</p>
				<a href="/auth/google" className="btn-flat red">Login With Google</a>
			</div>
		</div>
	);
};

export default Landing;
