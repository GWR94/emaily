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
					{this.renderField()}
					<Link to="/surveys" className="red btn-flat left white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
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
	destroyOnUnmount: false //keeps values after clicking next & back
})(SurveyForm);
