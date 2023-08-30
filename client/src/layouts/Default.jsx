import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { HideLoading, ShowLoading } from "../redux/alertsSlice"
import axios from "axios"
import logo from "../assets/logo.svg"

const Default = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useSelector((state) => state.users)

  const logout = async () => {
    dispatch(ShowLoading())
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true })
      dispatch(HideLoading())
      setTimeout(() => {
        navigate("/login", { replace: true })
      }, 2000)
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  const userMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Bookings", path: "/bookings", icon: "ri-file-list-line" },
    { name: "Profile", path: "/profile", icon: "ri-user-line" },
  ]
  const adminMenu = [
    { name: "Home", path: "/admin", icon: "ri-home-line" },
    { name: "Buses", path: "/admin/buses", icon: "ri-bus-line" },
    { name: "Users", path: "/admin/users", icon: "ri-user-line" },
    { name: "Bookings", path: "/admin/bookings", icon: "ri-file-list-line" },
  ]
  const menuToBeRendered = user.isAdmin ? adminMenu : userMenu

  return (
    <main
      id='layout-parent'
      className='flex flex-row justify-stretch items-stretch w-full'
    >
      <section
        id='sidebar'
        className={`flex flex-col items-stretch min-h-screen justify-stretch bg-orange-500 rounded-r-md transition-all ${
          collapsed ? "px-2" : "px-4"
        }`}
      >
        <div
          id='sidebar-header'
          className={`${!collapsed ? "py-6 px-4" : "py-3"} flex flex-col items-center space-y-2`}
        >
          <img src={logo} alt='logo' width='100' />
          <h1 id='role' className='flex flex-row text-white font-semibold mt-2'>
            {user.isAdmin ? "Admin" : "User"}
          </h1>
        </div>
        <div className='flex flex-col my-4 mx-4'>
          {menuToBeRendered.map((item, index) => {
            const { icon, name, path } = item
            return (
              <div
                key={index}
                className='my-3 py-2 px-2 border-solid border-4 rounded-md border-transparent hover:border-gray-100'
              >
                <NavLink
                  end
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-row gap-4 text-green-500 hover:text-green-700 text-lg font-semibold"
                      : "flex flex-row gap-4 text-white hover:text-gray-300 text-lg font-medium"
                  }
                >
                  <i className={`${icon} ${collapsed && "text-3xl"} `}></i>
                  {!collapsed && <span>{name}</span>}
                </NavLink>
              </div>
            )
          })}
          <div className='my-3 py-2 px-2 border-solid border-4 rounded-md border-transparent hover:border-gray-100'>
            <div
              className='flex flex-row gap-4 text-white hover:text-gray-300 text-lg font-medium cursor-pointer'
              onClick={() => logout()}
            >
              <i
                className={`ri-logout-box-line ${collapsed && "text-3xl"}`}
              ></i>
              {!collapsed && "Logout"}
            </div>
          </div>
        </div>
      </section>
      <div id='body' className='w-full'>
        <section id='header' className='w-full p-5 shadow-md'>
          {collapsed ? (
            <i
              onClick={() => setCollapsed(!collapsed)}
              className='ri-menu-2-fill cursor-pointer text-xl'
            ></i>
          ) : (
            <i
              onClick={() => setCollapsed(!collapsed)}
              className='ri-close-line cursor-pointer text-xl'
            ></i>
          )}
        </section>
        <section id='content' className='p-3'>
          {children}
        </section>
      </div>
    </main>
  )
}

export default Default
