const service = require("../services/server");


// Create feedback
const createFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    console.log(message);
    
    // Validate the input
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call service to create feedback
    const feedback = await service.createFeedback({ message });

    // Return success response
    res.status(201).json({
      message: "Feedback Added successfully",
      feedback,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Failed to create feedback", details: error.message });
  }
};


// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const { name, email, employeeID, phoneNumber } = req.body;

    if (!name || !email || !employeeID || !phoneNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEmployee = await service.createEmployee({
      name,
      email,
      employeeID,
      phoneNumber,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create employee", details: error.message });
  }
};



// Create a new tea order for an employee
const createTeaOrder = async (req, res) => {
  try {
    const { employeeID, name, orders } = req.body;  // Expecting 'orders' as an array of tea order objects
    
    // Validate required fields
    if (!employeeID || !name || !orders || orders.length === 0) {
      return res.status(400).json({ error: "Employee ID, name, and at least one order are required" });
    }

    // Validate each order in the orders array
    for (const order of orders) {
      const { order: teaOrder, sugarLevel, time, date } = order;
      if (!teaOrder || !sugarLevel || !time || !date) {
        return res.status(400).json({ error: "Each order must contain order, sugar level, time, and date" });
      }
    }

    // Call the service to create the tea orders
    const newTeaOrder = await service.createTeaOrder({
      employeeID,
      name,
      orders,  // An array of order objects
    });

    res.status(201).json({
      message: "Tea order(s) created successfully",
      teaOrder: newTeaOrder,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createFeedback,createEmployee,createTeaOrder };
