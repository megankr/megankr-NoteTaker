const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware for parsing json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// "GET /notes should return the notes.html file"
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// NOT DONE *****
// "GET /api/notes should read the db.json file and return all saved notes as JSON"
app.get('api/notes', (req, res) => {
    res.json(notesData);
});

// NOT DONE *****
// "POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client."
app.post('api/notes', (req, res) => {

});

// NOT DONE *****
// "DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete."
app.delete('api/notes/:id', (req, res) => {
    notesData 
});

// "GET * should return the index.html file"
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log('Listening on PORT 3001');
});