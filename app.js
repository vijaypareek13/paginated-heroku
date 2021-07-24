const dotenv = require("dotenv");
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const app = express();

dotenv.config({ path: path.join(__dirname, './config.env') });

require('./db/conn');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// we link the router files to make our route easy 

//step 3 or final call router
app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;

// Middelware 
app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})