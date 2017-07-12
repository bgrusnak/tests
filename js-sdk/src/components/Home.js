import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Tabs, Tab } from 'react-bootstrap'
import Regular from './Regular'
import Grouped from './Grouped'

@inject('store')
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = props.store.appState;
		this.items = props.store.appState.items
	}

	render() {
		return (
		<Tabs id="t">
      <Tab eventKey={1}   title="Regular"><Regular  /></Tab>
      <Tab eventKey={2}   title="Grouped"><Grouped  /></Tab>
    </Tabs>
		);
	}
}
