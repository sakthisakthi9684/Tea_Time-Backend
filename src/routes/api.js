const express = require('express');
const router = express.Router();
const controller = require("../controller/controllers");


// Example route
router.get('/', (req, res) => {
  res.send('API is working!');
});


router.post('/create-feedback',controller.createFeedback)

router.post('/create-employee',controller.createEmployee)

router.post('/create-teaorder',controller.createTeaOrder)

module.exports = router;
