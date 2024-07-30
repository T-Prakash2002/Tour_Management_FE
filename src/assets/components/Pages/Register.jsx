import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { AuthContext } from "../../../context/context";
import { BASE_URL } from "../../../utils/config";
import axios from "axios";

import registerImg from "../images/register.png";
import userIcon from "../images/user.png";

const Register = () => {

  const [credientials, setCredientials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredientials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch(`${BASE_URL}/auth/register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(credientials),
      // });

      const apiRes = await axios.post(
        `${BASE_URL}/auth/register`,
        credientials
      );

      if (apiRes.data.success) {
        alert("User created successfully");
        
        dispatch({
          type: "REGISTER_SUCCESS",
        });

        navigate("/login");
      } else if (apiRes.data.message === "failed to created") {
        alert("User creation failed");
      } else if (apiRes.data.message === "user already exists") {
        alert("User already exists");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert(error.data.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn">
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account?
                  <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
