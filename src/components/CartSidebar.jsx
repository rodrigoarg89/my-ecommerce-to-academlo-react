import React, { useEffect } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk } from '../store/slices/cart.slice';
import { purchaseCartThunk } from '../store/slices/purchases.slice';

const CartSidebar = ({show, handleClose}) => {

    const dispatch = useDispatch();

    const cartUser = useSelector(state => state.cart)
  
   console.log(cartUser)
  
    useEffect(() => {
      dispatch(getCartThunk())
    }, [])

    const Total = cartUser.map(cart => {
      return cart.productsInCart.quantity*Number(cart.price)
    })

    const totalToBuy = Total.reduce((a, b) => a + b, 0)

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
                <p className='choice'>{ (cartUser[0]?.productsInCart) ? 'Good choice!' :'Choose a product!' }</p>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ListGroup>
                  {cartUser.map(cart => (
                    <ListGroup.Item key={cart.id}>
                      <Link to={`/products/${cart.id}`}>
                        <div className='cart-details'>
                          <div>                        
                            {cart.title}
                            <p> U$D {cart.price}</p></div>
                          <div>
                            Units<br /> 
                            {cart.productsInCart.quantity} 
                          </div>
                        </div>
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className='total-buy'>
                  TOTAL - U$D 
                   <span> {totalToBuy}</span>
                </div>
              </Offcanvas.Body>
              <Button onClick={() => dispatch(purchaseCartThunk())}>CHECKOUT</Button>
        </Offcanvas>
    );
};

export default CartSidebar;