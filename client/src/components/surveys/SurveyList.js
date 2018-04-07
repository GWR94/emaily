import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Progress } from 'reactstrap';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			let yes, no;
			if(survey.yes === 0 && survey.no >= 1) {
				no = 100;
				yes = 0;
			} else if(survey.no === 0 && survey.yes >= 1) {
				yes = 100;
				no = 0;
			} else if(survey.no === survey.yes) {
				yes = 50;
				no = 50;
			} else if(survey.no > survey.yes) {
				yes = survey.yes / survey.no * 100;
				no = 100 - yes;
			} else {
				no = survey.no / survey.yes * 100;
				yes = 100 - no;
			}
			return (
				<div key={survey._id}>
					<Card className="navbar-colors" style={{ marginBottom: '20px' }}>
						<CardBody>
							<CardTitle>{survey.title}</CardTitle>
							<CardSubtitle>{survey.body}</CardSubtitle>
							<CardText style={{ float: 'right' }}>
								Sent On: {new Date(survey.dateSent).toLocaleDateString()}
							</CardText>
							<CardText>
								<br />
								<Progress multi style={{width: '100%', fontSize: '14px', height: '24px'}}>
									<Progress bar color="success" value={yes}>{`Yes: ${Math.round(Math.ceil(yes))}% ( ${survey.yes} )`}</Progress>
									<Progress bar color="danger" value={no}>{`No: ${Math.round(Math.floor(no))}% ( ${survey.no} )`}</Progress>
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

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
