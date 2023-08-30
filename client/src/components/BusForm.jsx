import { Col, Form, Modal, Row } from "antd"
import axios from "axios"
import { useDispatch } from "react-redux"
import { HideLoading, ShowLoading } from "../redux/alertsSlice"

const BusForm = ({
  showBusForm,
  setShowBusForm,
  type = "add",
  getData,
  selectedBus,
  setSelectedBus,
}) => {
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    dispatch(ShowLoading())
    try {
      if (type === "add") {
        await axios.post("/api/buses/addBus", values)
      } else {
        const { data } = await axios.patch(
          `/api/buses/updateBus/${selectedBus._id}`,
          values
        )
        console.log(data)
      }
      getData()
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
      console.log(error)
    }
    setShowBusForm(false)
    setSelectedBus(null)
  }

  return (
    <Modal
      title={`${type === "edit" ? "Edit Bus" : "Add Bus"}`}
      open={showBusForm}
      onCancel={() => {
        setSelectedBus(null)
        setShowBusForm(false)
      }}
      footer={false}
      destroyOnClose={true}
    >
      <Form
        layout='vertical'
        onFinish={handleSubmit}
        initialValues={{
          ...selectedBus,
          journeyDate: new Date(selectedBus?.journeyDate).toLocaleDateString(
            "en-US"
          ),
        }}
      >
        <Row>
          <Col lg={24} xs={24}>
            <Form.Item label='Bus Name:' name='name'>
              <input
                type='text'
                className='border-2 w-full border-solid rounded-md py-2 px-2'
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Bus Number:' name='number'>
              <input
                type='text'
                className='border-2 w-full border-solid rounded-md py-2 px-2'
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Capacity:' name='capacity'>
              <input
                type='number'
                className='border-2 w-full border-solid rounded-md py-2 px-2'
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Form:' name='from'>
              <input
                type='text'
                className='border-2 w-full border-solid rounded-md py-2 px-2'
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='To:' name='to'>
              <input
                type='text'
                className='border-2 w-full border-solid rounded-md py-2 px-2'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label='Journey Date:' name='journeyDate'>
              <input
                type='date'
                step="month"
                className='border-2 w-full border-solid rounded-md py-2 px-2'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label='Departure:' name='departure'>
              <input
                type='time'
                className='border-2 w-full border-solid rounded-md py-2 px-2'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label='Arrival:' name='arrival'>
              <input
                type='time'
                className='border-2 w-full border-solid rounded-md py-2 px-2'
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Type:' name='type'>
              <select className="w-full border-2  border-solid rounded-md py-2.5 px-2">
                <option value="AC">AC</option>
                <option value="NON-Ac">Non-AC</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Fare:' name='fare'>
              <input
                type='number'
                className='border-2 w-full border-solid rounded-md py-2 px-2'
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Status:' name='status'>
              <select className="w-full border-2  border-solid rounded-md py-2 px-2">
                <option value="Yet To Start">Yet To Start</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2'
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>
  )
}

export default BusForm
