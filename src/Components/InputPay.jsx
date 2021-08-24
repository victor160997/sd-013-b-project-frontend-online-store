import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputPay extends Component {
  render() {
    const {
      value,
      updateShooper,
      updateInput,
      recusado } = this.props;
    return (
      <div className={ `form-input ${recusado && 'red'}` }>
        <label htmlFor="shopper_pay-boleto">
          <input
            type="radio"
            name="pay"
            value="Boleto"
            id="shopper_pay-boleto"
            checked={ value === 'Boleto' }
            onChange={ (event) => updateShooper('pay', event.target.value) }
            onClick={ () => (updateInput) }
          />
          Boleto
        </label>
        <label htmlFor="shopper_pay-visa">
          <input
            type="radio"
            name="pay"
            value="Visa"
            id="shopper_pay-visa"
            checked={ value === 'Visa' }
            onChange={ (event) => updateShooper('pay', event.target.value) }
            onClick={ () => (updateInput) }
          />
          Visa
        </label>
        <label htmlFor="shopper_pay-mastercard">
          <input
            type="radio"
            name="pay"
            value="MasterCard"
            id="shopper_pay-mastercard"
            checked={ value === 'MasterCard' }
            onChange={ (event) => updateShooper('pay', event.target.value) }
            onClick={ () => (updateInput) }
          />
          MasterCard
        </label>
        <label htmlFor="shopper_pay-elo">
          <input
            type="radio"
            name="pay"
            value="Elo"
            id="shopper_pay-elo"
            checked={ value === 'Elo' }
            onChange={ (event) => updateShooper('pay', event.target.value) }
            onClick={ () => (updateInput) }
          />
          Elo
        </label>
      </div>
    );
  }
}

InputPay.propTypes = {
  value: PropTypes.string.isRequired,
  updateShooper: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired,
  recusado: PropTypes.bool.isRequired,
};

export default InputPay;
