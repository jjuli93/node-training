const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const usersService = require('../lib/users/users.service');

const localStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await usersService.findByEmail(email);
      const success = await bcrypt.compare(password, user.password_hash);
      if (success) {
        done(null, { id: user.id, email, isAdmin: false });
      } else {
        done(new Error('User not found'), null);
      }
    } catch (e) {
      done(e, null);
    }
  },
);

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtStrategyOptions, (jwtPayload, done) => {
  done(null, jwtPayload);
});

module.exports = [localStrategy, jwtStrategy];
