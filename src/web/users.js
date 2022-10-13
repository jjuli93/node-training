const Router = require('@koa/router');
const multer = require('@koa/multer');
const fs = require('fs');
const mime = require('mime-types');
const { findUserLists } = require('../lib/lists/lists.service');
const { Forbidden, BadRequest, ProfilePhotoNotFound } = require('../errors');
const jwtAuthenticator = require('../middlewares/jwtAuthenticator');
const { addPhoto, find } = require('../lib/users');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename(_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const usersRouter = new Router();
usersRouter.use(jwtAuthenticator);

usersRouter.get('/:userId/lists', async (ctx) => {
  const { userId } = ctx.params;
  const { id } = ctx.state.user;

  if (id !== parseInt(userId, 10)) {
    throw new Forbidden({ details: "You don't have permission to access this resource" });
  }

  const lists = await findUserLists(userId);
  ctx.body = {
    lists,
  };
});

usersRouter.post('/:userId/photo', upload.single('file'), async (ctx) => {
  const { userId } = ctx.params;
  const { id } = ctx.state.user;

  if (id !== parseInt(userId, 10)) {
    throw new Forbidden({ details: "You don't have permission to access this resource" });
  }

  if (!ctx.file) {
    throw new BadRequest({ details: 'file not specified' });
  }

  await addPhoto(userId, ctx.file.path);

  ctx.status = 200;
});

usersRouter.get('/:userId/photo', async (ctx) => {
  const { userId } = ctx.params;

  const user = await find(userId);
  const path = user.photo_path;
  if (!path) {
    throw new ProfilePhotoNotFound({ details: 'User profile photo not found' });
  }
  const mimeType = mime.lookup(path);
  const src = fs.createReadStream(path);

  ctx.response.set('content-type', mimeType);
  ctx.body = src;
});

module.exports = usersRouter;
