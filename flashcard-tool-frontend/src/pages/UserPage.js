import React from 'react';
import FlashcardList from '../components/FlashcardList';
import './UserPage.css';

const UserPage = () => {
  return (
    <div className="user-page">
    <p className='hello'>Flip through the flashcards to test your knowledge. Click on a card to reveal the answer and use the navigation buttons to move through the set.</p>
      <FlashcardList />
    </div>
  );
};

export default UserPage;
