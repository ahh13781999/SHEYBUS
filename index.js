require("express-async-errors")
require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const app = express()

// middleware
const cookieParser = require("cookie-parser")
// routers
const UserRouter = require("./routes/UserRoutes")
const BusRouter = require("./routes/BusRoutes")
const BookingRouter = require("./routes/BookingRoutes")
// middleware
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
// routers
app.use("/api/buses", BusRouter)
app.use("/api/users", UserRouter)
app.use("/api/bookings", BookingRouter)
// port
const port = process.env.PORT || 3000
// start
const Start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`The app is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

Start()
