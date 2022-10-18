import React, { useEffect } from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();
  const options = {
    weeday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  let counter = 0;

  return (
    <div>
      <h1>My Purchases</h1>
      {purchases.map((purchase) => {
        const date = new Date(purchase.createdAt);
        return (
          <ListGroup className='list-purchase' as="ol" numbered key={purchase.cartId}>
            <ListGroup.Item 
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {date.toLocaleDateString(undefined, options)}
                </div>
                {purchase.cart.products.map((product) => (
                  <div key={product.id} >
                    <Link to={`/products/${product.id}`} className='purchase-item'>
                      <div className="purchase-title">{product.title} </div>
                      <div>{product.price}</div>
                    </Link><br/>
                  </div>
                ))}
              </div>
              <Badge bg="primary" className='color-price' pill>
                {purchase.cart.products.length}
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        );
      })}
    </div>
  );
};

export default Purchases;
