const express = require("express");
const employeeRoutes = require("./employee.route");

const router = express.Router(); // eslint-disable-line new-cap

router.use("/employees", employeeRoutes);

module.exports = router;
