const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // No need for useNewUrlParser and useUnifiedTopology
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);  // Exit the process if connection fails
  }
};

connectDB();
module.exports = mongoose;
