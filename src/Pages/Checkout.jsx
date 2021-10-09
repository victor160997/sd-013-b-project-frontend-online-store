import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import FormPay from '../Components/FormPay';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
      fullname: '',
      cpf: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      complement: '',
      number: '',
      city: '',
      uf: '',
      pay: '',
    };
    this.updateShooper = this.updateShooper.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    this.getTotalCart();
  }

  handleSubmit() {
    const { clearCart } = this.props;
    this.resetForm();
    console.log(this.state);
    clearCart();
    this.setState({
      shouldRedirect: true,
    });
  }

  getTotalCart() {
    const { shoppingCart } = this.props;
    const newTotalCart = shoppingCart
      .reduce(
        (acc, currentValue) => (
          acc + (currentValue.price * currentValue.cart_quantity)
        ), 0,
      );
    return newTotalCart;
  }

  resetForm() {
    this.setState({
      fullname: '',
      cpf: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      complement: '',
      number: '',
      city: '',
      uf: '',
      pay: '',
    });
  }

  updateShooper(field, newValue) {
    this.setState({
      [field]: newValue,
    });
  }

  updateInput(key, value) {
    const verificacao = (value === '');
    this.setState({
      [`${key}Recusado`]: verificacao,
    });
  }

  render() {
    const { shouldRedirect } = this.state;
    const {
      shoppingCart,
    } = this.props;
    if (shouldRedirect) {
      // Redirect
      return <Redirect to="/" />;
    }

    return (
      <div className="checkout-body">
        <div className="checkout-resume">
          <ul>
            {shoppingCart.map((product) => (
              <li key={ product.id }>
                <span>{ product.cart_quantity }</span>
                <span>{ product.title }</span>
                <span>
                  { `R$ ${product.price * product.cart_quantity}` }
                </span>
              </li>
            ))}
          </ul>
          <div className="checkout-resume-total">
            <span>Total:</span>
            { ` R$ ${this.getTotalCart()}` }
          </div>
        </div>
        <FormPay
          updateShooper={ this.updateShooper }
          handleSubmit={ this.handleSubmit }
          data={ this.state }
        />
      </div>
    );
  }
}

Checkout.propTypes = {
  shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearCart: PropTypes.func.isRequired,
};
