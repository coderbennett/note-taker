//this index.js is being used as the API route, which we could
//expand on if we wanted to add more pages to this app

const express = require('express');

const notesRouter = require('./notes');

const app = express();

//we only have a notes router so we only need to include it here
app.use('/notes', notesRouter);

module.exports = app;