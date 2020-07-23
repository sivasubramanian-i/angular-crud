const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let employeeModel = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    designation: {
      type: String
    },
    phoneNumber: {
      type: Number
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true, minimize: false, collection: "employees" }
);

module.exports = mongoose.model("employeeModel", employeeModel);
