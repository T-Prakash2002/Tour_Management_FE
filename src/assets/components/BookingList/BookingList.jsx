import React, { useContext, useEffect, useState } from "react";
import "./bookingList.css";
import { Container, Row, Col } from "reactstrap";
import { AuthContext } from "../../../context/context";
import { BASE_URL } from "../../../utils/config";
import BookingListCard from "./BookingListCard";
import axios from "axios";

const BookingList = () => {
  const { user } = useContext(AuthContext);
  const [bookingList, setBookingList] = useState([]); 

  const { token } = user;
  const { email } = user.data;


  useEffect(() => {

    const fetchBookingList = async (email) => {
      const res = await axios.get(`${BASE_URL}/bookings/user/${email}`, {
        headers: {
          Authorization: `${token}`,
        }
      });
      return res;
    };

    if(user){
      fetchBookingList(email).then(res => {
        setBookingList(res.data.data);
      });
    }

  }, []);

  console.log(bookingList);

  return (
    <div className="booking_list">
      <Container>
        {user ? (
          <Row>
            <Col sm='12' md='12' lg='12'>
                <h2>Booking List</h2>
            </Col>
            <Col>
              <div className="booking_list_card">
                {
                    bookingList && bookingList.map(booking => (
                      <BookingListCard key={booking.id} booking={booking} />
                    ))
                }
                
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <h3>Please Login to See Booking List</h3>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default BookingList;
