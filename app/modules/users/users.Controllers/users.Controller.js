var models = require("../../../../models/");

let login = (req, res, next) => {
  res.send("loged In");
};

let signup = async (req, res, next) => {
  try {
    let newUser = {
        firstName: req.body.firstName ? req.body.firstName : "",
        lastName: req.body.lastName ? req.body.lastName : "",
        email: req.body.email ? req.body.email : "",
        address: req.body.address ? req.body.address : "",
        password: req.body.password,
      },
      userAdded = await models.User.create(newUser);
    if (userAdded) {
      return res.json({
        msg: "User is Successfuly Added!",
        data: newUser,
      });
    } else {
      return res.json({
        msg: "User not Added!",
        data: newUser,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  login,
  signup,
};
