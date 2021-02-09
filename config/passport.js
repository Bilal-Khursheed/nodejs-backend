var localStrategy = require("passport-local").Strategy;

var models = require("../models/");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    var user = await models.User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
    done(null, user);
    }
  });

  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      async (username, password, done) => {
        var user = await models.User.findOne({
          where: {
            email: username,
            password: password,
          },
        });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    )
  );
};
