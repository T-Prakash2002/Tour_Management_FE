import React, { useEffect, useContext } from "react";
import "./bookingList.css";
import { AuthContext } from "../../../context/context";
import { BASE_URL } from "../../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateListCard from "./UpdateListCard";

const BookingListCard = ({ booking, setBookingList, bookingList }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const {
    _id,
    userId,
    userEmail,
    tourName,
    fullName,
    guestSize,
    phone,
    bookAt,
    price,
    tourId,
    createdAt,
    updatedAt,
  } = booking;


  const { token } = user;

  const handleDelete = async (id) => {
    const res = await axios.delete(`${BASE_URL}/bookings/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    setBookingList(() => {
      return bookingList.filter((booking) => booking._id !== id);
    });

    if (res.data.success) {
      alert(res.data.message);
    }
  };


    const bookingList = await res.data.booking;

    setBookingList(() => {
      return bookingList.map((booking) => {
        if (booking._id === id) {
          return res.data.booking;
        }
        return booking;
      });
    });
  };

  return (
    <div className="booking_card card col-12 col-sm-4 col-md-4 col-lg-3">


      

      <div className="card-title">{tourName}</div>
      <hr />
      <div className="card-content">
        <div className="card-text">
          <strong>Booking Date:</strong>
          {bookAt.slice(0, 10)}
        </div>
        <div className="card-text">
          <strong>Guest Member Size:</strong>
          {guestSize}
        </div>
        <div className="card-text">
          <strong>Booking User Name:</strong>
          {fullName}
        </div>
        <div className="card-text">
          <strong>Booking Created Date:</strong>
          {createdAt.slice(0, 10)}
        </div>
        <div className="card-text">
          <strong>Total Price:</strong>$ {guestSize * price}
        </div>
        <div className="card-text">
          <strong>Phone:</strong>
          {phone}
        </div>
      </div>

      <div className="card-footer row">
        
        <div className="col-6">
          <button
            type="button"
            className="btn btn-primary"
            onClick={()=>{
              navigate(`/booking/update/${_id}`,{state:{...booking}})
            }}
          >
            Edit
          </button>
          
        </div>

        <div className="col-6">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              handleDelete(_id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingListCard;
