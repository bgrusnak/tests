import React from 'react';
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme';
import TableBody from '../src/components/TableBody'
import Measurements from '../src/components/Measurements'
import { Table } from 'react-bootstrap'




describe("<TableBody>", function () {
  it("contains spec with an expectation", function () {
    const data = [
      {
        id: '1', name: 'velocity', unit: 'm/s', measurements: [
          [6, 12],
          [5, 13],
        ]
      },
      {
        id: '2', name: 'distance', unit: 'm', measurements: [
          [6, 640],
          [5, 520]
        ]
      }
    ];

    const wrapper = shallow((<TableBody lines={data} />))
     expect(wrapper.find(Measurements)).to.have.length(2);
  });
});