import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import ProductCard from '../../Components/ProductCard';
import { ShoppingCartContext } from '../../Context';
import { useShoppingCart } from '../../hooks/ShoppingCartHook';

const MyOrder = () => {
  const { orders } = useContext(ShoppingCartContext);
  const { getOrderTotalQuantity, getOrderTotalPrice } = useShoppingCart();
  const currentPath = window.location.pathname;
  let uuid = currentPath.split('/').pop();

  let orderToShow;
  if (uuid === 'last') {
    orderToShow = orders?.reduce((latest, order) =>
      order.date > (latest?.date || '0') ? order : latest,
    );
  } else {
    orderToShow = orders?.find((order) => order.id === uuid);
  }

  const orderProducts = orderToShow?.products || [];

  return (
    <>
      <div className="flex items-center justify-center relative w-80 mb-6">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronDoubleLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        <h1>My {uuid === 'last' ? 'Last' : 'Specific'} Order</h1>
      </div>
      <div className="flex flex-col w-180">
        {orderProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            title={prod.title}
            imageUrl={prod.image}
            price={prod.price}
            totalPrice={prod.totalPrice}
            quantity={prod.quantity}
            isCheckoutSideMenu={false}
          />
        ))}
      </div>
      <div>
        <p>Items: {getOrderTotalQuantity(orderProducts)}</p>
        <p>Articles: {orderProducts.length}</p>
        <p>Total Price: ${getOrderTotalPrice(orderProducts).toFixed(2)}</p>
      </div>
    </>
  );
};

export default MyOrder;
