import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import * as api from './services/api';
import './App.css';
import ShoppingCart from './Pages/ShoppingCart';
import ProductDetails from './Pages/ProductDetails';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loadingCategories: true,
      categories: [],
      inputSearch: '',
      shoppingCart: [],
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
  }

  componentDidMount() {
    api.getCategories()
      .then(
        (result) => this.setState({
          loadingCategories: false,
          categories: result,
        }),
      );
  }

  componentDidUpdate() {
    const { categoryFilter, categoryFilterOld } = this.state;
    if (categoryFilter !== categoryFilterOld) {
      this.searchRequest();
      this.refleshCategoryFilterState();
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  setProductComments(comment) {
    this.setState(({ productComments }) => ({
      productComments: [...productComments, comment] }));
  }

  searchRequest() {
    const { inputSearch, categoryFilter } = this.state;
    api.getProductsFromCategoryAndQuery(categoryFilter, inputSearch)
      .then((apiSearch) => {
        this.setState({
          search: apiSearch.results,
        });
      });
  }

  refleshCategoryFilterState() {
    const { categoryFilter } = this.state;
    this.setState({
      categoryFilterOld: categoryFilter,
    });
  }

  addProductToCart(product) {
    const { id, title, price } = product;
    const newProduct = {
      id,
      title,
      price,
      cart_quantity: 1,
    };
    // verificar se existe o ítem no carrinho
    const { shoppingCart } = this.state;
    const currentItem = shoppingCart.filter((item) => item.id === newProduct.id);
    // sim: acrescentar 1 na quantidade
    if (currentItem.length === 0) {
      this.setState(() => ({
        shoppingCart: [...shoppingCart, newProduct],
      }));
    } else {
      const newCart = shoppingCart.map((item) => {
        if (item.id === newProduct.id) {
          item.cart_quantity += 1;
        }
        return (item);
      });
      this.setState({
        shoppingCart: newCart,
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
    });
  }

  deleteProductFromCart(id) {
    const { shoppingCart } = this.state;
    const newCart = [];
    shoppingCart.forEach((item) => {
      if (item.id !== id) {
        newCart.push(item);
      }
    });
    this.setState({
      shoppingCart: newCart,
    });
  }

  render() {
    const {
      categories,
      loadingCategories,
      inputSearch,
      shoppingCart,
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
              addProductToCart={ this.addProductToCart }
            />)
          }
        />

        <Route
          path="/cart"
          render={ () => (<ShoppingCart
            shoppingCart={ shoppingCart }
            decreaseProductFromCart={ this.decreaseProductFromCart }
            addProductToCart={ this.addProductToCart }
            deleteProductFromCart={ this.deleteProductFromCart }
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
