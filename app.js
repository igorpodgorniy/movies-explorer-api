require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routers');
const cors = require('./middlewares/cors');
const errorsProcessing = require('./middlewares/errors-processing');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { LOCAL_HOST_DB } = require('./constants/constants');

const { NODE_ENV, HOST_DB, PORT = 3000 } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production'
  ? HOST_DB
  : LOCAL_HOST_DB, {
  useNewUrlParser: true,
});

app.use(cors);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorsProcessing);

app.listen(PORT, () => {});
