import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { HideLoading, ShowLoading } from "../redux/alertsSlice"
import axios from "axios"
import { Col, Row } from "antd"
import SeatSelection from "../components/SeatSelection"

const BookNow = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [bus, setBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

  const getSingleBus = async () => {
    dispatch(ShowLoading())
    try {
      const { data } = await axios.get(`/api/buses/getSingleBus/${id}`)
      setBus(data)
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  const bookSeat = async() => {
    dispatch(ShowLoading())
    try {
      await axios.post("/api/bookings/bookSeat",{
        bus: bus._id,
        seats: selectedSeats
      })
      dispatch(HideLoading())
      navigate("/bookings")
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  useEffect(() => {
    getSingleBus()
  }, [])

  return (
    <div>
      {bus && (
        <Row className='mt-4' >
          <Col lg={12} xs={24} sm={24} className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <p className='text-2xl font-semibold'>{bus.name}</p>
              <p className='text-base'>
                {bus.from} <span className="font-semibold text-lg">-</span> {bus.to}
              </p>
            </div>
            <hr className='my-2 w-full' />
            <div className='flex flex-col space-y-2'>
              <p className='text-lg text-gray-700'>
                Journey Date :{" "}
                <span className='font-semibold text-black'>
                  {new Date(bus.journeyDate).toLocaleDateString("en-US")}
                </span>
              </p>
              <p className='text-lg text-gray-700'>
                Fare:{" "}
                <span className='font-semibold text-black'>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(bus.fare)}
                </span>
              </p>
              <p className='text-lg text-gray-700'>
                Departure Time :{" "}
                <span className='font-semibold text-black'>
                  {bus.departure}
                </span>
              </p>
              <p className='text-lg text-gray-700'>
                Arrival Time :{" "}
                <span className='font-semibold text-black'>{bus.arrival}</span>
              </p>
              <p className='text-lg text-gray-700'>
               Capacity:{" "}
                <span className='font-semibold text-black'>{bus.capacity}</span>
              </p>
              <p className='text-lg text-gray-700'>
               Seats Left :{" "}
                <span className='font-semibold text-black'>{bus.capacity - bus.seatsBooked.length}</span>
              </p>
            </div>
            <hr />
            <div className='flex flex-col items-start space-y-2'>
              <p className='text-lg text-gray-700'>
                Selected Seats :
                <span className='font-semibold text-black'>
                  {selectedSeats.join(",")}
                </span>
              </p>
              <p className='text-lg text-gray-700'>
                Fare :{" "}
                <span className='font-semibold text-black'>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(bus.fare * selectedSeats.length)}
                </span>
              </p>
              <hr className="w-full"/>
              <button disabled={selectedSeats.length === 0} onClick={() => bookSeat()} className={`${selectedSeats.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-700'} py-2 px-4 rounded-md text-white hover:opacity-80`}>Book Now</button>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  )
}

export default BookNow
