import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';
import ActiveLink from './ui/ActiveLink';

@inject('store')
@observer
export default class Nav extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}

	render() {
//		const { authenticated, authenticating } = this.store;
		return (
			<nav>
				<ActiveLink activeOnlyWhenExact={true} to='/'>Home</ActiveLink>
			</nav>
		);
	}
}
