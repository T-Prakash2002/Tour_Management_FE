import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import Subtitle from "../shared/Subtitle";

import SearchBar from "../shared/SearchBar";
import FeaturedTourList from "../Featured-tour/FeaturedTourList";
import MasontryImagesGallery from "../Image-gallery/MasontryImagesGallery";
const Home = () => {
  return (
    <>
      {/*==============hero section start=========*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" align="center" className="mt-5">
              <SearchBar />
            </Col>
          </Row>
        </Container>
      </section>
      {/*==============hero section End=========*/}

      {/*============== FEATURE OF TOUR=========*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="section__subtitle">
                <Subtitle subtitle={"Explore"} />
              </div>
              <h2 className="featured_tour-title">Our featured tours</h2>
            </Col>

            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/*============== End=========*/}

      {/*============== gallary section start=========*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="section__subtitle">
                <Subtitle subtitle={"Gallery"} />
              </div>

              <h2 className="gallery_title">
                Visit our customers tour gallary
              </h2>
            </Col>
            <Col lg="12">
              <MasontryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/*============== End=========*/}
    </>
  );
};

export default Home;
