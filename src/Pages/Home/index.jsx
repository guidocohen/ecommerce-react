import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../Components/Card';
import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from '../../Context';

export const Home = () => {
  const { searchByTitle, setSearchByTitle, filteredItems, setSearchByCategory } =
    useContext(ShoppingCartContext);

  const { category } = useParams();

  useEffect(() => {
    setSearchByCategory(category || '');
  }, [category, setSearchByCategory]);

  const renderView = () => {
    if (!filteredItems) return <p>Loading...</p>;
    if (filteredItems.length > 0) {
      return filteredItems.map((item) => <Card key={item.id} product={item} />);
    } else {
      return <p>No Results Found</p>;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <input
        type="text"
        value={searchByTitle}
        placeholder="Search a product"
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => setSearchByTitle(event.target.value)}
      />
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">{renderView()}</div>
      <ProductDetail />
    </>
  );
};
