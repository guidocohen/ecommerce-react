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

  return {
    count,
    addProductToCart,
    showProductDetail,
  };
};