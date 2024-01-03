import { useContext } from 'react';
import OrderCard from '../../Components/OrderCard';
import { ShoppingCartContext } from '../../Context';

function MyOrder() {
  const { orders } = useContext(ShoppingCartContext);
  const latestOrderProducts = orders?.at(-1)?.products || [];
  // TODO: agregar total y cantidad de productos e items.
  
  return (
    <>
      My Last Order
      <div className="flex flex-col w-180">
        {latestOrderProducts.map((prod) => (
          <OrderCard
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
    </>
  );
}

export default MyOrder;
