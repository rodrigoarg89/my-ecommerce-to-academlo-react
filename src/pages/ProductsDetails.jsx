import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Carousel, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addPurchaseThunk } from "../store/slices/purchases.slice";
// import productsSlice from "../store/slices/products.slice";

const ProductsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.products);
  const [ quantity, setQuantity ] = useState(1);

  const productsDetail = productsList.find(
    (products) => products.id === Number(id)
  );

  const relatedProducts = productsList.filter(
    (products) => products.category.id === productsDetail?.category.id
  );

  const relatedProductsNoIdCurrent = relatedProducts.filter(
    (products) => products.description !== productsDetail.description
  );

  useEffect(() => {
    setQuantity(1)
  }, [id])

  const addPurchase = () => {
    const purchase = {
      id: id,
      quantity: quantity
    }
    dispatch(addPurchaseThunk(purchase))
  }


  return (
    <Row style={{margin: '3%'}}>
      <Col>
        <h1>{productsDetail?.title}</h1>
        <Carousel className="carousel">
          {
            productsDetail?.productImgs.map(img => (
              <Carousel.Item key={img}>
                <div className="div-img-details">
                  <div className='img-detail'>
                    <img 
                    className="d-block w-100"
                    src={img}
                    alt="First slide"
                    />
                  </div>
                </div>
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          }
        </Carousel>
        <div>
          <button className='me-3 addCart' onClick={() => setQuantity(quantity-1)} disabled={quantity === 0}>
            -
          </button>
          {quantity}
          <button className='ms-3 addCart' onClick={() => setQuantity(quantity+1)}>
            +
          </button><br />
          <button className="mt-2 addCart" onClick={addPurchase}>Add to purchases</button>

        </div>
        <div className="rate">
          <h2>{productsDetail?.category.name}</h2>
          <h2>USD {productsDetail?.price}</h2>      
          <h4 className="description">{productsDetail?.description}</h4>
        </div>
      </Col>
      <Col lg={3}>
        <ListGroup variant="flush" >
            {
               relatedProductsNoIdCurrent.map((product) => (
                <ListGroup.Item key={product.id}>
                    <div className="div-related">
                      <Link to={`/products/${product.id}`} >
                      <img src={product?.productImgs[0]} alt="" className="img-related" />
                        {product.title}
                      </Link> 
                    </div>
                </ListGroup.Item>
               ))
            }
        </ListGroup>
        <ul>

        </ul>
      </Col>
    </Row>
  );
};

export default ProductsDetails;
