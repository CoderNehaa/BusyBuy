import React from 'react'
import { UserCustomHook } from './context/UserContext'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
  const { user, addToCart } = UserCustomHook();
  const navigate = useNavigate();

  function handleCartBtn(product){
    if(user === null){
      navigate('/signin');
    } else {
      addToCart(product);
    }
  }

  return (
    <div className="w-72 m-4 flex flex-col flex-wrap content-center shadow-lg p-6 font-bold text-xl border-2 border-slate-200 dark:border-slate-800 dark:shadow-inner dark:shadow-slate-800">
      <img src={product.image} className="h-72 w-60 p-2" alt={product.title}/>
      <h1 className="h-14 overflow-hidden text-center">{product.title}</h1>
      <h2 className='text-center'>
      $ {product.price}
       </h2>
      <button className='bg-blue-500 py-2 mt-4 dark:text-white' onClick={() => handleCartBtn(product)} > Add to Cart </button>
    </div>
  )
}

export default ProductCard;
