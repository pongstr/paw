import './index.sass';
import React from 'react';

export default class OrderSummary extends React.Component {
  /**
   * @method
   * @name handleAskQuestion
   * @summary
   * @params
   * @returns
   */
  handleAskQuestion = () => null

  render() {
    return(
      <div className="order-summary">
        <div className="brand">
          <img src="https://cdn-docs-images.paw.cloud/Pawprint-8b9298abbfda8d9355c046e72cb155f7.svg" alt="Paw" />
        </div>

        <table className="order-table">
          <caption className="order-table__caption">Order Summary</caption>
          <tbody>
            <tr>
              <td className="order-table__description" colSpan="2">
                <p>
                  Before you place your order, please take a moment to review your
                  shipping information and cart summary.
                </p>
              </td>
            </tr>
            <tr>
              <td className="order-table__product-name">Personal License</td>
              <td className="order-table__product-price">€49.99</td>
            </tr>
            <tr>
              <td className="order-table__product-name">EU VAT (20%)</td>
              <td className="order-table__product-price">€10.00</td>
            </tr>
            <tr>
              <td className="order-table__product-total">Total</td>
              <td className="order-table__product-total-price">€59.99 EUR</td>
            </tr>
          </tbody>
        </table>

        <section className="order-summary__customer-service">
          <h4>Need any help?</h4>
          <p>
            We're a small team, but always happy to answer our users. So don't be shy!
          </p>
          <button className="faq-button" onClick={this.handleAskQuestion}>
            <span>Ask a Question</span>
          </button>
        </section>

        <section className="order-secure-payments">
          <h4>Secure Payments</h4>
          <p>
            We're processing payments via Stripe.
            Credit card data never hits our servers.
          </p>
        </section>
      </div>
    )
  }
}
