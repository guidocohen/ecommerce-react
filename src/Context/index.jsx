import { createContext, useState } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // Shopping Cart . Increment quantity
  const [count, setCount] = useState(0);

  // Product Detail . Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const toggleProductDetail = () => setIsProductDetailOpen(!isProductDetailOpen);

  // Product Detail . Show product
  const [productToShow, setProductToShow] = useState({});

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        toggleProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
