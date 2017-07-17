import React, { Component } from 'react';
export default class TableHeader extends Component {
	render() {
		return (
				<thead>
					<tr>
						<th>Name</th>
						<th>Unit</th>
						<th>Measurements</th>
					</tr>
				</thead>
		);
	}
}
