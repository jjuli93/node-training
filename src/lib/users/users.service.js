const { User } = require('./users.model');
const { UserNotFound } = require('../../errors');

module.exports = {
  findByEmail: async (email) => {
    const user = await User.query().findOne('email', email);

    if (!user) {
      throw new UserNotFound({
        message: 'User not found',
        movie_id: email,
        details: 'No user was found with the given email',
      });
    }
    return user;
  },
  find: async (userId) => {
    const user = await User.query().findById(userId);

    if (!user) {
      throw new UserNotFound({
        message: 'User not found',
        movie_id: userId,
        details: 'No user was found with the given id',
      });
    }
    return user;
  },
  addPhoto: async (userId, photoPath) => {
    const user = await User.query().patchAndFetchById(userId, { photo_path: photoPath });

    if (!user) {
      throw new UserNotFound({
        message: 'User not found',
        movie_id: userId,
        details: 'No user was found with the given id',
      });
    }

    return user;
  },
};
