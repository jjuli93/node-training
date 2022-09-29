const Router = require('@koa/router');
const jwt = require('jsonwebtoken');

const constants = require('../constants');
const { passport } = require('../../lib');
const { Unauthorized } = require('../errors');

const authRouter = new Router();

function localAuthenticator(ctx) {
  return passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      throw new Unauthorized({ details: 'Invalid credentials' });
    }

    const { email, isAdmin } = user;
    const token = jwt.sign({ email, isAdmin }, constants.JWT_SECRET);
    ctx.body = { token };
  })(ctx);
}

authRouter.post('/login', localAuthenticator);

module.exports = authRouter;
