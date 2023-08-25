import React, { useEffect } from 'react';
import { UserCustomHook } from './context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartInfo ,getCartProducts, removeFromCart, increaseProduct, decreaseProduct, clearCart, purchase } = UserCustomHook();
  const navigate = useNavigate();
  const discount = (cartInfo.totalPrice*0.10).toFixed(0);
  const billingPrice = (cartInfo.totalPrice - discount).toFixed(0);

  useEffect(() => {
    getCartProducts();
  })
    
  function handlePurchase(){
    purchase();
    clearCart();
    navigate('/orders');
  }
  
  return (
    <div className={`h-full pt-32 tracking-wide dark:bg-slate-900 dark:text-gray-400 min-h-screen`}>
      {cartInfo.cartProducts.length === 0 ? 
      <div className='text-center text-4xl tracking-wider'> 
        <i className="fa-regular fa-face-frown-open"></i> 
        <p> Your cart is Empty ! </p>
        <Link to='/'>
          <button className='bg-red-500 dark:bg-slate-400 text-black text-lg px-5 py-2 m-8 font-mono dark:tracking-widest'> 
            ADD PRODUCTS 
          </button> 
        </Link>
        </div>  : 
      <div className='flex justify-evenly'>
        <div className='flex flex-col flex-wrap p-8'>  
          {cartInfo.cartProducts.map((product, index) =>  
            <div className="flex justify-start shadow-lg p-6 font-bold text-xl m-2 border-2 dark:border-slate-800" key={index}>
              <div> <img src={product.image} className="h-32 w-28 p-2 mx-4" alt={product.title}/> </div>
              
              <div className='ml-4 text-left w-full'>
                <h1> {product.title} </h1>
                <div className='p-2'> 
                  {/* <i className="fa-solid fa-indian-rupee-sign"></i> { (product.price * 83.21).toFixed(0) }  */}
                  ${(product.price)}
                </div>

                <div className='flex flex-wrap justify-between content-between'>
                    <div className='flex'>
                    <i className="fa-solid fa-circle-plus text-xl cursor-pointer" onClick={() => increaseProduct(product)}></i>
                      <span className='mx-2 text-xl'> {product.count} </span>
                      <i className="fa-solid fa-circle-minus text-xl cursor-pointer" onClick={() => decreaseProduct(product)} ></i>
                    </div>

                    <button className='bg-red-500 px-4 py-2 dark:bg-slate-400 dark:text-black' onClick={() => removeFromCart(product)}> Remove From Cart </button>
                </div>

              </div>
              
            </div>
          )}

        </div>
        <div className='flex flex-col shadow-lg w-1/3 p-8 dark:shadow-md dark:shadow-slate-800'>
        <h1 className='text-4xl p-4'> Price Details </h1> <hr />
        <div className='text-2xl p-6 flex flex-col flex-wrap tracking-wider'>
        <div className='flex justify-between'>
            <span> Total items : </span> 
            <span className='text-green-800'> {cartInfo.totalItems} </span>
          </div>

          <div className='flex justify-between'>
            <span> Total price : </span> 
            <span className='text-green-800'>
              {/* <i className="fa-solid fa-indian-rupee-sign text-xl"></i> {(cartInfo.totalPrice*83.21).toFixed(0)}  */}
              ${(cartInfo.totalPrice).toFixed(0)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span> Discount : </span> 
            <span className='text-green-800'>
              {/* <i className="fa-solid fa-indian-rupee-sign text-xl"></i> {(cartInfo.totalPrice*83.21*0.10).toFixed(0)}  */}
              ${discount}
            </span>
          </div>

          <div className='flex justify-between'>
            <span> Delievery charges : </span> 
            <span className='text-green-800'> Free </span>
          </div>

          <div className='flex justify-between'>
            <span> Billing price : </span> 
            <span className='text-green-800'>
              {/* <i className="fa-solid fa-indian-rupee-sign text-xl"></i> {(cartInfo.totalPrice*83.21*0.90).toFixed(0)}  */}
             ${billingPrice}
            </span>
          </div>

          <div className='flex justify-center'>
            <button className=' bg-yellow-700 px-4 py-2 text-slate-200 m-8' onClick={clearCart}> Clear Cart </button>
            <button className=' bg-orange-700 px-4 py-2 text-slate-200 m-8' onClick={handlePurchase}> Place Order </button>
          </div>
        </div>
      </div>
      </div>
        }
  </div>
  )
}

export default Cart;
