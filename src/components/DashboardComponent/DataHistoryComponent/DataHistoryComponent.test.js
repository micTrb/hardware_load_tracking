import React from 'react';
import { shallow } from 'enzyme';
import DataHistoryComponent from './DataHistoryComponent';

describe('<DataHistoryComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<DataHistoryComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
