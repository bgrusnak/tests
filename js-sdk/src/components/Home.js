import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Grid, Row, Col } from 'react-bootstrap'

@inject('store')
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		const store = this.store;
		return (
			<Grid>
				<Row>
					<Col>
						Hi
					</Col>
				</Row>
			</Grid>
		);
	}
}
