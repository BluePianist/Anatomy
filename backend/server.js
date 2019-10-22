const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
console.log(uri);

const connetion = mongoose.connection;
connetion.once('open', () => {
    console.log("MongoDB database connection etablished succesfully");
})

const userRouter = require('./routes/user_route');
app.use('/user_route', userRouter);

const dashboardRouter = require('./routes/dashboard');
app.use('/dashboard', dashboardRouter);

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});
