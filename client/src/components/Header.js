import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			default:
				return [
					<li key="0">
						<Payments />
					</li>,
					<li key="1" style={{margin: '0 10px 0 20px'}}>
						Credits: {this.props.auth.credits || 0}
					</li>,
					<li key="2">
						<a className="red btn" href="/api/logout">Logout</a>
					</li>,
				];
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo emaily-text" style={{marginLeft: '100px'}}>
						Emaily
					</Link>
					<ul className="right" style={{marginRight: '100px'}}>{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);
