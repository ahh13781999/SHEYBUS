const { Router } = require("express")
const router = Router()
const {
  Login,
  Register,
  Logout,
  VerifyUser,
  GetAllUsers,
  UpdateUserPermissions
} = require("../controllers/UserController")
const {
  AuthenticateUser,
  AuthorizePermissions,
} = require("../middleware/authentication")

router.post("/register", Register)
router.post("/login", Login)
router.post("/logout", Logout)
router.post("/verifyToken", AuthenticateUser, VerifyUser)
router.post("/getAll", [AuthenticateUser, AuthorizePermissions], GetAllUsers)
router.post("/updateUserPermissions",[AuthenticateUser,AuthorizePermissions],UpdateUserPermissions)

module.exports = router
