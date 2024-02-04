const express = require('express');
const path = require('path');
const fs = require('fs');
// package to generate unqiue IDs
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware for parsing json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// "GET /notes should return the notes.html file"
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// "GET /api/notes should read the db.json file and return all saved notes as JSON"
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err
        let notesData = JSON.parse(data)
        console.log(notesData);
        res.json(notesData);
    })
});

// "POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client."
app.post('/api/notes', (req, res) => {
    const note = req.body;
    note.id = uuidv4();
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err
        let notesData = JSON.parse(data)
        notesData.push(note)
        fs.writeFile('./db/db.json', JSON.stringify(notesData), (err) => {
            if (err) throw err
            res.status(200).json(notesData)
        })
    })
});

// will try to finish if I have time
// "DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete."
// app.delete('api/notes/:id', (req, res) => {
//     notesData
// });

// "GET * should return the index.html file"
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log('Listening on PORT 3001');
});