const Bus = require("../models/Bus")

const AddBus = async (req, res) => {
  try {
    const busAlreadyExists = await Bus.findOne({ number: req.body.number })
    if (busAlreadyExists) {
      return res.status(200).json({ message: "The bus already exists!" })
    }
    const bus = await Bus.create({ ...req.body })
    return res.status(200).json({ message: "Bus added successfully!" })
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong try again later!" })
  }
}

const GetAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find(req.body.filters)
    return res.status(200).json(buses)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong try again later!" })
  }
}

const UpdateBus = async (req, res) => {
  const { id } = req.params
  try {
    const busExists = await Bus.findById(id)
    if (busExists) {
      const bus = await Bus.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })
      return res.status(200).json(bus)
    } else {
      return res.status(404).json({ message: "The bus doesn't exist!" })
    }
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const DeleteBus = async (req, res) => {
  const { id } = req.params
  try {
    await Bus.deleteOne({ _id: id })
    return res.status(200).json({ message: "The bus deleted successfully!" })
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message})
  }
}

const GetSingleBus = async (req, res) => {
  const { id } = req.params
  try {
    const bus = await Bus.findById(id)
    if (!bus) {
      return res.status(404).json({ message: "The bus doesn't exists" })
    }
    return res.status(200).json(bus)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong try again later" })
  }
}

module.exports = {
  AddBus,
  GetAllBuses,
  UpdateBus,
  DeleteBus,
  GetSingleBus,
}
