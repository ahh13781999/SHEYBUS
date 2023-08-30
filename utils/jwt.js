const { verify, sign } = require("jsonwebtoken")

const CreatePayload = (user) => {
  return { name: user.name, userId: user._id, isAdmin: user.isAdmin }
}

const CreateJWTToken = ({ payload }) => {
  const token = sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  return token
}

const IsTokenValid = ({ token }) => {
  return verify(token, process.env.JWT_SECRET)
}

const AttachCookieToResponse = ({ res, user }) => {
  const payload = CreatePayload(user)
  const token = CreateJWTToken({ payload })

  const oneDay = 24 * 60 * 60 * 1000

  res.cookie("token", token, {
    httpOnly: false,
    expires: new Date(Date.now() + oneDay),
    signed: true,
    secure: process.env.NODE_ENV === "production",
  })
}

module.exports = {
  AttachCookieToResponse,
  CreateJWTToken,
  CreatePayload,
  IsTokenValid
}