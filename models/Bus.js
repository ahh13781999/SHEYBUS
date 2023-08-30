const { Schema, model } = require("mongoose")
const Booking = require("../models/Booking")

const BusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    journeyDate: {
      type: String,
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    fare: {
      type: String,
      required: true,
    },
    seatsBooked: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "Yet To Start",
    },
  },
  {
    timestamps: true,
  }
)

BusSchema.pre("deleteOne", async function () {
  const busId = this.getQuery()["_id"]
  await Booking.deleteMany({ bus: busId })
})

module.exports = model("Bus", BusSchema)
