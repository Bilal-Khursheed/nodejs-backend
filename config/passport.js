var localStrategy = require("passport-local").Strategy;

var models = require("../models/");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      async (username, password, done) => {
        var findUser = await models.User.findAndCountAll({
          where: {
            email: username,
            password: password,
          },
        });
        if (findUser.rows.length) {
          return done(null, username);
        } else {
          return done(null, false);
        }
      }
    )
  );
};
