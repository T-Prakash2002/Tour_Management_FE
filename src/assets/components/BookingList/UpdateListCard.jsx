import React, { useEffect, useState, useContext } from 'react'
import { useParams,useNavigate, useLocation } from 'react-router-dom'
import { BASE_URL } from '../../../utils/config'
import { Form ,FormGroup ,ListGroup,ListGroupItem} from 'reactstrap'
import axios from 'axios'
import './bookingList.css'
import { AuthContext } from '../../../context/context'

const UpdateListCard = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const { state } = useLocation()
    const { user } = useContext(AuthContext)

    const { token } = user;
    
    const [cardData, setCardData] = useState({
        fullName: state.fullName,
        phone: state.phone,
        bookAt: state.bookAt,
        guestSize: state.guestSize,
        price: '',
        maxGroupSize: 1,
    })

    const serviceFee = 10
    const totalAmount =Number(cardData.price) * Number(cardData.guestSize) - serviceFee;

    useEffect(() => {
        const fetchData = async () => {

            const bookingTour = await axios.get(`${BASE_URL}/tours/${state.tourId}`)

            // console.log(bookingTour.data.data)

            setCardData((prevState) => ({
                ...prevState,
                price: bookingTour.data.data.price,
                maxGroupSize: bookingTour.data.data.maxGroupSize,
            }))
            
        }
        fetchData()
    }, [id])

    // console.log(cardData)

    const handleChange = (e) => {
        setCardData({
            ...cardData,
            [e.target.id]: e.target.value
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const res = await axios.put(`${BASE_URL}/bookings/update/${id}`, cardData, {
          headers: {
            Authorization: `${token}`,
          },
        })

        if(res.data.success){
            alert('Booking Updated Successfully')
            navigate(-1)
        }
    }

  return (
    <div className='booking_update_form row'>
      <div className="booking_form col-12 col-md-6">
                <h5>Information</h5>
                <Form className="booking_info-form" onSubmit={handleUpdate}>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder="Full Name"
                            id="fullName"
                            value={cardData.fullName}
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="number"
                            placeholder="Phone"
                            value={cardData.phone}
                            id="phone"
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <p>Alreadying Booked Date <span className="text-danger">
                            {cardData.bookAt ? cardData.bookAt.slice(0,10) : 'Not Booked Yet'}
                        </span></p>
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        
                        <input
                            type="date"
                            placeholder=""
                            id="bookAt"
                            defaultValue={cardData.bookAt}
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder="Guest"
                            id="guestSize"
                            value={cardData.guestSize}
                            min={1}
                            max={cardData.maxGroupSize}
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Form>
        </div>

        <div className="booking_bottom col-12 col-md-6 p-4">
                <ListGroup>
                    <ListGroupItem className="border-0  px-0">
                        <h5 className="d-flex align-items-center gap-1">
                            ${cardData.price} <i className="ri-close-line"></i> {cardData.guestSize} person
                        </h5>
                        <span>$ {cardData.price}</span>
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

                <button
                    type="submit"
                    className="btn primary__btn w-100 mt-4"
                    onClick={handleUpdate}
                >
                    Update Booking
                </button>
            </div>
    </div>
  )
}

export default UpdateListCard
