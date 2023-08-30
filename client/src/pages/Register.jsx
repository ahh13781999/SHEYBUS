import axios from "axios"
import { Form, Alert } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { HideLoading, ShowLoading } from "../redux/alertsSlice"

const Register = () => {
  const navigate = useNavigate()
  const {loading} = useSelector(state => state.alerts)
  const dispatch = useDispatch()
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  })
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const changeHandler = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  const submitForm = async () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setAlert({
        message: "Passwords are not match",
        type: "error",
      })
      return
    }
    if (!registerForm.name || !registerForm.email) {
      setAlert({
        message: "Please fill all the fields",
        type: "error",
      })
      return
    }
    dispatch(ShowLoading())
    try {
      const { confirmPassword, ...newUserForm } = registerForm
      await axios.post("/api/users/register", {
        ...newUserForm,
      })
      setAlert({
        message: "User created successfully",
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
      <div className='flex justify-center items-center pt-20'>
        <div className='w-[400px] border-solid shadow-md p-4 rounded-md bg-white'>
          <h1 className='font-semibold text-3xl mb-4 text-center'>Register</h1>
          <Form layout='vertical' onFinish={submitForm}>
            <Form.Item label='Name' className='font-semibold'>
              <input
                name='name'
                value={registerForm.name}
                onChange={(e) => changeHandler(e)}
                type='text'
                className='w-full h-[40px] pl-5 border-solid border-[2px] rounded-md'
              />
            </Form.Item>
            <Form.Item label='Email' className='font-semibold'>
              <input
                name='email'
                value={registerForm.email}
                onChange={(e) => changeHandler(e)}
                type='email'
                className='w-full h-[40px] pl-5 border-solid border-[2px] rounded-md'
              />
            </Form.Item>
            <Form.Item label='Password' className='font-semibold'>
              <input
                name='password'
                value={registerForm.password}
                onChange={(e) => changeHandler(e)}
                type='password'
                className='w-full h-[40px] pl-5 border-solid border-[2px] rounded-md'
              />
            </Form.Item>
            <Form.Item label='Confirm Password' className='font-semibold'>
              <input
                name='confirmPassword'
                value={registerForm.confirmPassword}
                onChange={(e) => changeHandler(e)}
                type='password'
                className='w-full h-[40px] pl-5 border-solid border-[2px] rounded-md'
              />
            </Form.Item>
            <div className='flex items-center justify-between'>
              <Link
                to='/login'
                className='underline text-red-950 hover:text-blue-700'
              >
                Already have an account?
              </Link>
              <button
                type='submit'
                disabled={loading}
                className='bg-orange-700 border-none px-4 py-2 rounded-md text-white hover:opacity-80 disabled:bg-black disabled:cursor-wait'
              >
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
