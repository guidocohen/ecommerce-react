import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import ProductCard from '../ProductCard';
import './styles.css';

const CheckoutSideMenu = () => {
  const navigate = useNavigate();

  const {
    isCheckoutSideMenuOpen,
    toggleCheckoutSideMenu,
    cartProducts,
    setCount,
    setCartProducts,
    orders,
    setOrders,
  } = useContext(ShoppingCartContext);

  const calcTotalPrice = (products) =>
    products.reduce((sum, product) => sum + product.totalPrice, 0);

  const handleCheckout = () => {
    const date = new Date();

    const totalPrice = calcTotalPrice(cartProducts);
    if (totalPrice <= 0) return; // TODO: cartel para que agregue productos
    const products = cartProducts.filter((prod) => prod.quantity > 0);

    const orderToAdd = {
      id: crypto.randomUUID(), // TODO: DB autogen id
      date: date.toLocaleString(),
      products: products,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice,
    };

    const newOrders = [...(orders || []), orderToAdd];
    setOrders(newOrders);
    setCartProducts([]);
    setCount(0);
    toggleCheckoutSideMenu();
    navigate('/my-orders/last');
  };

  return (
    <aside
      className={`${isCheckoutSideMenuOpen ? 'flex' : 'hidden'}
      flex-col fixed right-0 border bg-white border-black rounded-lg w-[230px] h-[calc(100vh-80px)] lg:w-[360px]`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <button>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => toggleCheckoutSideMenu()}
          ></XMarkIcon>
        </button>
      </div>
      <div className="overflow-y-scroll scrollable-cards px-6 flex-1">
        {cartProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            title={prod.title}
            imageUrl={prod.image}
            price={prod.price}
            totalPrice={prod.totalPrice}
            quantity={prod.quantity}
            isCheckoutSideMenu={true}
          />
        ))}
      </div>
      {cartProducts.length > 0 ? (
        <div className="px-6 mb-6">
          <p className="flex justify-between items-center mb-2">
            <span className="font-light">Total:</span>
            <span className="font-medium text-2xl">
              ${calcTotalPrice(cartProducts).toFixed(2)}
            </span>
          </p>
          <button
            className="bg-black py-3 text-white w-full rounded-lg"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full px-6">
          <p className="text-gray-500">
            Tu carrito está vacío, ¡Agrega productos para generar tu orden!
          </p>
        </div>
      )}
    </aside>
  );
};

export default CheckoutSideMenu;
