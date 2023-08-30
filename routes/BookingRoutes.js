const { Router } = require("express")
const router = Router()
const {
  BookSeat,
  GetUsersBookings,
  GetAllBookings,
} = require("../controllers/BookingController")
const {
  AuthenticateUser,
  AuthorizePermissions,
} = require("../middleware/authentication")

router.post("/bookSeat", AuthenticateUser, BookSeat)
router.post("/getUsersBookings", AuthenticateUser, GetUsersBookings)
router.post(
  "/getAllBookings",
  [AuthenticateUser, AuthorizePermissions],
  GetAllBookings
)

module.exports = router
