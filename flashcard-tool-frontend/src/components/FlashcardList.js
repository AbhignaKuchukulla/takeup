import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import './FlashcardList.css';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const nextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flashcard-list">
      {flashcards.length > 0 ? (
        <>
          <Flashcard flashcard={flashcards[currentIndex]} />
          <div className="navigation">
            <button className="nav-button" onClick={prevFlashcard}>Previous</button>
            <button className="nav-button" onClick={nextFlashcard}>Next</button>
          </div>
        </>
      ) : (
        <p>No flashcards available.</p>
      )}
    </div>
  );
};

export default FlashcardList;
