import './index.sass';
import React from 'react';

export default class CreditCardForm extends React.Component {
  state = {
    isCompleted: false,
    inputCardHolderName: {
      value: '',
      isValid: null ,
      message: null
    },
    inputCardNumber: {
      value: '',
      isValid: null ,
      message: null
    },
    inputCardExpirationMonth: {
      value: '',
      isValid: null ,
      message: null
    },
    inputCardExpirationYear: {
      value: '',
      isValid: null ,
      message: null
    },
    inputCardSecurityCode: {
      value: '',
      isValid: null ,
      message: null
    }
  }

  /**
   * @method
   * @name luhnHandleValidate
   * @summary {String} value -
   * @params {Object} event
   * @returns {Boolean}
   */
  luhnValidate = (value) => {
    if (/[^0-9-\s]+/.test(value)) return false;

    let nCheck = 0
    let bEven = false

    value = value.replace(/\D/g, '')

    for (let n = value.length - 1; n >= 0; n--) {
      let cDigit = value.charAt(n)
      let nDigit = parseInt(cDigit, 10);

      if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) === 0;
  }

  /**
   * @method
   * @name luhnHandleValidate
   * @summary
   * @params {Object} event
   * @returns {Void}
   */
  luhnFormat = (str) => str.replace(/(\d{4}(?!\s))/g, '$1 ').trim()

  /**
   * @method
   * @name handleCardNumberChange
   * @summary
   * @params {Object} event
   * @returns {Void}
   */
  handleCardNumberChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const value = e.target.value.toString().trim()

    if (value === '') {
      this.setState({
        inputCardNumber: {
          value: this.luhnFormat(value),
          isValid: false,
          message: 'This field is required for checkout.'
        }
      })
      return
    }

    if (!this.luhnValidate(value)) {
      this.setState({
        inputCardNumber: {
          value: this.luhnFormat(value),
          isValid: false,
          message: 'Wooops!, something is not right. The number you provided is not valid.'
        }
      })
      return
    }

