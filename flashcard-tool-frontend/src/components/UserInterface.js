import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import './UserInterface.css';

function UserInterface() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchFlashcards = async () => {
            const res = await axios.get('http://localhost:5000/api/flashcards');
            setFlashcards(res.data);
        };
        fetchFlashcards();
    }, []);

    const nextFlashcard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const prevFlashcard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    return (
        <div className="user-interface">
            <h1>Flashcard Learning Tool</h1>
            {flashcards.length > 0 && (
                <Flashcard flashcard={flashcards[currentIndex]} />
            )}
            <div className="navigation-buttons">
                <button onClick={prevFlashcard} className="nav-button">Previous</button>
                <button onClick={nextFlashcard} className="nav-button">Next</button>
            </div>
        </div>
    );
}

export default UserInterface;
