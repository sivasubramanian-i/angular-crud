// const express = require('express');
// const app = express();
// const employeeRoute = express.Router();

// Employee model
// let Employee = require('../models/employee');

const express = require("express");
const employeeCtrl = require("../controllers/employee.controller");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router
  .post(
    "/create",
    [
      check("name")
        .exists()
        .withMessage("name is required"),
      check("email")
        .exists()
        .withMessage("email is required"),
      check("designation")
        .exists()
        .withMessage("designation is required"),
      check("phoneNumber")
        .exists()
        .withMessage("phoneNumber is required")
    ],
    employeeCtrl.create
  )

  .get("/list", employeeCtrl.list)

  .get("/list/:id", employeeCtrl.list)

  .delete("/deleteEmployee/:id", employeeCtrl.deleteEmployee);

module.exports = router;
