const express = require("express");
const userControl = require("../controllers/userController.js");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/createuser",
  [
    body("username", "Username must be 5 characters long.").isLength({
      min: 5,
    }),
    body("email", "Please enter a valid email.").isEmail(),
    body("password", "Password should be atleast 5 characters long."),
    body(
      "first_name",
      "First name must be atleast 2 characters long."
    ).isLength({ min: 2 }),
  ],
  userControl.createUser
);

router.post(
  "/login",
  [
    body("username", "Username canot be empty.").exists(),
    body("password", "Password cannot be blank.").exists(),
  ],
  userControl.login
);

module.exports = router;
