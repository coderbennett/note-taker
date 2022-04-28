const express = require('express');
const path = require('path');

const PORT = process.env.port || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({}));

app.use(express.static('public'));

//establish the root route to be the index.html
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//establish the /notes route to be the notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);