const express = require('express');
const app = express();
const checkDuplicateEmail = require('../middleware/check-duplicate-email');
const { adminController } = require('../controllers');

app.post('/register', [checkDuplicateEmail], adminController.register);
app.post('/login', adminController.login);

module.exports = app;