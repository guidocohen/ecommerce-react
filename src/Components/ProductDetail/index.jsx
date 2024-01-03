import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import './styles.css';
import { useShoppingCart } from '../../hooks/ShoppingCartHook';

const ProductDetail = () => {
  const { isProductDetailOpen, toggleProductDetail, productToShow } =
    useContext(ShoppingCartContext);

  const { addProductToCart } = useShoppingCart();

  return (
    <aside
      className={`${
        isProductDetailOpen ? 'flex' : 'hidden'
      } flex-col fixed right-0 border bg-white border-black rounded-lg w-[230px] h-[calc(100vh-80px)] lg:w-[360px]`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Product Detail</h2>
        <button onClick={() => toggleProductDetail()}>
          <XMarkIcon className="h-6 w-6 text-black cursor-pointer" />
        </button>
      </div>
      <figure className="relative w-full h-64 overflow-hidden rounded-t-lg mb-4">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={productToShow?.image}
          alt={productToShow?.title}
        />
      </figure>
      <div className="flex flex-col px-6 mb-4">
        <span className="font-medium text-2xl mb-2">
          ${productToShow?.price?.toFixed(2)}
        </span>
        <span className="font-medium text-md">{productToShow?.title}</span>
      </div>
      <div className="flex flex-col px-6 overflow-y-scroll scrollable-detail font-light text-sm mb-4">
        {productToShow?.description}
      </div>
      <div className="mt-auto mb-6 mx-6">
        <button
          onClick={() => addProductToCart(productToShow)}
          className="bg-black py-3 text-white rounded-lg w-full"
        >
          Add to Cart
        </button>
      </div>
    </aside>
  );
};

export default ProductDetail;
