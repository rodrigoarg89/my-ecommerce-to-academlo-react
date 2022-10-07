import React, { useEffect } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk } from '../store/slices/cart.slice';
import { purchaseCartThunk } from '../store/slices/purchases.slice';

const CartSidebar = ({show, handleClose}) => {

    const dispatch = useDispatch();

    const cartUser = useSelector(state => state.cart)
  
  //  /* console.log(cartUser)*/
  
    useEffect(() => {
      dispatch(getCartThunk())
    }, [])
  

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
                <p>{ (cartUser) ? 'Good choice!' :'Choose a product!' }</p>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ListGroup>
                  {cartUser.map(cart => (
                    <ListGroup.Item key={cart.id}>
                      <Link to={`/products/${cart.id}`}>
                        {cart.title}
                        <p> U$D {cart.price}</p>
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Offcanvas.Body>
              <Button onClick={() => dispatch(purchaseCartThunk())}>CHECKOUT</Button>
        </Offcanvas>
    );
};

export default CartSidebar;