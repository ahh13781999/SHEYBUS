const Booking = require("../models/Booking")
const Bus = require("../models/Bus")

const BookSeat = async (req, res) => {
  try {
    const newBooking = await Booking.create({
      ...req.body,
      user: req.user.userId,
      transactionId: "13",
    })
    const { bus: busId } = req.body
    const bus = await Bus.findById(busId)
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats]
    await bus.save()
    return res.status(200).json({
      message: "The bus seat booked successfully",
    })
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong try again later",
    })
  }
}

const GetUsersBookings = async (req, res) => {
  const { userId } = req.user
  try {
    const bookings = await Booking.find({ user: userId })
      .populate("bus")
      .populate("user", ["name", "email"])
    return res.status(200).json(bookings)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong try again later!" })
  }
}

const GetAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ })
      .populate("bus")
      .populate("user", ["name", "email"])
    return res.status(200).json(bookings)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong try again later!" })
  }
}

module.exports = {
  BookSeat,
  GetUsersBookings,
  GetAllBookings,
}
