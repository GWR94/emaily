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
					<Col/>
					<Col md="6">
						<div className="welcome-box">
							<h3 className="emaily-text" style={{ margin: '20px', fontWeight: '700' }}>
								Emaily
							</h3>
							<p>
								Easily send surveys to your customers to gain an accurate representation of
								their thoughts.
							</p>
							<a href="/auth/google" className="btn btn-danger">
								{auth ? 'Get Started' : 'Login With Google'}
							</a>
						</div>
					</Col>
					<Col/>
				</Row>
			</Container>
		</div>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Landing);
