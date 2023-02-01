const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;
const { AdminRoutes, SurveyRoutes } = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/admin', AdminRoutes);
app.use('/survey', SurveyRoutes);

app.get('/', (request, response) => {
  response.json({ info: 'Yeah, server is running well' })
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});