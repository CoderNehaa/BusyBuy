import React, { useEffect } from 'react'
import { UserCustomHook } from './context/UserContext';
import { Link } from 'react-router-dom';

const Orders = () => {
  const {orders, getOrders} = UserCustomHook();
  
  useEffect(() => {
    getOrders();
  }, [])

  return (
    <div className='h-full text-center py-32 dark:bg-slate-900 dark:text-gray-400 min-h-screen'>
      {orders.length === 0 ? 
      <div className='text-4xl'> 
       <p> No order has been placed yet. </p>
        <Link to='/'>
            <button className='bg-red-500 dark:bg-slate-400 text-black text-lg px-5 py-2 m-8 font-mono dark:tracking-widest'> 
              Start shopping 
            </button> 
        </Link>
      </div> :
        <div>
          <h1 className='text-4xl'> Your orders </h1>
          {orders.map((order, index) => 
            <div key={index} className='flex flex-col flex-wrap justify-center content-center m-8'>
              <h2 className='text-2xl m-2'> Ordered on :- {order.orderDate} </h2>
                <table className='w-1/2 text-left tracking-wider text-black dark:text-gray-400'>
                  <thead className='text-base text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        <th scope="col" className="px-6 py-3"> Title </th>
                        <th scope="col" className="px-6 py-3"> Price </th>
                        <th scope="col" className="px-6 py-3"> Quantity </th>
                        <th scope="col" className="px-6 py-3"> Total Price </th>
                      </tr>
                    </thead>

                    <tbody>
                    {order.orderedProductDetails.map((product, index) => 
                      <tr key={index} className='bg-gray-200 dark:bg-gray-800 dark:border-gray-700 text-base'> 
                        <td className='px-6 py-4'> {product.title} </td>
                        <td className='px-6 py-4'> {(product.price).toFixed(2)} </td>
                        <td className='px-6 py-4'> {product.count} </td>
                        <td className='px-6 py-4'> {(product.count * product.price).toFixed(2)} </td> 
                      </tr>                      
                      )}
                    </tbody>
                    
                    <tfoot className='bg-gray-200 font-bold text-xl text-right border-2 border-gray-100 dark:bg-gray-800 dark:border-2 dark:border-gray-700'>
                      <tr>
                        <td colSpan='4' className='p-3 pr-12'>
                           ${(order.totalPrice).toFixed(2)} 
                        </td>
                      </tr>
                    </tfoot>
              </table>
            </div>

           )}
        </div>
      }
      
    </div>
  )
}

export default Orders;
