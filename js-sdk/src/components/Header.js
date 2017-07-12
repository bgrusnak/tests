import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

@inject('store')
@observer
export default class Header extends Component {
	@observable currentState = 'Stopped'
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}


	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">JS-SDK test</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav bsStyle="pills">
					<NavItem eventKey={1} onSelect={() => { this.currentState = 'Runned'; this.store.isRunning = true; }}>Start</NavItem>
					<NavItem eventKey={2} onSelect={() => { this.currentState = 'Stopped'; this.store.isRunning = false; }}>Stop</NavItem>
					<NavItem eventKey={3} disabled >{this.currentState}</NavItem>
				</Nav>
			</Navbar>
		);
	}
}
