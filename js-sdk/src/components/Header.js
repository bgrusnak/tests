import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';

import Nav from './Nav';
import Button from './ui/Button';

@inject('store')
@observer
export default class Header extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}


	render() {
	
		return (
			<header className='header'>
				<Nav location={this.props.location} />
			</header>
		);
	}
}
