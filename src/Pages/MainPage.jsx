import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '../Imgs/shopping-cart-solid.svg';
import CategoryList from '../Components/CategoryList';
import Loading from '../Components/Loading';
import ProductList from '../Components/ProductList';
//
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.printList = this.printList.bind(this);
  }

  printList(search) {
    const { addProductToCart, quantityTotalShoppingCart } = this.props;
    return search.map((product) => {
      if (search.length !== 0) {
        return (
          <div key={ `${product.id} ${product.title}` }>
            <ProductList
              id={ product.id }
              key={ product.id }
              produtos={ product }
              quantityTotalShoppingCart={ quantityTotalShoppingCart }
            />
            <button
              data-testid="product-add-to-cart"
              type="submit"
              onClick={ () => {
                addProductToCart(product);
              } }
            >
              Adicionar ao Carrinho
            </button>
          </div>
        );
      }
      return <p key="0">Nenhum produto foi encontrado</p>;
    });
  }

  render() {
    const {
      inputSearch,
      categories,
      loadingCategories,
      handleChange,
      searchRequest,
      search,
      quantityTotalShoppingCart } = this.props;

    const loadingElement = <Loading />;
    return (
      <div className="main">
        <div className="category-list">
          <h2 className="title-category-list">Categorias:</h2>
          {loadingCategories
            ? loadingElement
            : <CategoryList handleChange={ handleChange } categories={ categories } />}
        </div>
        <div className="search">
          <label htmlFor="input-search" data-testid="home-initial-message">
            <input
              data-testid="query-input"
              type="text"
              value={ inputSearch }
              name="inputSearch"
              id="input-search"
              onChange={ handleChange }
            />
            <button
              data-testid="query-button"
              type="submit"
              className="btn btn-default"
              onClick={ searchRequest }
            >
              Pesquisar
            </button>
            Digite algum termo de pesquisa ou escolha uma categoria.
          </label>
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <img className="cart-icon" alt="cart icon" src={ ShoppingCartIcon } />
            <span data-testid="shopping-cart-size">{ quantityTotalShoppingCart }</span>
          </Link>
          { search.length !== 0 ? this.printList(search) : <p> </p> }
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  inputSearch: PropTypes.string.isRequired,
  quantityTotalShoppingCart: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  search: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  // shoppingCart: PropTypes.arrayOf(
  //   PropTypes.object,
  // ).isRequired,
};

export default MainPage;
