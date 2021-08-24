import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ShoppingCartIcon from '../Imgs/shopping-cart-solid.svg';

export default class ShoppingCart extends Component {
  componentDidMount() {
    this.getTotalCart();
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

  elementShoppingCartEmpty() {
    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }

  render() {
    const {
      shoppingCart,
      addProductToCart,
      decreaseProductFromCart,
      deleteProductFromCart,
      quantityTotalShoppingCart } = this.props;
    const emptyCart = (shoppingCart.length === 0);

    return (
      <div>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <img className="cart-icon" alt="cart icon" src={ ShoppingCartIcon } />
          <span data-testid="shopping-cart-size">{ quantityTotalShoppingCart }</span>
        </Link>
        {emptyCart && this.elementShoppingCartEmpty()}
        <div>
          {shoppingCart.map((product) => (
            <div key={ product.id }>
              <button
                type="button"
                onClick={ () => { deleteProductFromCart(product.id); } }
              >
                X
              </button>
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <div>
                <button
                  data-testid="product-decrease-quantity"
                  type="button"
                  onClick={ () => { decreaseProductFromCart(product.id); } }
                >
                  -
                </button>
                <div data-testid="shopping-cart-product-quantity">
                  { product.cart_quantity }
                </div>
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  disabled={ (product.cart_quantity >= product.quantity) }
                  onClick={ () => { addProductToCart(product); } }
                >
                  +
                </button>
                <div>
                  R$
                  { product.price }
                  unidade
                </div>
                <div>
                  R$
                  { product.price * product.cart_quantity }
                </div>
              </div>
            </div>
          ))}
          <div>
            <h3>
              <span>
                Valor Total da Compra:
              </span>
              { ` R$ ${this.getTotalCart()}` }
            </h3>
          </div>
          <div>
            <Link
              to="/checkout"
              data-testid="checkout-products"
            >
              Finalizar Compra
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  addProductToCart: PropTypes.func.isRequired,
  decreaseProductFromCart: PropTypes.func.isRequired,
  deleteProductFromCart: PropTypes.func.isRequired,
  quantityTotalShoppingCart: PropTypes.number.isRequired,
};
