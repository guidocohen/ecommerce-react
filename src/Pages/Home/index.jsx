import { Card } from '../../Components/Card';
import { useState, useEffect } from 'react';
import { apiUrl } from '../../api'
import ProductDetail from '../../Components/ProductDetail';

export const Home = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`)
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error(`Oh no, ocurrió un error: ${error}`);
      }
    }
    fetchData()
  }, []);

  return (
    <>
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {items?.map((item) => (
          <Card key={item.id} data={item} />
        ))}
        <Card />
      </div>
      <ProductDetail />
    </>
  );
};
