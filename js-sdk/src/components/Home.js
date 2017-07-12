import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx'
import { Table, Grid, Row, Col } from 'react-bootstrap'

@inject('store')
@observer
export default class Home extends Component {
	@observable items
	constructor(props) {
		super(props);
		this.store = props.store.appState;
		this.items = props.store.appState.items
	}

	componentWillReceiveProps = function (nextProps) {
		console.log('new props', nextProps)
	}

	componentWillUpdate = function (nextProps) {
		console.log('new update', nextProps)
	}



	render() {
		//		const store = this.store;
		return (
			<Grid>
				<Row>
					<Col>
						<Table striped bordered condensed hover responsive>
							<thead>
								<tr>
									<th>Name</th>
									<th>Unit</th>
									<th>Measurements</th>
								</tr>
							</thead>
							<tbody>
								{this.items.map((item) => {
									let data = JSON.stringify(item.measurements)
									return (
										<tr>
											<td>{item.name}</td>
											<td>{item.unit}</td>
											<td>{data}</td>
										</tr>
									)
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Grid>
		);
	}
}
