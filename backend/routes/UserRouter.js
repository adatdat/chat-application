const express = require('express');
const app = express();
const { mongoose } = require('../database/mongoose');
// Good practice: to validate object IDs
const { ObjectID } = require('mongodb');
// Mongoose Models

const { User } = require('../models/User');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));