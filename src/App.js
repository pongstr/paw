import './App.sass';

import React from 'react';
import CreditCardForm from './components/CreditCardForm';
import OrderSummary from './components/OrderSummary';

export default class App extends React.Component {
  render() {
    return(
      <div className="app">
        <div className="card-block">
          <div className="card-block__column">
            <OrderSummary />
          </div>
          <div className="card-block__column">
            <CreditCardForm />
          </div>
        </div>
      </div>
    )
  }
}
