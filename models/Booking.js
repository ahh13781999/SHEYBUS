const { Schema, model } = require("mongoose")

const BookingSchema = new Schema(
  {
    bus: {
      type: Schema.ObjectId,
      ref: "Bus",
      require: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    },
    seats: {
      type: Array,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model("Booking", BookingSchema)
