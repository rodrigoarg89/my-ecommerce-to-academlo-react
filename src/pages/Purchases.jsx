import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

  const dispatch = useDispatch();
  const options = { weeday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

  const purchases = useSelector(state => state.purchases)


  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])



  return (

    <div>
      <h1>My Purchases</h1>
      {purchases.map(purchase => {
        const date = new Date(purchase.createdAt)
        // console.log(date.toLocaleDateString(undefined, options))
        return (
          <div className='purchase' key={purchase.cartId}>
            <div>
              {(date.toLocaleDateString(undefined, options))}
            </div>
            {purchase.cart.products.map(product => (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  {product.title} {product.price}
                  </Link>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  );
};

export default Purchases