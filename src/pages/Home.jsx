import axios from "axios";
import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Card, Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const productsList = useSelector((state) => state.products);
  const [productsFiltered, setProductsFiltered] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setProductsFiltered(productsList);
  }, [productsList]);

  // console.log(categories)
  const filterCategory = (categoryId) => {
    const filtered = productsList.filter(
      (product) => product.category.id === categoryId
    );
    setProductsFiltered(filtered);
  };

  const searchProducts = () => {
    const filtered = productsList.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductsFiltered(filtered);
  };

  return (
    <Row style={{margin: '3%'}}>
      <Col lg={3}>
        <ListGroup style={{'marginBottom': '3%'}}>
          {categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => filterCategory(category.id)}
              style={{ cursor: "pointer" }}
            >
              {category.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search your products"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button className="btn-go"
            onClick={searchProducts}
            variant="outline-secondary"
            id="button-addon2"
          >
            go
          </button>
        </InputGroup>
        <Row xs={1} md={2} xl={3}className="g-4">
          {productsFiltered.map((product) => (
            <Col key={product.id}>
              
              <Card onClick={() => navigate(`./products/${product.id}`)} >
                <div className="divCard">
                  <div>
                    <img className="imgCard"
                      src={product.productImgs?.[0]}
                    />
                  </div>
                </div>
                  
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>Precio USD {product.price}</Card.Text>
                  <button className='addProduct'><i class="fa-solid fa-cart-plus"></i></button>
                </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
