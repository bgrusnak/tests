import React, { Component } from 'react';
import { Table } from 'react-bootstrap'

export default class Measurements extends Component {
  render() {
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {this.props.measurements.map((measure, index) => {
            return (
              <tr key={index}>
                <td>{measure[0]}</td>
                <td>{JSON.stringify(measure[1])}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    );
  }
}
