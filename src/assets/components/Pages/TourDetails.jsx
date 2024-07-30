import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tourdetails.css";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  FormGroup,
  List,
} from "reactstrap";
import { useParams } from "react-router-dom";
import Booking from "../Booking/Booking";
import calculateAvgRating from "../../../utils/avgRating";
import avatar from "../images/avatar.jpg";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../../utils/config";
import { AuthContext } from "../../../context/context";
import axios from "axios";

const TourDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const reviewsMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  // this is an static data later we will call our api
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  //destructure properties from tour object
  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  //format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewsMsgRef.current.value;

    try {
      if (!user || user === null || user === undefined) {
        alert("Please login to leave a review");
        return;
      }


      const reviewObj = {
        username: user?.data?.username,
        review: reviewText,
        rating: tourRating,
      };
      const response = await axios.post(
        `${BASE_URL}/tours/reviews/${id}`,
        reviewObj
      );

      if (response.data.success) {
        alert("Review submitted successfully");
        setTourRating(null);
        reviewsMsgRef.current.value = "";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading....</h4>}
          {error && <h4 className="text-center">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour_content">
                  <img src={photo} alt="" />
                  <div className="tour_info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-3">
                      <span className="tour_rating align-items-center gap-1 ">
                        <i
                          className="ri-star-5-fill"
                          style={{ color: "var (--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i>
                        {address}
                      </span>
                    </div>
                    <div className="tour_extra-details d-flex flex-wrap">
                      <span>
                        <i className="ri-map-pin-2-line"></i>
                        {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>${price}{" "}
                        /pre person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i>
                        {distance} k/m
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize}
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* =========== tour reviews section ================= */}

                  <div className="tour_reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={handleSubmitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating_group p-2">
                        <span onClick={() => setTourRating(1)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review_input">
                        <input
                          type="text"
                          ref={reviewsMsgRef}
                          placeholder="share your thoughts"
                          required
                        />
                        <button className="btn primary_btn ">
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user_reviews">
                      {reviews?.map((review, index) => {
                        return (
                          <div className="review_item" key={index}>
                            <img src={avatar} alt="" />

                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5>{review.username}</h5>
                                  <p>
                                    {new Date("01-18-2023").toLocaleDateString(
                                      "en-US",
                                      options
                                    )}
                                  </p>
                                </div>
                                <span className="d-flex align-items-center">
                                  {review.rating}
                                  <i className="ri-star-s-fill"></i>
                                </span>
                              </div>
                              <h6>{review.reviewText}</h6>
                            </div>
                          </div>
                        );
                      })}
                    </ListGroup>
                  </div>
                  {/* =========== tour reviews section end================= */}
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
