import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState('');
  const [editingAnswer, setEditingAnswer] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleAddFlashcard = () => {
    axios.post('http://localhost:5000/api/flashcards', { question, answer })
      .then(response => {
        alert(response.data.message);
        setQuestion('');
        setAnswer('');
        fetchFlashcards();
      })
      .catch(error => console.error('Error adding flashcard:', error));
  };

  const handleEditFlashcard = (id) => {
    axios.put(`http://localhost:5000/api/flashcards/${id}`, { question: editingQuestion, answer: editingAnswer })
      .then(response => {
        alert(response.data.message);
        setEditId(null);
        setEditingQuestion('');
        setEditingAnswer('');
        fetchFlashcards();
      })
      .catch(error => console.error('Error updating flashcard:', error));
  };

  const handleDeleteFlashcard = (id) => {
    axios.delete(`http://localhost:5000/api/flashcards/${id}`)
      .then(response => {
        alert(response.data.message);
        fetchFlashcards();
      })
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  const fetchFlashcards = () => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="flashcard-form">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleAddFlashcard}>Add Flashcard</button>
      </div>
      <div className="flashcard-list">
        {flashcards.map(flashcard => (
          <div key={flashcard.id} className="flashcard-item">
            {editId === flashcard.id ? (
              <>
                <input
                  type="text"
                  value={editingQuestion}
                  onChange={(e) => setEditingQuestion(e.target.value)}
                />
                <input
                  type="text"
                  value={editingAnswer}
                  onChange={(e) => setEditingAnswer(e.target.value)}
                />
                <button onClick={() => handleEditFlashcard(flashcard.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>Question:</strong> {flashcard.question}</p>
                <p><strong>Answer:</strong> {flashcard.answer}</p>
                <button onClick={() => { setEditId(flashcard.id); setEditingQuestion(flashcard.question); setEditingAnswer(flashcard.answer); }}>Edit</button>
                <button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
