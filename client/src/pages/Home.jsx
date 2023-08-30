import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { HideLoading, ShowLoading } from "../redux/alertsSlice"
import axios from "axios"
import { Col, Row } from "antd"
import Bus from "../components/Bus"

const Home = () => {
  const dispatch = useDispatch()
  const [buses, setBuses] = useState([])
  const [filters, setFilters] = useState({})
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  })

  const getBuses = async () => {
    const tempFilters = {}
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key]
      }
    })

    dispatch(ShowLoading())
    try {
      const { data } = await axios.post(
        "/api/buses/getAll",
        { filters: tempFilters },
        {
          withCredentials: true,
        }
      )
      setBuses(data)
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  useEffect(() => {
    getBuses()
  }, [])

  return (
    <div>
      <div className='mt-4 mb-6 w-full'>
        <Row gutter={10}>
          <Col lg={6} sm={24}>
            <input
              className='w-full border-2 py-2 pl-2 rounded'
              type='text'
              placeholder='From'
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              className='w-full border-2 py-2 pl-2 rounded'
              type='text'
              placeholder='To'
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              className='w-full border-2 py-2 pl-2 rounded'
              type='date'
              placeholder='Date'
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({ ...filters, journeyDate: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className='flex flex-row space-x-2'>
              <button
                className='py-2 px-3 text-base font-semibold bg-orange-500 text-white rounded-md hover:opacity-80'
                onClick={() => getBuses()}
              >
                Filter
              </button>
              <button
                className='py-2 px-3 text-base font-semibold bg-orange-900 text-white rounded-md hover:opacity-80'
                onClick={() => {
                  setFilters({
                    from: "",
                    to: "",
                    journeyDate: ""
                  })
                  getBuses()
                }}
              >
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[15, 15]}>
          {buses
            .filter((bus) => bus.status === "Yet To Start")
            .map((bus, index) => {
              return (
                <Col lg={12} xs={24} sm={24} key={index}>
                  <Bus bus={bus} />
                </Col>
              )
            })}
        </Row>
      </div>
    </div>
  )
}

export default Home
