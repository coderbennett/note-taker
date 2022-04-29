const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

//the get root route for notes will read the db file and respond with
//parsed JSON data
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        res.json(JSON.parse(data));
    });
});

//the post root route for the notes will add a note to the db file
notes.post('/', (req, res) => {
    //destructure the body of the request (grab the title and text input)
    const { title, text } = req.body;

    //this conditional makes sure there was some content in the post
    if (req.body) {
        // create a new note variable with an id using the uuidv4 module
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        // to add new content to the file while maintaining array
        //structuring we use the following code first to read the file
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                //if there is any error send it to the console
                console.error(err);
            } else {
                //if we have no error then lets store that data we are
                //reading into a currentNotes array
                const currentNotes = JSON.parse(data);

                //add the new note to the currentNotes array
                currentNotes.push(newNote);

                //now we can rewrite the file with the new note added
                fs.writeFile('./db/db.json', JSON.stringify(currentNotes), (err) => 
                    err ? console.error(err) : console.log('added note with id: ' + newNote.id)
                );
            }
        })
        res.json('Note added to db.json');
    } else {
        res.error('Error!! Note was not added.');
    }
});

//this is the delete note route
notes.delete('/:id', (req, res) => {
    //first we can grab the request parameter's (selected note for deletion) id
    const noteId = req.params.id;

    //now we do a similar method from above to read the file and rewrite it with the new change
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            //set a current notes array to the current notes
            const currentNotes = JSON.parse(data);

            //using the filter method on the currentNotes array we can iterate
            //through the array and only return the notes without the note equal
            //to the noteId we set on line 56
            const updatedNotes = currentNotes.filter((note) => note.id !== noteId);

            //now we can rewrite the db file with the update notes array
            fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err) =>
                err ? console.error(err) : console.log('updated notes file successfully- deleted note with id: ' + noteId)
            );
        }
    });
    res.json(`Item ${noteId} has been deleted!!`);
});

module.exports = notes;