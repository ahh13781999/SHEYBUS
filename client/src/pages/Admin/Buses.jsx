import { useEffect, useState } from "react"
import PageTitle from "../../components/PageTitle"
import BusForm from "../../components/BusForm"
import { useDispatch } from "react-redux"
import { HideLoading, ShowLoading } from "../../redux/alertsSlice"
import axios from "axios"
import { Table, Tag } from "antd"

const Buses = () => {
  const dispatch = useDispatch()
  const [showBusForm, setShowBusForm] = useState(false)
  const [buses, setBuses] = useState([])
  const [selectedBus, setSelectedBus] = useState(null)

  const getBuses = async () => {
    dispatch(ShowLoading())
    try {
      const { data } = await axios.post("/api/buses/getAll", {
        withCredentials: true,
      })
      setBuses(data)
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  const deleteBus = async (id) => {
    dispatch(ShowLoading())
    try {
      await axios.delete(`/api/buses/deleteBus/${id}`, {
        withCredentials: true,
      })
      dispatch(HideLoading())
      getBuses()
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
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
      title: "Journey Date",
      dataIndex: "journeyDate",
      render: (journeyDate) =>
        new Date(journeyDate).toLocaleDateString("en-US"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={`${status === "Completed" ? "success" : "processing" }`}>{status}</Tag>
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className='flex flex-row gap-3'>
          <i
            className='ri-delete-bin-line cursor-pointer'
            onClick={() => {
              deleteBus(record._id)
            }}
          ></i>
          <i
            className='ri-pencil-line cursor-pointer'
            onClick={() => {
              setSelectedBus(record)
              setShowBusForm(true)
            }}
          ></i>
        </div>
      ),
    },
  ]

  useEffect(() => {
    getBuses()
  }, [])

  return (
    <div>
      <div className='flex justify-between my-4'>
        <PageTitle title='Buses' />
        <button
          onClick={() => {
            setShowBusForm(!showBusForm)
            setSelectedBus(null)
          }}
          className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center'
        >
          Add Buss
        </button>
      </div>
      <Table columns={columns} dataSource={buses} className='my-16' />
      <BusForm
        showBusForm={showBusForm}
        setShowBusForm={setShowBusForm}
        type={selectedBus ? "edit" : "add"}
        selectedBus={selectedBus}
        setSelectedBus={setSelectedBus}
        getData={getBuses}
      />
    </div>
  )
}

export default Buses
