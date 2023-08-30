import { useEffect, useState } from "react"
import PageTitle from "../../components/PageTitle"
import { useDispatch } from "react-redux"
import { HideLoading, ShowLoading } from "../../redux/alertsSlice"
import axios from "axios"
import { Table, Tag } from "antd"

const Bookings = () => {
  const dispatch = useDispatch()
  const [bookings, setBookings] = useState([])

  const getBookings = async () => {
    dispatch(ShowLoading())
    try {
      const { data } = await axios.post("/api/bookings/getAllBookings", {
        withCredentials: true,
      })
      const allBookings = data.map((booking) => {
        return {
          ...booking,
          name: booking.bus.name,
          to: booking.bus.to,
          from: booking.bus.from,
          email: booking.user.email,
          key: booking.id
        }
      })
      setBookings(allBookings)
      console.log(allBookings)
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  const columns = [
    {
      title: "User Email",
      dataIndex: "email",
      key: "booking",
    },
    {
      title: "Bus Name",
      dataIndex: "name",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (text,record) => (
        <div>{
          record.seats.map((seat,index) => {
            return <Tag color="green" key={index}>
              {seat}
            </Tag>
          })
        }</div>
      )
    },
  ]

  useEffect(() => {
    getBookings()
  }, [])

  return (
    <div>
      <div className='flex justify-between my-4'>
        <PageTitle title='Bookings' />
      </div>
      <Table columns={columns} dataSource={bookings} className='my-16' />
    </div>
  )
}

export default Bookings
