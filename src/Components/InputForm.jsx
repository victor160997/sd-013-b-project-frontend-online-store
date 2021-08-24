import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputForm extends Component {
  render() {
    // Nome Completo, fullname(state), func, first, func, 'fullname', fullnameRecusado
    const {
      label,
      value,
      updateShooper,
      first,
      updateInput,
      name,
      recusado } = this.props;
    return (
      <div className={ `form-input ${recusado && 'red'}` }>
        <label htmlFor={ `shopper_${name}` }>
          <input
            placeholder={ label }
            data-testid={ `checkout-${name}` }
            id={ `shopper_${name}` }
            type="text"
            value={ value }
            onChange={ (event) => (updateShooper(name, event.target.value)) }
            onKeyPress={ () => ((first) ? false : updateInput) }
          />
          { label }
        </label>
      </div>
    );
  }
}

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateShooper: PropTypes.func.isRequired,
  first: PropTypes.bool.isRequired,
  updateInput: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  recusado: PropTypes.bool.isRequired,
};

export default InputForm;
