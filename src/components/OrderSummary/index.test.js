import React from 'react';
import ReactDOM from 'react-dom';
import OrderSummary from './index';

it('<OrderSummary /> should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderSummary />, div);
  ReactDOM.unmountComponentAtNode(div);
});
