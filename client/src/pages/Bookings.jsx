import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { HideLoading, ShowLoading } from "../redux/alertsSlice"
import axios from "axios"
import PageTitle from "../components/PageTitle"
import { Table, Tag } from "antd"
import Modal from "antd/es/modal/Modal"
import { useReactToPrint } from "react-to-print"

const Bookings = () => {
  const dispatch = useDispatch()

  const [showPrintModal, setShowPrintModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [bookings, setBookings] = useState([])

  const getBookings = async () => {
    dispatch(ShowLoading())
    try {
      const { data } = await axios.post(`/api/bookings/getUsersBookings`, {
        withCredentials: true,
      })
      const userBookings = data.map((booking) => {
        return {
          ...booking,
          ...booking.bus,
          key: booking._id,
        }
      })
      setBookings(userBookings)
      console.log(userBookings)
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  useEffect(() => {
    getBookings()
  }, [])

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
      render: (text, record) => (
        <div>{new Date(record.journeyDate).toLocaleDateString("en-US")}</div>
      ),
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
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
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => (
        <div>
          <p
            onClick={() => {
              setSelectedBooking(record)
              setShowPrintModal(true)
            }}
            className='text-lg underline text-green-800 cursor-pointer'
          >
            Print Ticket
          </p>
        </div>
      ),
    },
  ]

  return (
    <div>
      <PageTitle title='Bookings' />
      <Table dataSource={bookings} columns={columns} className='my-4' />
      <Modal
        destroyOnClose={true}
        open={showPrintModal}
        title='Print Ticket'
        okText="Print"
        okType="dashed"
        onOk={handlePrint}
        onCancel={() => {
          setShowPrintModal(false)
          setSelectedBooking(null)
        }}
      >
        <div className='flex flex-col w-full' ref={componentRef}>
          <div className='flex flex-col space-y-2'>
            <p className='text-lg'>{selectedBooking?.name}</p>
            <p className='text-base text-gray-500'>
              {selectedBooking?.from}{" "}
              <span className='text-black font-bold text-xl'>-</span>{" "}
              {selectedBooking?.to}
            </p>
          </div>
          <hr className='my-2' />
          <div className='flex flex-col space-y-2'>
            <p>
              <span className='font-semibold'>Journey Date : </span>
              {new Date(selectedBooking?.journeyDate).toLocaleDateString(
                "en-US"
              )}
            </p>
            <p>
              <span className='font-semibold'>Journey Time : </span>
              {selectedBooking?.departure}
            </p>
            <p>
              <span className='font-semibold'>Seats Numbers : </span>
              {selectedBooking?.seats.map((seat,index) => {
                return <Tag color="green" key={index}>{seat}</Tag>
              })}
            </p>
          </div>
          <hr className='my-2' />
          <p>
            <span className='font-semibold'>Total Amount : </span>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(selectedBooking?.fare * selectedBooking?.seats.length)}
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default Bookings
