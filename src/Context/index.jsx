import { createContext, useEffect, useState } from 'react';
import { apiUrl } from '../api';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const [productToShow, setProductToShow] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [orders, setOrders] = useState();
  const [items, setItems] = useState();
  const [filteredItems, setFilteredItems] = useState();
  const [searchByTitle, setSearchByTitle] = useState('');
  const [searchByCategory, setSearchByCategory] = useState('');

  useEffect(() => {
    let isComponentMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        const data = await response.json();
        if (isComponentMounted) setItems(data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };

    fetchData();

    return () => {
      isComponentMounted = false; // Cleanup to avoid state updates on unmounted component
    };
  }, []);

  useEffect(() => {
    setFilteredItems(() => {
      return items?.filter(
        (item) =>
          (!searchByCategory ||
            item.category.toLowerCase() === searchByCategory.toLowerCase()) &&
          (!searchByTitle ||
            item.title.toLowerCase().includes(searchByTitle.toLowerCase().trim())),
      );
    });
  }, [items, searchByTitle, searchByCategory]);

  useEffect(() => {
    setSearchByTitle('');
  }, [searchByCategory  ]);
  
  const contextValues = {
    count,
    setCount,
    toggleProductDetail: () => setIsProductDetailOpen(!isProductDetailOpen),
    isProductDetailOpen,
    productToShow,
    setProductToShow,
    cartProducts,
    setCartProducts,
    isCheckoutSideMenuOpen,
    toggleCheckoutSideMenu: () => setIsCheckoutSideMenuOpen(!isCheckoutSideMenuOpen),
    orders,
    setOrders,
    items,
    setItems,
    searchByTitle,
    setSearchByTitle,
    filteredItems,
    searchByCategory,
    setSearchByCategory,
  };

  return (
    <ShoppingCartContext.Provider value={contextValues}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
