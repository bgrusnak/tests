import React from 'react';
import Link from '../src/Home';
import renderer from 'react-test-renderer';
import stores from '../src/stores/stores';

test('Home test', () => {
  const component = renderer.create(
    <Home props={store}>Facebook</Link>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});