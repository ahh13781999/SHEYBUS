import { Col, Row } from "antd"
import React from "react"

const SeatSelection = ({ selectedSeats, setSelectedSeats, bus }) => {
  const capacity = bus.capacity

  const selectOrUnselectSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber))
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  return (
    <div className='w-full block border-2 p-3'>
      <Row gutter={[10, 10]}>
        {Array.from(Array(capacity).keys()).map((seat, index) => {
          let seatClass = ``
          if(selectedSeats.includes(seat + 1)){
            seatClass = "bg-green-500 text-white"
          }else if(bus.seatsBooked.includes(seat + 1)){
            seatClass = "bg-gray-300 text-white hover:bg-red-500 cursor-not-allowed pointer-events-none	"
          }
          return (
            <Col key={index} span={6}>
              <div
                
                onClick={() => selectOrUnselectSeats(seat + 1)}
                className={`flex items-center justify-center p-3 border-2 rounded-sm cursor-pointer hover:bg-green-300 hover:text-white ${seatClass}`}
              >
                {seat+1}
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default SeatSelection
