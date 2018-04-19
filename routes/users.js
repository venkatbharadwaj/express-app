var express = require('express');
var router = express.Router();
var userAPI = require('../api/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', userAPI.registerUser);
router.post('/login', userAPI.loginUser);

module.exports = router;
