import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import PrivateRoute from "./pages/PrivateRoute"
import PublicRoute from "./pages/PublicRoute"
import Loading from "./components/Loading"
import AdminHome from "./pages/Admin/Home"
import AdminBuses from "./pages/Admin/Buses"
import AdminUsers from "./pages/Admin/Users"
import AdminBookings from "./pages/Admin/Bookings"
import BookNow from "./pages/BookNow"
import Bookings from './pages/Bookings'


function App() {
  const { loading } = useSelector((state) => state.alerts)
  return (
    <>
      {loading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={"login"}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path={"register"}
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path='/bookNow/:id'
            element={
              <PrivateRoute>
                <BookNow />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/bookings" element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          }>
          </Route>
          <Route path='/admin'>
            <Route
              index
              element={
                <PrivateRoute>
                  <AdminHome />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='buses'
              element={
                <PrivateRoute>
                  <AdminBuses />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='users'
              element={
                <PrivateRoute>
                  <AdminUsers />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='bookings'
              element={
                <PrivateRoute>
                  <AdminBookings />
                </PrivateRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
