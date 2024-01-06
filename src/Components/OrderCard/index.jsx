import {
  ChevronRightIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid';

const OrderCard = (props) => {
  const { totalPrice, totalProducts, date } = props;

  return (
    <div className="flex mb-3 border border-black rounded-lg shadow-md p-4">
      <div className="flex flex-col mr-10">
        <p className="flex items-center gap-2">
          <CalendarDaysIcon className="h-6 w-6 text-black cursor-pointer" />
          <span className="font-light">{date}</span>
        </p>
        <p className="flex items-center gap-2">
          <ShoppingBagIcon className="h-6 w-6 text-black cursor-pointer" />
          <span className="font-light">
            {totalProducts} article{totalProducts > 1 ? 's' : ''}
          </span>
        </p>
      </div>
      <p className="flex items-center gap-2">
        <span className="font-medium text-2xl">${totalPrice.toFixed(2)}</span>
        <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
      </p>
    </div>
  );
};

export default OrderCard;
