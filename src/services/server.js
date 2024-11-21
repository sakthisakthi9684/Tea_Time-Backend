const Feedback = require("../models/feedback");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

// Create a new feedback
const createFeedback = async (data) => {
  const feedback = new Feedback(data);
  return await feedback.save();
};

// Create a new employee
const createEmployee = async (data) => {
  const employee = new userModel(data);
  return await employee.save();
};

// Create a new tea order
const createTeaOrder = async (data) => {
  try {
    // Check if the employee already has an existing order for the same date
    const existingOrder = await orderModel.findOne({
      employeeID: data.employeeID,
      name: data.name,  // Ensure that the name matches
      "orders.date": data.orders[0].date,  // Assuming the first order's date is the same
    });

    if (existingOrder) {
      // Check if the order time already exists for that date
      const timeExists = existingOrder.orders.some(
        (order) => order.time === data.orders[0].time
      );

      if (timeExists) {
        throw new Error("An order with this time already exists for the selected date.");
      }

      // Push the new order to the existing orders array if the time is unique
      existingOrder.orders.push(...data.orders);

      // Save the updated order
      await existingOrder.save();
      return existingOrder;
    } else {
      // Create a new tea order if no existing order found
      const teaOrder = new orderModel(data);
      return await teaOrder.save();  // Save and return the saved document
    }
  } catch (error) {
    throw new Error(`Error creating tea order: ${error.message}`);
  }
};


module.exports = { createFeedback,createEmployee,createTeaOrder };
