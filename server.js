const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// "GET /notes should return the notes.html file"
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// "GET * should return the index.html file"
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log('Listening on PORT 3001');
});