import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import LazyRoute from 'lazy-route';
import DevTools from 'mobx-react-devtools';

import Footer from './Footer';
import Header from './Header';


@inject('store', 'routing')
@observer
export default class App extends Component {
	constructor(props) {
		super(props);

		this.store = this.props.store;
	}

	render() {
		const {
			timeToRefresh,
			refreshToken
		} = this.store.appState;

		return (
			<div className='wrapper'>
				<Header location={this.props.routing.location} />
				<Route
					exact
					path='/'
					render={props => (
						<LazyRoute {...props} component={import('./Home')} />
					)}
				/>
				<Footer />
			</div>
		);
	}
}
