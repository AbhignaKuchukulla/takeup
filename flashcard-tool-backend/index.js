const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abhi@2015',
    database: 'flashcards_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Routes

// Get all flashcards
app.get('/api/flashcards', (req, res) => {
    const sql = 'SELECT * FROM flashcards';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Add a flashcard
app.post('/api/flashcards', (req, res) => {
    const { question, answer } = req.body;
    const sql = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
    db.query(sql, [question, answer], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Flashcard added successfully!', id: result.insertId });
    });
});

// Update a flashcard
app.put('/api/flashcards/:id', (req, res) => {
    const { question, answer } = req.body;
    const sql = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
    db.query(sql, [question, answer, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Flashcard updated successfully!' });
    });
});

// Delete a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
    const sql = 'DELETE FROM flashcards WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Flashcard deleted successfully!' });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));