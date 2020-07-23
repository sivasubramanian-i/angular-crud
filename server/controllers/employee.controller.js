const { validationResult } = require("express-validator");
const httpStatus = require("http-status");
const _ = require("lodash");
const employeeModel = require("../models/employee");

const EmployeeController = () => {
  const create = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }

      const reqObj = req.body;
      console.log("reqObjreqObjreqObj", reqObj);
      if (_.size(reqObj) > 0) {
        if (reqObj.id) {
          await employeeModel.findByIdAndUpdate(reqObj.id, {
            $set: req.body
          });
        } else {
          await employeeModel.create(reqObj);
        }

        return res.status(httpStatus.OK).json({
          status: true,
          message: "Success"
        });
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: false,
          message: "Request Failed."
        });
      }
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = httpStatus.BAD_REQUEST;
      }
      return res
        .status(err.statusCode)
        .json({ status: false, message: "Request Failed." });
    }
  };

  const list = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }
      const { id } = req.params;
      let cond = {};
      if (id) {
        cond["_id"] = id;
      }
      let employeeData = await employeeModel.find(cond).lean();
      if (_.size(employeeData) <= 0) {
        return res.status(httpStatus.OK).json({
          status: true,
          message: "No Data Found"
        });
      }

      return res.status(httpStatus.OK).json({
        status: true,
        message: "Success",
        data: employeeData
      });
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = httpStatus.BAD_REQUEST;
      }
      return res.status(err.statusCode).json({ status: false, message: err });
    }
  };

  const deleteEmployee = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }
      const { id } = req.params;
      if (id) {
        await employeeModel.deleteOne({ _id: id });

        return res.status(httpStatus.OK).json({
          status: true,
          message: "Success"
        });
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: false,
          message: "Request Failed."
        });
      }
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = httpStatus.BAD_REQUEST;
      }
      return res.status(err.statusCode).json({ status: false, message: err });
    }
  };

  return {
    create,
    list,
    deleteEmployee
  };
};

module.exports = EmployeeController();
