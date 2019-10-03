import React from 'react';
import { shallow } from 'enzyme';
import DashboardComponent from './DashboardComponent';

describe('<DashboardComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<DashboardComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
