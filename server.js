const path = require('path');
const express = require('express');

const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { NODE_ENV } = require('./config/constant')

   
const transactions = require('./routes/transactions'); //api/v1/routes/transaction
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header('origin'))
  res.header("Access-Control-Allow-Headers", "Origin,  X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials","true");
  res.header("x-api-key", "apiKey")
  next();
});


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold));