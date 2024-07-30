import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../styles/thankyou.css";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank_you">
              
                <span>
                  <i className="ri-checkbox-circle-line"></i>
                </span>
                <h1 className="mb-3 fw-semibold">Thank you</h1>
                <h3>
                  Your tour is scheduled successfully.
                </h3>
                <Button className="btn primary__btn w-25">
                  <Link to="/">Go to Home</Link>
                </Button>
              
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;