    this.setState({
      inputCardNumber: {
        value: this.luhnFormat(value),
        isValid: true,
        message: 'medal!'
      }
    })
  }

  /**
   * @method
   * @name handleNameChange
   * @summary
   * @params {Object} event
   * @returns {Void}
   */
  handleNameChange = (e) => {
    const value = e.target.value.trim()

    if (value === '') {
      this.setState({
        inputCardHolderName: {
          value,
          isValid: false,
          message: 'This field is required for checkout'
        }
      })
      return
    }

    this.setState({
      inputCardHolderName: {
        value,
        isValid: true,
        message: ''
      }
    })
  }

  /**
   * @method
   * @name handleMonthChange
   * @summary
   * @params {Object} event
   * @returns {Void}
   */
  handleMonthChange = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!e.target.value || e.target.value.trim() === '') {
      this.setState({
        inputCardExpirationMonth: {
          value: '',
          isValid: false,
          message: 'Please input the month.'
        }
      })
      return
    }

    const value = parseInt(e.target.value, 10)

    if (value <= 1 && value < 12) {
      this.setState({
        inputCardExpirationMonth: {
          value,
          isValid: true,
          message: ''
        }
      })
      return
    }
  }

  /**
   * @method
   * @name handleYearChange
   * @summary
   * @params {Object} event
   * @returns {Void}
   */
  handleYearChange = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!e.target.value || e.target.value.trim() === '') {
      this.setState({
        inputCardExpirationYear: {
          value: '',
          isValid: false,
          message: 'Please input the year.'
        }
      })
      return
    }

    const value = parseInt(e.target.value, 10)

    if (value <= 2016 && value < 2040) {
      this.setState({
        inputCardExpirationYear: {
          value,
          isValid: true,
          message: ''
        }
      })
      return
    }
  }

  /**
   * @method
   * @name handleSecurityCodeChange
   * @summary
   * @params {Object} event
   * @returns {Void}
   */
  handleSecurityCodeChange = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const value = e.target.value

    if (value.length < 3) {
      this.setState({
        inputCardSecurityCode: {
          value,
          isValid: false,
          message: 'Please find the security code on the back of the card.'
        }
      })
      return
    }

    this.setState({
      inputCardSecurityCode: {
        value,
        isValid: true,
        message: ''
      }
    })
  }

  /**
   * @method
   * @name handleSubmit
   * @summary
   * @params {Object} eventw
   * @returns {Void}
   */
  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  autoFill = (e) => {
    e.preventDefault()
    e.stopPropagation()

    this.setState({
      isCompleted: true,
      inputCardHolderName: {
        value: 'John Smith',
        isValid: true ,
        message: null
      },
      inputCardNumber: {
        value: this.luhnFormat('3566002020360505'),
        isValid: true ,
        message: null
      },
      inputCardExpirationMonth: {
        value: 5,
        isValid: true ,
        message: null
      },
      inputCardExpirationYear: {
        value: 2020,
        isValid: true ,
        message: null
      },
      inputCardSecurityCode: {
        value: 911,
        isValid: true ,
        message: null
      }
    })
  }

  /**
   * @method
   * @name renderInputHelper
   * @summary
   * @params {String} type - type of helper e.g., input-helper--{success,danger},
   * @params {String} message - the message to be conveyed to the UI
   * @returns {HTMLElement<small>}
   */
  renderInputHelper(type, message) {
    return(
      <small className={ `input-helper ${type}` }>{ message }</small>
    )
  }

  inputFieldState(isValid) {
    switch (isValid) {
      case true:
        return 'form-input--success'
      case false:
        return 'form-input--danger'
      case null:
      default:
        return ''
    }
  }

  render() {
    const helperError = 'input-helper--danger'
    const {
      inputCardHolderName,
      inputCardNumber,
      inputCardExpirationMonth,
      inputCardExpirationYear,
      inputCardSecurityCode
    } = this.state

    return(
      <div className="credit-card-form">
        <h2 className="credit-card-form__title">Pay by Credit/Debit Card</h2>
        <small className="input-helper input-helper--tagline">
          Some tagline should go here to complete the visual emptiness.
        </small>

        <form onSubmit={this.handleSubmit}>
          <div className="credit-card__input credit-card__input--fullname">
            <label
              className="form-input-label"
              htmlFor="input-card-holder-name">
              Cardholder Name
            </label>
            <input
              id="input-card-holder-name"
              name="input-card-holder-name"
              className={`form-input form-input--full-width ${this.inputFieldState(inputCardHolderName.isValid)}`}
              type="text"
              placeholder="e.g., John Smith"
              value={inputCardHolderName.value}
              onBlur={this.handleNameChange}
              onChange={this.handleNameChange} />

            {(inputCardHolderName.isValid === false)
              ? this.renderInputHelper(helperError, inputCardHolderName.message)
              : this.renderInputHelper('', 'Find this on the front of your card.')}
          </div>

          <div className="credit-card__input credit-card__input--cardnumber">
            <label
              className="form-input-label"
              htmlFor="input-card-number">Card Number</label>
            <input
              id="input-card-number"
              name="input-card-number"
              className={`form-input form-input--full-width ${this.inputFieldState(inputCardNumber.isValid)}`}
              type="tel"
              maxLength="19"
              placeholder="#### #### #### ####"
              value={inputCardNumber.value}
              onKeyUp={this.handleCardNumberChange}
              onChange={this.handleCardNumberChange}
              onBlur={this.handleCardNumberChange} />

            {(inputCardNumber.isValid === false)
              ? this.renderInputHelper(helperError, inputCardNumber.message)
              : this.renderInputHelper('', 'The digits on the front of your card.')}
          </div>

          <div className="row">
            <div className="credit-card__input credit-card__input--expiration">
              <label
                htmlFor="input-card-expiration-month"
                className="form-input-label">Expiration</label>
              <input
                id="input-card-expiration-month"
                name="input-card-expiration-month"
                className={`form-input form-input--inline ${this.inputFieldState(inputCardExpirationMonth.isValid)}`}
                type="number"
                min="01"
                max="12"
                placeholder="MM"
                value={inputCardExpirationMonth.value}
                onBlur={this.handleMonthChange}
                onChange={this.handleMonthChange} />
              <input
                id="input-card-expiration-year"
                name="input-card-expiration-year"
                className={`form-input form-input--inline ${this.inputFieldState(inputCardExpirationYear.isValid)}`}
                type="number"
                min="2016"
                max="2030"
                placeholder="YYYY"
                value={inputCardExpirationYear.value}
                onBlur={this.handleYearChange}
                onChange={this.handleYearChange} />

              {this.renderInputHelper('', 'Month/Year the credit card expires.')}

              {inputCardExpirationMonth.isValid === false &&
                  this.renderInputHelper(helperError, inputCardExpirationMonth.message)}

              {inputCardExpirationYear.isValid === false &&
                  this.renderInputHelper(helperError, inputCardExpirationYear.message)}
            </div>


            <div className="credit-card__input credit-card__input--security">
              <label
                className="form-input-label"
                htmlFor="input-card-security-code">Security Code</label>
              <input
                id="input-card-security-code"
                name="input-card-security-code"
                type="number"
                minLength="3"
                maxLength="3"
                className={`form-input form-input--auto ${this.inputFieldState(inputCardSecurityCode.isValid)}`}
                placeholder="###"
                value={inputCardSecurityCode.value}
                onBlur={this.handleSecurityCodeChange}
                onChange={this.handleSecurityCodeChange} />

              {inputCardSecurityCode.isValid === false
                  ? this.renderInputHelper(helperError, inputCardSecurityCode.message)
                  : this.renderInputHelper('', 'Find this on the back of your card.')}
            </div>
          </div>

          <div className="credit-card__submit">
            <button type="submit" className="credit-card-button">
              Proceed to Checkout
            </button>
            <button type="button" className="autofill" onClick={this.autoFill}>
              Autofill the Form
            </button>
          </div>
        </form>
      </div>
    )
  }
}
