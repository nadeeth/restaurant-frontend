import React from 'react';
import ReactDOM from 'react-dom';
import Outage from './Outage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Outage />, div);
  ReactDOM.unmountComponentAtNode(div);
});