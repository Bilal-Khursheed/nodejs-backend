var {body } = require('express-validator') 

const {check ,validationResult} = require("express-validator")


let signupValidate =  [body('firstName')
.exists()
.isAlphanumeric().withMessage('firstName should be alpanumeric')
.isLength({min: 1 , max: 50}).withMessage('firstName should not be empty, should be more than one and less than 50 character')
.trim(),
(req, res, next)=>{
   
    const err = validationResult(req)
    console.log(JSON.stringify(err) )
    if (!err.isEmpty()) {
      res.status(422).json({ errors: err.array() });
      return;
    }else{
     next()
    
    }
}
]

module.exports = {signupValidate}