var express = require("express");
var router = express.Router();
const {check ,validationResult} = require("express-validator")
var userController = require("../users.Controllers/users.Controller");
var userMiddleware = require("../midleware/user.middleWare");

module.exports = (passport) => {

  router.post("/signup",
   userMiddleware.signupValidate,
   userController.signup
   );

  router.post("/login",
  passport.authenticate("local"), 
  userController.login
  );
  
  router.post("/validate" , [
    check('firstName').exists().withMessage('First name is undefined')
  ]),
  (req, res, next)=>{
  const err = validationResult(req)
    
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }else{
      res.status(200).json({ msg: 'validated' });
      return;
    }
  
  }
  return router;
};