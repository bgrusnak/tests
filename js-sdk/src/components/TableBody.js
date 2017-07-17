import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import Measurements from './Measurements'

export default class TableBody extends Component {
	render() {
		return (
			<tbody>
				{this.props.lines.map((item, itemindex) => {
					return (
						<tr key={itemindex}>
							<td>{item.name}</td>
							<td>{item.unit}</td>
							<td>
								<Measurements measurements={item.measurements} />
							</td>
						</tr>
					)
				})}
			</tbody>
		);
	}
}
