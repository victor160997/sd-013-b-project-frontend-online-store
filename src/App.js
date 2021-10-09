import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import * as api from './services/api';
import './App.css';
import ShoppingCart from './Pages/ShoppingCart';
import ProductDetails from './Pages/ProductDetails';
import Checkout from './Pages/Checkout';

export default class App extends Component {
  constructor() {
    super();
    this.state = JSON
      .parse(window.localStorage.getItem('shoppingCart')) || {
      loadingCategories: true,
      categories: [],
      inputSearch: '',
      shoppingCart: [],
      quantityTotalShoppingCart: 0,
      search: [],
      categoryFilter: '',
      categoryFilterOld: '',
      productComments: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchRequest = this.searchRequest.bind(this);
    this.setProductComments = this.setProductComments.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.decreaseProductFromCart = this.decreaseProductFromCart.bind(this);
    this.deleteProductFromCart = this.deleteProductFromCart.bind(this);
    this.quantityTotalCart = this.quantityTotalCart.bind(this);
    this.saveSession = this.saveSession.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  componentDidMount() {
    api.getCategories()
      .then(
        (result) => this.setState({
          loadingCategories: false,
          categories: result,
        }),
      );
    const { quantityTotalShoppingCart, shoppingCart } = this.state;
    if (quantityTotalShoppingCart === 0 && shoppingCart.length !== 0) {
      this.quantityTotalCart();
    }
  }

  componentDidUpdate() {
    const { categoryFilter, categoryFilterOld } = this.state;
    if (categoryFilter !== categoryFilterOld) {
      this.searchRequest();
      this.refleshCategoryFilterState();
    }
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  setProductComments(comment) {
    this.setState(({ productComments }) => ({
      productComments: [...productComments, comment] }));
  }

  clearCart() {
    this.setState({ shoppingCart: [] });
  }

  searchRequest() {
    const { inputSearch, categoryFilter } = this.state;
    api.getProductsFromCategoryAndQuery(categoryFilter, inputSearch)
      .then((apiSearch) => {
        this.setState({ search: apiSearch.results });
      });
  }

  refleshCategoryFilterState() {
    const { categoryFilter } = this.state;
    this.setState({ categoryFilterOld: categoryFilter });
  }

  addProductToCart(product) {
    const { id, title, price, available_quantity: quantity } = product;
    const newProduct = {
      id,
      title,
      price,
      quantity,
      cart_quantity: 1,
    };
    const { shoppingCart } = this.state;
    const currentItem = shoppingCart.filter((item) => item.id === newProduct.id);
    if (currentItem.length === 0) {
      this.setState(() => ({
        shoppingCart: [...shoppingCart, newProduct],
      }), () => {
        this.quantityTotalCart();
      });
    } else {
      const newCart = shoppingCart.map((item) => {
        if (item.id === newProduct.id) {
          item.cart_quantity += 1;
        }
        return (item);
      });
      this.setState({
        shoppingCart: newCart,
      }, () => {
        this.quantityTotalCart();
      });
    }
  }

  decreaseProductFromCart(id) {
    const { shoppingCart } = this.state;
    const newCart = shoppingCart.map((item) => {
      if (item.id === id && item.cart_quantity > 0) {
        item.cart_quantity -= 1;
      }
      return (item);
    });
    this.setState({
      shoppingCart: newCart,
    }, () => {
      this.quantityTotalCart();
    });
  }

  deleteProductFromCart(id) {
    const { shoppingCart } = this.state;
    const newCart = [];
    shoppingCart.forEach((item) => {
      if (item.id !== id) { newCart.push(item); }
    });
    this.setState({
      shoppingCart: newCart,
    }, () => {
      this.quantityTotalCart();
    });
  }

  quantityTotalCart() {
    const { shoppingCart } = this.state;
    const retorno = shoppingCart
      .reduce((acc, currentValue) => (acc + currentValue.cart_quantity), 0);
    console.log(retorno);
    this.setState({
      quantityTotalShoppingCart: retorno,
    });
    this.saveSession();
  }

  saveSession() {
    const { loadingCategories,
      categories,
      inputSearch,
      shoppingCart,
      quantityTotalShoppingCart,
      search,
      categoryFilter,
      categoryFilterOld,
      productComments } = this.state;
    const session = {
      loadingCategories,
      categories,
      inputSearch,
      shoppingCart,
      quantityTotalShoppingCart,
      search,
      categoryFilter,
      categoryFilterOld,
      productComments,
    };
    localStorage.setItem('shoppingCart', JSON.stringify(session));
  }

  render() {
    const {
      categories,
      loadingCategories,
      inputSearch,
      shoppingCart,
      quantityTotalShoppingCart,
      search,
      productComments } = this.state;

    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={
            () => (<MainPage
              categories={ categories }
              loadingCategories={ loadingCategories }
              handleChange={ this.handleChange }
              inputSearch={ inputSearch }
              searchRequest={ this.searchRequest }
              search={ search }
              shoppingCart={ shoppingCart }
              quantityTotalShoppingCart={ quantityTotalShoppingCart }
              addProductToCart={ this.addProductToCart }
            />)
          }
        />
        <Route
          path="/cart"
          render={ () => (<ShoppingCart
            shoppingCart={ shoppingCart }
            quantityTotalShoppingCart={ quantityTotalShoppingCart }
            decreaseProductFromCart={ this.decreaseProductFromCart }
            addProductToCart={ this.addProductToCart }
            deleteProductFromCart={ this.deleteProductFromCart }
          />) }
        />
        <Route
          path="/checkout"
          render={ () => (<Checkout
            shoppingCart={ shoppingCart }
            clearCart={ this.clearCart }
          />) }
        />
        <Route
          exact
          path="/productDetails/:id"
          render={ (props) => {
            if (props) {
              return (
                <ProductDetails
                  { ...props }
                  inputSearch={ inputSearch }
                  search={ search }
                  setProductComments={ this.setProductComments }
                  productComments={ productComments }
                  shoppingCart={ shoppingCart }
                  quantityTotalShoppingCart={ quantityTotalShoppingCart }
                  addProductToCart={ this.addProductToCart }
                />
              );
            }
          } }
        />
      </BrowserRouter>
    );
  }
}
