const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        res.json(JSON.parse(data));
        console.log("READING FILE!!");
    });
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const currentNotes = JSON.parse(data);
                currentNotes.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(currentNotes), (err) => 
                    err ? console.error(err) : console.log('updated notes file successfully')
                );
            }
        })
        res.json('Note added to db.json');
    } else {
        res.error('Error!! Note was not added.');
    }
});

module.exports = notes;