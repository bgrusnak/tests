import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx'
import { Table } from 'react-bootstrap'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

@inject('store')
@observer
export default class Grouped extends Component {
	@observable items
	constructor(props) {
		super(props);
		this.store = props.store.appState;
		this.items = props.store.appState.grouped
	}

	render() {
		return (
			<Table striped bordered condensed hover responsive>
				<TableHeader />
				<TableBody lines={this.items} />
			</Table>
		);
	}
}
