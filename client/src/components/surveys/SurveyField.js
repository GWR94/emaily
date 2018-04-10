import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const SurveyField = ({ input, label, meta: { touched, error } }) => {
	return (
		<FormGroup>
			<Label><b>{label}</b></Label>
			<Input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px', color: 'red' }}>
				{touched && error}
			</div>
		</FormGroup>
	);
};

export default SurveyField;
