import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Payments from '../Payments';
import { Button } from 'reactstrap';

Modal.setAppElement('#root');
class SurveyReview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false,
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	render() {
		const reviewFields = formFields.map(({ label, name }) => {
			return (
				<div key={label} style={{ marginBottom: '20px' }}>
					<label>
						<b>{label}</b>
					</label>
					<div>{this.props.formValues[name]}</div>
				</div>
			);
		});

		const customStyles = {
			content: {
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				marginRight: '-50%',
				transform: 'translate(-50%, -50%)',
				padding: '40px',
				background: '#E57373',
				color: 'white',
			},
		};

		return (
			<div>
				<h4 className="text-center" style={{ fontWeight: '700' }}>
					Are you sure?
				</h4>
				{reviewFields}
				<button className="btn btn-danger" onClick={this.props.onBack} style={{ marginBottom: '20px' }}>
					Back
				</button>
				<button
					className="btn btn-success"
					onClick={() => {
						if (this.props.credits > 0) {
							this.props.submitSurvey(this.props.formValues, this.props.history);
						} else {
							this.setState({ modalIsOpen: true });
							// MODAL
						}
					}}
					style={{ float: 'right', marginBottom: '20px' }}
				>
					Send Survey
				</button>

				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal"
					style={customStyles}
				>
					<div className="text-center">
						<h3 style={{ marginBottom: '10px' }}>Not enough Credits!</h3>
						<p>
							You need at least one credit to send off this survey. <br />
							Please purchase credits by clicking the button below.
						</p>
						<div className="text-center">
							<Payments style={{ margin: '0 5px' }} />
							<Button color="danger" className="text-center" onClick={this.closeModal}>
								Close
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		formValues: state.form.surveyForm.values,
		credits: state.auth.credits,
	};
};

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
