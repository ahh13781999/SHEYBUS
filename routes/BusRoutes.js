const { Router } = require("express")
const router = Router()
const {
  AddBus,
  GetAllBuses,
  UpdateBus,
  DeleteBus,
  GetSingleBus
} = require("../controllers/BusController")
const {
  AuthorizePermissions,
  AuthenticateUser,
} = require("../middleware/authentication")

router.post("/addBus", [AuthenticateUser, AuthorizePermissions], AddBus)
router.post("/getAll", [AuthenticateUser], GetAllBuses)
router.patch(
  "/updateBus/:id",
  [AuthenticateUser, AuthorizePermissions],
  UpdateBus
)
router.delete(
  "/deleteBus/:id",
  [AuthenticateUser, AuthorizePermissions],
  DeleteBus
)
router.get("/getSingleBus/:id", AuthenticateUser, GetSingleBus)

module.exports = router
