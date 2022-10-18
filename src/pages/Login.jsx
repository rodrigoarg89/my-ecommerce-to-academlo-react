import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();
    
    const submit = (data) => {
      //  console.log(data)
       axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
             .then(res => {
                localStorage.setItem('token', res.data.data.token);
                navigate("/");
                console.log(res.data.data.token)
             })
             .catch(error => {
                if(error.response?.status === 401) {
                  alert('invalid credentials')
                }
                 console.log(error)
             })
    }

  return (
    <div >
        <h1>Welcome!!! Enter your email and password to continue!</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3 form-login" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control {...register('email')} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3 form-login" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register('password')} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form><br />
      To prove e-commerce funtionality, please enter email <br />   rodrigoargaraz89@gmail.com <br /> and password <br /> pass1234
    </div>
  );
};

export default Login;
