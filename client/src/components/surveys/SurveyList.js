import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Progress } from 'reactstrap';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class SurveyList extends Component {
	state = {
		desktop: window.innerWidth > 600,
	};

	componentDidMount() {
		this.props.fetchSurveys();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => {
		let desktop = window.innerWidth > 600;
		this.setState({ desktop });
	};

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			let yes, no;
			if (survey.yes === 0 && survey.no >= 1) {
				no = 100;
				yes = 0;
			} else if (survey.no === 0 && survey.yes >= 1) {
				yes = 100;
				no = 0;
			} else if (survey.no === survey.yes) {
				yes = 50;
				no = 50;
			} else if (survey.no > survey.yes) {
				yes = Math.round(survey.yes / survey.no * 100);
				no = 100 - yes;
			} else {
				no = Math.round(survey.no / survey.yes * 100);
				yes = 100 - no;
			}
			return (
				<div key={survey._id}>
					<Card className="navbar-colors" style={{ marginBottom: '20px' }}>
						<CardBody>
							<CardTitle className="survey-title">{survey.title}</CardTitle>
							<Button
								onClick={() => {
									this.props.deleteSurvey(survey._id, this.props.history);
									window.location.reload();
								}}
								color="danger"
								style={{borderRadius: '50%', position: 'absolute', top: '6px', right: '3px', width: '30px', height: '30px'}}
							>
							<i className="material-icons" style={{fontSize: '18px', marginLeft: '-7px'}}>close</i>
							</Button>
							<CardSubtitle className="survey-subtitle">{survey.body}</CardSubtitle>
							<CardText style={{ float: 'right' }} className="survey-sent">
								Sent On: {new Date(survey.dateSent).toLocaleDateString()}
							</CardText>
							<CardText>
								<br />
								<Progress multi style={{ width: '100%', height: '24px' }} className="survey-progress">
									<Progress bar color="success" value={yes}>
										{!this.state.desktop && yes < 20 ? '' : `Yes: ${survey.yes}`}
									</Progress>
									<Progress bar color="danger" value={no}>
										{!this.state.desktop && no < 20 ? '' : `No: ${survey.no}`}
									</Progress>
								</Progress>
							</CardText>
						</CardBody>
					</Card>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(withRouter(SurveyList));
