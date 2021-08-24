import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ufData from '../services/ufData';

class InputUF extends Component {
  render() {
    const {
      value,
      updateShooper,
      first,
      updateInput,
      recusado } = this.props;
    return (
      <div className={ `form-input ${recusado && 'red'}` }>
        <label htmlFor="shopper_uf">
          <select
            placeholder="Estado"
            id="shopper_uf"
            value={ value }
            onChange={ (event) => updateShooper('uf', event.target.value) }
            onClick={ () => ((first) ? false : updateInput) }
          >
            { ufData.map((ufD) => (
              <option key={ ufD.areviacao } value={ ufD.areviacao }>
                { ufD.estado }
              </option>
            )) }
          </select>
          Estado
        </label>
      </div>
    );
  }
}

InputUF.propTypes = {
  value: PropTypes.string.isRequired,
  updateShooper: PropTypes.func.isRequired,
  first: PropTypes.bool.isRequired,
  updateInput: PropTypes.func.isRequired,
  recusado: PropTypes.bool.isRequired,
};

export default InputUF;
