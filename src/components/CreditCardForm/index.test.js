import React from 'react';
import ReactDOM from 'react-dom';
import CreditCardForm from './index';

it('<CreditCardForm /> should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreditCardForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
