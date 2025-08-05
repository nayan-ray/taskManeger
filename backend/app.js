const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDb = require('./config/db');
const userRouter = require('./Routers/userRoute');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');



const app = express();



app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));

app.use(morgan('dev'));
app.use(cookieParser());

//connect to the database
connectDb()


//importing routes
app.use('/api/v1/users', userRouter);

module.exports = app;