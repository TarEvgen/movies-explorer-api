const router = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  checkBodyUser,
} = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', checkBodyUser, updateUser);

module.exports = router;
