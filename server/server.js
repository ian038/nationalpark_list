const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const mysqlConnection = require('./db/connection')

const app = express();

require('dotenv').config()

// Middlewares 
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Listening on ' + port)
})

module.exports = app;
