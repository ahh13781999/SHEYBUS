import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SetUser } from "../redux/usersSlice"
import { HideLoading, ShowLoading } from "../redux/alertsSlice"
import DefaultLayout from '../layouts/Default'

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  const navigate = useNavigate()

  useEffect(() => {
    const VerifyUser = async () => {
      dispatch(ShowLoading())
      try {
        const {
          data: { user },
        } = await axios.post(
          "/api/users/verifyToken",
          {},
          {
            withCredentials: true,
          }
        )
        dispatch(HideLoading())
        dispatch(SetUser(user))
        if (!user) {
          navigate("/login", { replace: true })
        }
      } catch (error) {
        dispatch(HideLoading())
        navigate("/login", { replace: true })
      }
    }
    VerifyUser()
  }, [])

  return <div>{user !== null && <DefaultLayout>{children}</DefaultLayout>}</div>
  
}

export default PrivateRoute
