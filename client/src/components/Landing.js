import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

const Landing = ({ auth }) => {
	return (
		<div className="background">
			<Header />
			<Container>
				<Row>
					<Col md="3" />
					<Col md="6">
						<div className="welcome-box">
							<h3 className="emaily-text" style={{ margin: '20px' }}>
								Emaily
							</h3>
							<p>
								Easily send email surveys to up to 200,000 users to gain an accurate representation of
								your thoughts.
							</p>
							<a href="/auth/google" className="btn btn-danger">
								{auth ? 'Get Started' : 'Login With Google'}
							</a>
						</div>
					</Col>
					<Col md="3" />
				</Row>
			</Container>
		</div>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Landing);
