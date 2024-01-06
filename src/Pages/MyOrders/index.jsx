import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../../Components/OrderCard';

const MyOrders = () => {
  const { orders } = useContext(ShoppingCartContext);

  return (
    <>
      <div className="flex items-center justify-center relative">
        <h1 className="font-medium text-xl mb-4">My Orders</h1>
      </div>
      <div className="flex items-center justify-center container">
        <div className="grid grid-cols-1">
          <div className="flex flex-col items-center">
            {orders?.map(({ id, totalPrice, totalProducts, date }) => (
              <Link key={id} to={`/my-orders/${id}`}>
                <OrderCard
                  totalPrice={totalPrice}
                  totalProducts={totalProducts}
                  date={date}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
