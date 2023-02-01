const express = require('express');
const app = express();
const verifyToken = require('../middleware/verify-token');
const { surveyController } = require('../controllers');

app.post('/create', [verifyToken], surveyController.create);
app.get('/get/:surveyId', surveyController.get);
app.delete('/delete/:surveyId', [verifyToken], surveyController.delete);
app.post('/list', [verifyToken], surveyController.list);
app.post('/submit', surveyController.submit);
app.post('/submitted-survey', [verifyToken], surveyController.submittedSurvey);

module.exports = app;