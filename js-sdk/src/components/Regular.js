import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx'
import { Table, Grid, Row, Col } from 'react-bootstrap'

@inject('store')
@observer
export default class Regular extends Component {
	@observable items
	constructor(props) {
		super(props);
		this.store = props.store.appState;
		this.items = props.store.appState.items
	}

	render() {
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
										<tr id={item._id}>
											<td>{item.name}</td>
											<td>{item.unit}</td>
											<td>
												<Table striped bordered condensed hover responsive>
													<thead>
														<tr>
															<th>Timestamp</th>
															<th>Value</th>
														</tr>
													</thead>
													<tbody>
														{item.measurements.map(measure => {
															return (
																<tr id={measure[0]}>
																<td>{measure[0]}</td>
																<td>{JSON.stringify(measure[1])}</td>
															</tr>
															)
														})}
													</tbody>
												</Table>
												</td>
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
