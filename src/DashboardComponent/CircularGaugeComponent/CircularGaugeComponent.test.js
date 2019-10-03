import React from 'react';
import { shallow } from 'enzyme';
import CircularGaugeComponent from './CircularGaugeComponent';

describe('<CircularGaugeComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<CircularGaugeComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
