import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends React.Component {
	state = { showReview: false };

	render() {
		return (
			<div>
				{this.state.showReview ? (
					<SurveyReview onBack={() => this.setState({ showReview: false })} />
				) : (
					<SurveyForm onNext={() => this.setState({ showReview: true })} />
				)}
			</div>
		);
	}
}

export default reduxForm({
	form: 'surveyForm',
})(SurveyNew);
