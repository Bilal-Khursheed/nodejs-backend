var express = require("express");
var router = express.Router();

var userController = require("../users.Controllers/users.Controller");

module.exports = (passport) => {
  router.post("/signup", userController.signup);
  router.post(
    "/login",
    passport.authenticate("local"),
    userController.login
  );
  return router;
};
