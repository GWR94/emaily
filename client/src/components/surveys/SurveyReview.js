import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyReview = ({ onBack, formValues, submitSurvey, history }) => {
	const reviewFields = formFields.map(({ label, name }) => {
		return (
			<div key={label} style={{marginBottom: '20px'}}>
				<label><b>{label}</b></label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h4>Please confirm your entries:</h4>
			{reviewFields}
			<button className="btn btn-danger" onClick={onBack}>
				Back
			</button>
			<button
				className="btn btn-success"
				onClick={() => {
					submitSurvey(formValues, history);
				}}
				style={{float: 'right'}}
			>
				Send Survey
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
