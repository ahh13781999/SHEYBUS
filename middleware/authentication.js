const { IsTokenValid } = require("../utils/jwt")

const AuthenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token

  if (!token) {
    throw new Error("Authentication Invalid")
  }

  try {
    const { name, userId, isAdmin } = IsTokenValid({ token })
    req.user = { name, userId, isAdmin }
    next()
  } catch (error) {
    throw new Error("Authentication Invalid")
  }
}

const AuthorizePermissions = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new Error("Unauthorized to access this route")
  } else {
    next()
  }
}

module.exports = {
  AuthenticateUser,
  AuthorizePermissions,
}
