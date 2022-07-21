import { useState, useMemo } from 'react';
import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from './redux';

export default function App() {
  const [count, setCount] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const { data = [], isError, isLoading } = useGetGoodsQuery(count); //count-для выбора кол-ва на стр(limit)
  const [addProduct, { isError: addError }] = useAddProductMutation();
  //addProduct -это функция-mutation из goodsApi, также есть isLoading: addLoading, data: addedProduct
  const [deleteProduct] = useDeleteProductMutation();
  //deleteProduct -это функция-mutation из goodsApi

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct('');
      //unwrap() в дальнейшем обеспеч. корректную работу пропов isError, isLoading, data
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap();
  };

  const all = useMemo(() => data?.length.toString(), [isLoading]); //для сохранения значения длины массива products

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option key="0" value={all}>
            {/* или value="", чтобы не было лимита */}
            All
          </option>
          <option key="1" value="1">
            1
          </option>
          <option key="2" value="2">
            2
          </option>
          <option key="3" value="3">
            3
          </option>
        </select>
      </div>
      <ul>
        {data?.map((item) => (
          <>
            <li key={item.id}>{item.name}</li>
            <button onClick={() => handleDeleteProduct(item.id)}>Delete</button>
          </>
        ))}
      </ul>
    </div>
  );
}
