const User = require("../models/User")
const { AttachCookieToResponse } = require("../utils/jwt")

const Register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const EmailAlreadyExists = await User.findOne({ email })
    if (EmailAlreadyExists) {
      return res.status(400).json({ message: "Email already exists" })
    }
    const user = await User.create({ name, email, password })
    AttachCookieToResponse({ res, user })
    return res.status(200).json({ message: "User created successfully" })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" })
    }
    const isPasswordCorrect = await user.VerifyPassword(password)
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Wrong email or password" })
    }
    if(user.isBlocked){
      return res.status(404).json({ message: "You've been blocked" })
    }
    AttachCookieToResponse({ res, user })
    return res.status(200).json({ message: "User logged in successfully" })
  } catch (error) {
    return res.status(400).json({ message: "Wrong email or password " })
  }
}

const VerifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(400).json({ message: "Unauthenticated user" })
    }
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong try again later!" })
  }
}

const Logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now() + 1000),
    signed: true,
    secure: process.env.NODE_ENV === "production",
  })
  return res.status(200).json({ message: "User logged out successfully!" })
}

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "SomeThing went wrong try again later" })
  }
}

const UpdateUserPermissions = async (req, res) => {
  const { userId, action } = req.body
  try {
    switch (action) {
      case "block":
        await User.findByIdAndUpdate(userId,{isBlocked: true})
        break
      case "unblock":
        await User.findByIdAndUpdate(userId,{isBlocked: false})
        break
      case "make-admin":
        await User.findByIdAndUpdate(userId,{isAdmin: true})
        break
      case "remove-admin":
        await User.findByIdAndUpdate(userId,{isAdmin: false})
        break
      default:
        break
    }
    return res
      .status(200)
      .json({ message: "User updated successfully!" })
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong try again later" })
  }
}

module.exports = {
  Login,
  Register,
  VerifyUser,
  Logout,
  GetAllUsers,
  UpdateUserPermissions,
}
