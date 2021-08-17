import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ShoppingCartIcon from '../Imgs/shopping-cart-solid.svg';

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      totalCart: 0,
      oldTotalCart: 1,
    };
    this.getTotalCart = this.getTotalCart.bind(this);
    this.refreshTotalCartState = this.refreshTotalCartState.bind(this);
  }

  componentDidUpdate() {
    const { totalCart, oldTotalCart } = this.state;
    if (totalCart !== oldTotalCart) {
      this.getTotalCart();
      this.refreshTotalCartState();
    }
  }

  getTotalCart() {
    const { shoppingCart } = this.props;
    const newTotalCart = shoppingCart
      .reduce(
        (acc, currentValue) => (
          acc + (currentValue.price * currentValue.cart_quantity)
        ), 0,
      );
    this.setState({
      totalCart: newTotalCart,
    });
  }

  refreshTotalCartState() {
    const { totalCart } = this.state;
    this.setState({
      oldTotalCart: totalCart,
    });
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
      deleteProductFromCart } = this.props;
    const emptyCart = (shoppingCart.length === 0);
    const { totalCart } = this.state;

    return (
      <div>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <img className="cart-icon" alt="cart icon" src={ ShoppingCartIcon } />
        </Link>
        {emptyCart && this.elementShoppingCartEmpty()}
        <div>
          {
            shoppingCart.map((product) => (
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
            ))
          }
        </div>
        <div>
          <h3>
            <span>
              Valor Total da Compra:
            </span>
            R$
            { totalCart }
          </h3>
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
};
