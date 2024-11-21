const mongoose = require("mongoose");

// Define the schema for individual tea orders
const teaOrderDetailsSchema = new mongoose.Schema(
  {
    order: {
      type: String,
      required: true,
    },
    sugarLevel: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,   // Store date as a Date type
      default: Date.now,  // Default to current date and time if not provided
    }
  },
  {
    timestamps: true,  // This will add createdAt and updatedAt fields for each tea order
  }
);

// Define the main schema for an employee's tea order
const teaOrderSchema = new mongoose.Schema(
  {
    employeeID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    orders: [teaOrderDetailsSchema],  // An array of tea orders using the teaOrderDetailsSchema
  },
  {
    timestamps: true,  // This will add createdAt and updatedAt fields for the overall tea order
  }
);

module.exports = mongoose.model("TeaOrder", teaOrderSchema);
