const { connect } = require("mongoose")

const connectDB = (uri) => {
  return connect(uri)
    .then(() => console.log("YOU ARE CONNECTED TO DATABASE"))
    .catch((error) => console.log(error))
}

module.exports = connectDB
