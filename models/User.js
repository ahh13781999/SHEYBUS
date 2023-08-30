const { Schema, model } = require("mongoose")
const { genSalt, hash, compare } = require("bcryptjs")

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre("save", async function () {
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
  return
})

UserSchema.methods.VerifyPassword = async function (enteredPassword) {
  const isPasswordCorrect = await compare(enteredPassword, this.password)
  return isPasswordCorrect
}

module.exports = model("User", UserSchema)
