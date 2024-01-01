import { useContext } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const isImage = (url) => {
  const extensionesImagen = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  const extension = url.split('.').pop().toLowerCase();
  return extensionesImagen.includes(extension);
};

export const Card = ({ product }) => {
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

  const addProductsToCart = (event, product) => {
    event.stopPropagation();

    !isCheckoutSideMenuOpen && toggleCheckoutSideMenu();
    isProductDetailOpen && toggleProductDetail();

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
  };

  const showProduct = (productDetail) => {
    !isProductDetailOpen && toggleProductDetail();
    isCheckoutSideMenuOpen && toggleCheckoutSideMenu();
    setProductToShow(productDetail);
  };

  return (
    <div
      className="bg-gray-100 cursor-pointer w-56 h-60 rounded-b-lg shadow-md mb-4"
      onClick={() => showProduct(product)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/80 rounded-md text-black text-xs m-2 px-2 py-0.5">
          {product?.category}
        </span>
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={
            product && product.image && isImage(product.image)
              ? product.image
              : 'https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg'
          }
        />

        <button
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 font-bold"
          onClick={(e) => addProductsToCart(e, product)}
        >
          <PlusIcon className="h-6 w-6 text-black" />
        </button>
      </figure>
      <p className="flex justify-between px-2">
        <span className="text-md font-light truncate pt-0.5">{product?.title}</span>
        <span className="text-lg font-medium">${product?.price?.toFixed(2)}</span>
      </p>
    </div>
  );
};
