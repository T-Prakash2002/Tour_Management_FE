import React, {useState,useContext}from 'react';
import { Container, Row, Col, Form, FormGroup, Button} from 'reactstrap';
import {Link,useNavigate} from 'react-router-dom';
import '../styles/login.css';
import { AuthContext } from '../../../context/context';
import { BASE_URL } from '../../../utils/config';
import axios from 'axios';


import loginImg from '../images/login.png';
import userIcon from '../images/user.png';


const Login = () => {

  const [credientials, setCredientials] = useState({
    email:undefined,
    password:undefined
});
const { dispatch } = useContext(AuthContext);
const navigate = useNavigate();

  const handleChange = (e) => {
    setCredientials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
};
 
const handleClick = async(e)=>{
  e.preventDefault();

  try{
    
    const response = await axios.post(`${BASE_URL}/auth/login`, credientials);

    if (response.data.success) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      alert("Login Successful");

      navigate(-1);
    }else{
      dispatch({ type: "LOGIN_FAILURE", payload: response.data });
    }


  }catch(error){
    // alert(error.message+" "+error.status);
    console.log(error);
  }
}


  return (
  <section>
    <Container>
      <Row>
        <Col lg='8'  className='m-auto '>
        <div className="login_container d-flex row justify-content-between">
          <div className='login_img col-12 col-sm-8'>
              <img src={loginImg} alt="" />
          </div>

          <div className="login_form col-12 col-sm-4 ">
            <div className="user">
              <img src={userIcon} alt="" />
            </div>
            <h2>Login</h2>

            <Form onSubmit={handleClick}>
              <FormGroup>
                <input 
                type="email" 
                placeholder='Email'
                id='email'
                onChange={handleChange}
                required
                 />
              </FormGroup>
              <FormGroup>
                <input 
                type="password" 
                placeholder='Password'
                id='password'
                onChange={handleChange}
                required
                />
              </FormGroup>
              <Button className='btn secondary__btn auth__btn'>Login</Button>
            </Form>
            <p>Don't have an account?
              <Link to='/register'>
              Create
              </Link>
            </p>
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default Login;
