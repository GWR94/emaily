import React from 'react';
import { connect } from 'react-redux';
import Payments from './Payments';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
class Header extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<Button
									color="danger"
									size="lg"
									onClick={() => (window.location.href = '/auth/google')}
									style={{ padding: '0 20px' }}
								>
									Login With Google
								</Button>
							</NavItem>
						</Nav>
					</Collapse>
				);
			default:
				return (
					<Collapse isOpen={this.state.isOpen} navbar key="1">
						<Nav className="ml-auto" navbar>
							<NavItem>
								<Payments style={{ margin: '0 5px' }} />
							</NavItem>
							<NavItem style={{ margin: '8px 12px 5px 8px', display: 'flex', alignContent: 'center' }}>
								Credits: {this.props.auth.credits || 0}
							</NavItem>
							<NavItem>
								<Button
									color="danger"
									size="lg"
									onClick={() => (window.location.href = '/api/logout')}
									style={{ padding: '0 20px', marginRight: '5vw'}}
								>
									Logout
								</Button>
							</NavItem>
						</Nav>
					</Collapse>
				);
		}
	}

	render() {
		return (
			<div>
				<Navbar dark expand="md" className="navbar-colors" style={{ marginBottom: '30px' }}>
					<NavbarBrand style={{ marginLeft: '5vw',fontSize: '24px'  }}>
						<NavLink className="nav-brand" to={this.props.auth ? '/surveys' : '/'}>Emaily</NavLink>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					{this.renderContent()}
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);
