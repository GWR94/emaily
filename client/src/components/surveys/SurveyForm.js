import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
	renderField() {
		return formFields.map(({ name, label }, i) => (
			<Field key={i} type="text" name={name} label={label} component={SurveyField} />
		));
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onNext)}>
					<div>
						<h4 style={{ textAlign: 'center', fontWeight: '600' }}>Survey Form</h4>
						<div style={{ margin: '30px 0' }}>
							<p>
								Please input data in the fields to begin the feedback process. Questions can be
								customised in the subject field.
							</p>
							<p>
								Recipients <b>must</b> be separated by a comma.
							</p>
						</div>
					</div>
					{this.renderField()}
					<Link to="/surveys" className="btn btn-danger" style={{float: 'left', marginBottom: '20px'}}>
						Cancel
					</Link>
					<button type="submit" className="btn btn-success" style={{float: 'right', marginBottom: '20px'}}>
						Next
					</button>
				</form>
			</div>
		);
	}
}

const validate = values => {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '');

	formFields.forEach(({ name, noValueError }) => {
		if (!values[name]) {
			errors[name] = noValueError;
		}
	});

	return errors;
};

export default reduxForm({
	validate: validate,
	form: 'surveyForm',
	destroyOnUnmount: false, //keeps values after clicking next & back
})(SurveyForm);
