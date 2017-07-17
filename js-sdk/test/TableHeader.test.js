import React from 'react';
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme';
import TableHeader from '../src/components/TableHeader';

describe("<TableHeader>", function () {
  it("contains spec with an expectation", function () {
    const wrapper = shallow((<TableHeader />))
    expect(wrapper.equals(<thead>
      <tr>
        <th>Name</th>
        <th>Unit</th>
        <th>Measurements</th>
      </tr>
    </thead>)).to.be.true;
  });
});