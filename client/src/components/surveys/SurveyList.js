import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Progress } from 'reactstrap';

class SurveyList extends Component {
	state = {
		desktop: window.innerWidth > 600
	}
	componentDidMount() {
		this.props.fetchSurveys();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.updateWindowDimensions);		
	}

	updateWindowDimensions = () => {
		let desktop = window.innerWidth > 600;
		this.setState({ desktop });
	};


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
							<CardTitle className="survey-title">{survey.title}</CardTitle>
							<CardSubtitle className="survey-subtitle">{survey.body}</CardSubtitle>
							<CardText style={{ float: 'right' }} className="survey-sent">
								Sent On: {new Date(survey.dateSent).toLocaleDateString()}
							</CardText>
							<CardText>
								<br />
								<Progress multi style={{width: '100%', height: '24px'}} className="survey-progress">
									<Progress bar color="success" value={yes}>{ !this.state.desktop && yes < 20 ? '' : `Yes: ${survey.yes}`}</Progress>
									<Progress bar color="danger" value={no}>{ !this.state.desktop && no < 20 ? '' : `No: ${survey.no}`}</Progress>
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
