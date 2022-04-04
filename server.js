const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
// import our routes
const routes = require('./routes');

// parse incoming JSON data
app.use(express.json());
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));

// use my routes
app.use(require('./routes/api'));

// consume and use our routes
app.use(routes);

// mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thought-box');
// log our queries to mongodb with below code
mongoose.set('debug',true);
app.listen(PORT, () => console.log(`🤑 Connected on port${PORT}`));