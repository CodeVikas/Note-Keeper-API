const express = require('express');
const { register, login } = require('../Controller/authController');

const router = express.Router(); // ✅ Use express.Router, not from 'router' package

router.post('/register', register);
router.post('/login', login);

module.exports = router;
