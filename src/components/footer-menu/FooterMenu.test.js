import React from 'react';
import ReactDOM from 'react-dom';
import FooterMenu from './FooterMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FooterMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});