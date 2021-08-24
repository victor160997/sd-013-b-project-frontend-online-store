import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputForm from './InputForm';
import InputUF from './InputUF';
import InputPay from './InputPay';

class FormPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: true,
      fullnameRecusado: false,
      cpfRecusado: false,
      emailRecusado: false,
      phoneRecusado: false,
      cepRecusado: false,
      addressRecusado: false,
      numberRecusado: false,
      cityRecusado: false,
      ufRecusado: false,
      payRecusado: false,
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleValidation() {
    const {
      fullnameRecusado,
      cpfRecusado,
      emailRecusado,
      phoneRecusado,
      cepRecusado,
      addressRecusado,
      numberRecusado,
      cityRecusado,
      ufRecusado,
      payRecusado,
    } = this.state;
    this.setState({
      first: false,
    });
    const formIsValid = (!fullnameRecusado
      && !cpfRecusado
      && !emailRecusado
      && !phoneRecusado
      && !cepRecusado
      && !addressRecusado
      && !numberRecusado
      && !cityRecusado
      && !ufRecusado
      && !payRecusado);
    // this.updateInput();

    return formIsValid;
  }

  handleSubmitForm(e) {
    const { first } = this.state;
    e.preventDefault();
    console.log('submit');
    this.updateInput();
    if (this.handleValidation() && !first) {
      const { handleSubmit } = this.props;
      handleSubmit();
      console.log('Form send.');
    } else {
      console.log('Form has errors.');
    }
  }

  updateInput() {
    const { data } = this.props;
    const {
      fullname,
      cpf,
      email,
      phone,
      cep,
      address,
      number,
      city,
      uf,
      pay,
    } = data;
    this.setState({
      fullnameRecusado: (fullname === ''),
      cpfRecusado: (cpf === ''),
      emailRecusado: (email === ''),
      phoneRecusado: (phone === ''),
      cepRecusado: (cep === ''),
      addressRecusado: (address === ''),
      numberRecusado: (number === ''),
      cityRecusado: (city === ''),
      ufRecusado: (uf === ''),
      payRecusado: (pay === ''),
      first: false,
    });
  }

  render() {
    const { first, fullnameRecusado, cpfRecusado, emailRecusado, phoneRecusado,
      cepRecusado, addressRecusado, numberRecusado, cityRecusado, ufRecusado,
      payRecusado } = this.state;
    const { updateShooper, data } = this.props;
    const { fullname, cpf, email, phone, cep, address, complement, number,
      city, pay, uf } = data;
    return (
      <>
        <div className="checkout-shopper">
          <InputForm
            label="Nome Completo"
            value={ fullname }
            updateShooper={ updateShooper }
            first={ first }
            updateInput={ this.updateInput }
            name="fullname"
            recusado={ fullnameRecusado }
          />
          <InputForm
            label="CPF"
            value={ cpf }
            updateShooper={ updateShooper }
            first={ first }
            updateInput={ this.updateInput }
            name="cpf"
            recusado={ cpfRecusado }
          />
          <InputForm
            label="Email"
            value={ email }
            updateShooper={ updateShooper }
            first={ first }
            updateInput={ this.updateInput }
            name="email"
            recusado={ emailRecusado }
          />
          <InputForm
            label="Telefone"
            value={ phone }
            updateShooper={ updateShooper }
            first={ first }
            updateInput={ this.updateInput }
            name="phone"
            recusado={ phoneRecusado }
          />
          <InputForm
            label="CEP"
            value={ cep }
            updateShooper={ updateShooper }
            first={ first }
            updateInput={ this.updateInput }
            name="cep"
            recusado={ cepRecusado }
          />
          <InputForm
            label="Endereço"
            value={ address }
            updateShooper={ updateShooper }
            first={ first }
            updateInput={ this.updateInput }
            name="address"
            recusado={ addressRecusado }
          />
          <InputForm
            label="Complemento"
            value={ complement }
            updateShooper={ updateShooper }
            first
            updateInput={ this.updateInput }
            name="complement"
            recusado={ false }
          />
          <InputForm
            label="Número"
            value={ number }
            updateShooper={ updateShooper }
            first={ first }
            updateInput={ this.updateInput }
            name="number"
            recusado={ numberRecusado }
          />
          <InputForm
            label="Cidade"
            value={ city }
            updateShooper={ updateShooper }
            first={ first }
            updateInput={ this.updateInput }
            name="city"
            recusado={ cityRecusado }
          />
          <InputUF
            value={ uf }
            updateShooper={ updateShooper }
            first={ first }
            updateInput={ this.updateInput }
            recusado={ ufRecusado }
          />
        </div>
        <div className="checkout-pay">
          <InputPay
            value={ pay }
            updateShooper={ updateShooper }
            updateInput={ this.updateInput }
            recusado={ payRecusado }
          />
        </div>
        <div>
          <button
            className="shopper-btn"
            type="submit"
            onClick={ this.handleSubmitForm }
          >
            Comprar
          </button>
        </div>
      </>
    );
  }
}

FormPay.propTypes = {
  updateShooper: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    cep: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    complement: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    uf: PropTypes.string.isRequired,
    pay: PropTypes.string.isRequired,
  }).isRequired,
};

export default FormPay;
