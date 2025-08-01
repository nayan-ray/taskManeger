const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDb = require('./config/db');



const app = express();



app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));

//connect to the database
connectDb()

module.exports = app;