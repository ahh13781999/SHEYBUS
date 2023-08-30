import axios from "axios"
import { Alert, Form } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { HideLoading, ShowLoading } from "../redux/alertsSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.alerts)
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  })
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const changeHandler = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const submitForm = async () => {
    if (!loginForm.email || !loginForm.password) {
      setAlert({
        message: "Please fill all the fields",
        type: "error",
      })
      return
    }
    dispatch(ShowLoading())

    try {
      await axios.post("/api/users/login", { ...loginForm })
      setAlert({
        message: "User logged in successfully",
        type: "success",
      })
      dispatch(HideLoading())
      setTimeout(() => {
        navigate("/", { replace: true })
      }, 3000)
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        type: "error",
      })
      dispatch(HideLoading())
    }
  }

  return (
    <div className='relative h-full bg-orange-400'>
      {alert.message && (
        <Alert
          className='absolute w-full'
          message={alert.message}
          type={alert.type}
          showIcon
        />
      )}
      <div className='flex justify-center items-center pt-40'>
        <div className='w-[400px] border-solid shadow-md p-4 rounded-md bg-white'>
          <h1 className='font-semibold text-3xl mb-4 text-center'>Login</h1>
          <Form layout='vertical' onFinish={submitForm}>
            <Form.Item label='Email' className='font-semibold'>
              <input
                name='email'
                onChange={(e) => changeHandler(e)}
                value={loginForm.email}
                type='email'
                className='w-full h-[40px] pl-5 border-solid border-[2px] rounded-md'
              />
            </Form.Item>
            <Form.Item label='Password' className='font-semibold'>
              <input
                name='password'
                onChange={(e) => changeHandler(e)}
                value={loginForm.password}
                type='password'
                className='w-full h-[40px] pl-5 border-solid border-[2px] rounded-md'
              />
            </Form.Item>
            <div className='flex items-center justify-between'>
              <Link
                to='/register'
                className='underline text-red-950 hover:text-blue-700'
              >
                Don't have an account yet?
              </Link>
              <button
                type='submit'
                disabled={loading}
                className='bg-orange-700 border-none px-4 py-2 rounded-md text-white hover:opacity-80 disabled:bg-black disabled:cursor-wait'
              >
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
