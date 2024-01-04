const OrderCard = (props) => {
  const { id, totalPrice, totalProducts } = props;

  return (
    <div className="flex justify-between items-center mb-3 border border-black">
      <p>
        <span>{id}</span>
        <span>{totalProducts}</span>
        <span>{totalPrice}</span>
      </p>
    </div>
  );
};

export default OrderCard;
