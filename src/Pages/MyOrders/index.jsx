import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../../Components/OrderCard';

const MyOrders = () => {
  const { orders } = useContext(ShoppingCartContext);

  return (
    <>
      <div className="flex items-center justify-center relative w-80">
        <h1>My Orders</h1>
      </div>
      {orders?.map(({ id, totalPrice, totalProducts }) => (
        <Link key={id} to={`/my-orders/${id}`}>
          <OrderCard id={id} totalPrice={totalPrice} totalProducts={totalProducts} />
        </Link>
      ))}
    </>
  );
};

export default MyOrders;
