import React, { useState,useContext } from "react";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import "./Booking.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";
import axios from "axios";
import { AuthContext } from "../../../context/context";



const Booking = ({ tour, avgRating }) => {
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

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [credientials, setCredientials] = useState({
        userId: "01",
        userEmail: "example@gmail.com",
        fullName: "",
        tourName:title,
        phone: "",
        guestSize: 1,
        bookAt: "",
    });


    const handleChange = (e) => {
        setCredientials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const serviceFee = 10;
    const totalAmount =Number(price) * Number(credientials.guestSize) + serviceFee;


    const handleClick = async (e) => {
        e.preventDefault();
        
        if (!user || user === null || user === undefined) {
            alert("Please login to book a tour");
            return;
        }

        const bookingObj = {
            userId: user?.data?._id,
            userEmail: user?.data?.email,
            fullName: credientials.fullName,
            phone: credientials.phone,
            tourName: title,
            guestSize: credientials.guestSize,
            bookAt: credientials.bookAt,
        }

        const response = await axios.post(`${BASE_URL}/booking`, bookingObj, {
            headers: {
                Authorization: `${user?.token}`,
            },
        });

        console.log(response.data);

        if (response.data.success) {
            alert("Booking Successful");
            navigate(`/thank-you`)
        } else {
            alert(response.data.message);
        }

        // navigate(`/thank-you`)
    };

    return (
        <div className="booking">
            <div className="booking_top d-flex align-items-center justify-content-between">
                <h3>
                    ${price}
                    <span>/per person</span>
                </h3>

                <span className="tour_rating align-items-center ">
                    <i className="ri-star-fill"></i>
                    {avgRating === 0 ? null : avgRating}({reviews?.length})
                </span>
            </div>
            {/* ======================= booking form =============================== */}
            <div className="booking_form">
                <h5>Information</h5>
                <Form className="booking_info-form" onSubmit={handleClick}>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder="Full Name"
                            id="fullName"
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="number"
                            placeholder="Phone"
                            id="phone"
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input
                            type="date"
                            placeholder=""
                            id="bookAt"
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder="Guest"
                            id="guestSize"
                            min={1}
                            max={maxGroupSize}
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Form>
            </div>
            {/* ======================= booking form end =============================== */}

            {/* ===============booking bottom================= */}

            <div className="booking_bottom">
                <ListGroup>
                    <ListGroupItem className="border-0  px-0">
                        <h5 className="d-flex align-items-center gap-1">
                            ${price} <i className="ri-close-line"></i> 1 person
                        </h5>
                        <span>$ {price}</span>
                    </ListGroupItem>
                </ListGroup>
                <ListGroup>
                    <ListGroupItem className="border-0  px-0">
                        <h5 className="d-flex align-items-center gap-1">Service Charge</h5>

                        <span>{serviceFee}</span>
                    </ListGroupItem>
                </ListGroup>
                <ListGroup>
                    <ListGroupItem className="border-0  px-0 total">
                        <h5 className="d-flex align-items-center gap-1">Total</h5>
                        <span>{totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>

                <Button
                    type="submit"
                    className="btn primary__btn w-100 mt-4"
                    onClick={handleClick}
                >
                    Book Now
                </Button>
            </div>

            {/* ===============booking bottom end================= */}
        </div>
    );
};

export default Booking;