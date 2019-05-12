import React from 'react';
import ReactDOM from 'react-dom';
import OrderForm from './OrderForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});