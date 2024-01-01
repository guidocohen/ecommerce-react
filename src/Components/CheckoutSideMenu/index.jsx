import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../OrderCard';
import './styles.css';

const CheckoutSideMenu = () => {
  const { isCheckoutSideMenuOpen, toggleCheckoutSideMenu, cartProducts } =
    useContext(ShoppingCartContext);

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
      <div className="overflow-y-scroll scrollable-cards px-6">
        {cartProducts.map((prod) => (
          <OrderCard
            key={prod.id}
            id={prod.id}
            title={prod.title}
            imageUrl={prod.image}
            price={prod.price}
            totalPrice={prod.totalPrice}
            quantity={prod.quantity || 0}
          />
        ))}
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
