var express = require("express"),
  passport = require("passport");
var router = express.Router();
var usersController = require("../users.Controllers/users.Controller");

/* GET home page. */
router.post("/home", (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    return res.send("unauthorized")
  }
}, (req, res, next) => {

  res.json({
    message: "Welcome to the Home route",
    user:req.user
  })

});

router.delete('/logout', (req, res, next) => {
  req.logOut()
  res.send("loged out")
})

module.exports = router;