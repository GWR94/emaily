import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';
import Header from '../Header';

class SurveyNew extends React.Component {
	state = { showReview: false };

	render() {
		return (
			<div>
				<Header />
				<div className="container">
					{this.state.showReview ? (
						<SurveyReview onBack={() => this.setState({ showReview: false })} />
					) : (
						<SurveyForm onNext={() => this.setState({ showReview: true })} />
					)}
				</div>
			</div>
		);
	}
}

export default reduxForm({
	form: 'surveyForm',
})(SurveyNew);
