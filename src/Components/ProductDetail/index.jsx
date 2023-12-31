import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const ProductDetail = () => {
  const { isProductDetailOpen, toggleProductDetail, productToShow } =
    useContext(ShoppingCartContext);

  return (
    <aside
      className={`${isProductDetailOpen ? 'flex' : 'hidden'}
      flex-col fixed right-0 border bg-white border-black rounded-lg w-[230px] h-[calc(100vh-80px)] lg:w-[360px]`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <button>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => toggleProductDetail()}
          ></XMarkIcon>
        </button >
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg"
          src={productToShow.image}
          alt={productToShow.title}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-medium text-2xl mb-2">${productToShow.price}</span>
        <span className="font-medium text-md">${productToShow.title}</span>
        <span className="font-light text-sm">${productToShow.description}</span>
      </p>
    </aside>
  );
};

export default ProductDetail;
