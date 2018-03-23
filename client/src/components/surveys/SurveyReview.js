import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyReview = ({ onBack, formValues, submitSurvey, history }) => {
	const reviewFields = formFields.map(({ label, name }) => {
		return (
			<div key={label}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries:</h5>
			{reviewFields}
			<button className="btn-flat red white-text" onClick={onBack}>
				Back
			</button>
			<button
				className="btn-flat green right white-text"
				onClick={() => {
					submitSurvey(formValues, history);
				}}
			>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		formValues: state.form.surveyForm.values,
	};
};

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
