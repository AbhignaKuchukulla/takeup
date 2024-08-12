import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p>{flashcard.question}</p>
        </div>
        <div className="flashcard-back">
          <p>{flashcard.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
