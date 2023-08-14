import React from 'react'
import { UserCustomHook } from './context/UserContext'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
  const { user, addToCart, errorNotification } = UserCustomHook();
  const navigate = useNavigate();

  function handleCartBtn(product){
    if(user === null){
      // It means user is not logged in.
      navigate('/signin');
    } else {
      
    }
  }

  return (
    <div className="w-72 flex flex-col flex-wrap content-center shadow-lg p-6 font-bold text-xl">
      <img src={product.image} className="h-72 w-60 p-2" alt={product.title}/>
      <h1 className="">{product.title}</h1>
      <h2> {product.price} </h2>
      <button className='bg-blue-500 py-2 mt-4' onClick={() => handleCartBtn(product)} > Add to Cart </button>
    </div>
  )
}

export default ProductCard;
