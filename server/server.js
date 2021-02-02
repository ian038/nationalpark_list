const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const mysqlConnection = require('./db/connection')
const path = require('path')

const app = express();

require('dotenv').config()

// Middlewares 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

const port = process.env.PORT || 5000

// Handle production 
if(process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static('client/build'))
  // handle SPA
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html')))
}

app.listen(port, () => {
  console.log('Listening on ' + port)
})

module.exports = app;
