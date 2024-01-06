import { useContext } from 'react';
import { ShoppingCartContext } from '../Context';

export const useShoppingCart = () => {
  const {
    count,
    setCount,
    isProductDetailOpen,
    toggleProductDetail,
    setProductToShow,
    isCheckoutSideMenuOpen,
    toggleCheckoutSideMenu,
    cartProducts,
    setCartProducts,
  } = useContext(ShoppingCartContext);

  const addProductToCart = (product) => {
    const productExists = cartProducts.some((el) => el.id === product.id);
    if (productExists) {
      const productCart = cartProducts.find((el) => el.id === product.id);
      productCart.quantity++;
      productCart.price = product.price;
      productCart.totalPrice += product.price;
    } else {
      if (!product || !product?.price) return;
      setCartProducts([
        ...cartProducts,
        { ...product, totalPrice: product.price, quantity: 1 },
      ]);
    }
    setCount(count + 1);
    isProductDetailOpen && toggleProductDetail();
    !isCheckoutSideMenuOpen && toggleCheckoutSideMenu();
  };

  const showProductDetail = (productDetail) => {
    !isProductDetailOpen && toggleProductDetail();
    isCheckoutSideMenuOpen && toggleCheckoutSideMenu();
    setProductToShow(productDetail);
  };

  const getCartProductsTotalPrice = (cartProducts) => cartProducts.reduce((total, prod) => total + prod.totalPrice, 0);
  const getOrderTotalQuantity = (orderProducts) => orderProducts.reduce((total, prod) => total + prod.quantity, 0);
  const getOrderTotalPrice = (orderProducts) => orderProducts.reduce((total, prod) => total + prod.totalPrice, 0);

  return {
    addProductToCart,
    showProductDetail,
    getOrderTotalPrice,
    getOrderTotalQuantity,
    getCartProductsTotalPrice,
  };
};
