import { useContext } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const ProductCard = (props) => {
  const { id, title, imageUrl, price, totalPrice, quantity, isCheckoutSideMenu } = props;
  const { count, setCount, cartProducts, setCartProducts } =
    useContext(ShoppingCartContext);

  const incrementQuantity = () => {
    const productCart = cartProducts.find((el) => el.id === id);
    productCart.quantity++;
    productCart.totalPrice += price;
    setCartProducts([...cartProducts]);
    setCount(count + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const productCart = cartProducts.find((el) => el.id === id);
      productCart.quantity--;
      productCart.totalPrice -= price;
      setCartProducts([...cartProducts]);
      setCount(count - 1);
    }
  };

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter((product) => product.id != id);
    setCartProducts(filteredProducts);
    setCount(count - quantity);
  };

  return (
    <div className="flex items-center mb-2">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20 mr-2">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={imageUrl}
            alt={title}
          />
        </figure>
      </div>
      <div className="flex justify-between items-center gap-2">
        <span className="flex text-sm font-light overflow-ellipsis text-left">
          {title}
        </span>
        {isCheckoutSideMenu && (
          <div className="flex items-center">
            <button
              onClick={decrementQuantity}
              className="h-6 w-6 text-black cursor-pointer"
            >
              -
            </button>
            <p className="text-lg font-medium mx-2">{quantity}</p>
            <button
              onClick={incrementQuantity}
              className="h-6 w-6 text-black cursor-pointer"
            >
              +
            </button>
          </div>
        )}
        <p className="flex text-lg font-medium ml-3">${totalPrice?.toFixed(2)}</p>
        {isCheckoutSideMenu && (
          <TrashIcon
            onClick={() => handleDelete(id)}
            className="h-6 w-6 text-black cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
