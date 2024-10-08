import React, { useState } from 'react';
import './App.css';

function App() {
  const flashcards = [
    { question: "Helium is well-known to make your voice's tone much higher. A less renowned gas called Sulfur Hexafluoride, does the opposite. Which property of these gases is the reason your voice is influenced this way?", answer: "Density" },
    { question: "Pneumonoultramicroscopicsilicovolcanoconiosis is recognized as the longest English word in practical use. What does it mean?", answer: "Black Lung" },
    { question: "Which acid is most corrosive to inorganic substances?", answer: "Sulfuric" },
    { question: "A scientific _____ is an explanation for observable facts that is supported by experimental evidence?", answer: "Theory" },
    { question: "Light from the laser is________?", answer: "Monochromatic" },
    { question: "Schrödinger’s cat is a thought experiment dealing with which type of mechanics?", answer: "Quantum Mechanics" },
    { question: "What is the most abundant gas in Earth's atmosphere?", answer: "Nitrogen" },
    { question: "Which law states that the volume of a gas is inversely proportional to its pressure?", answer: "Boyle's Law" },
    { question: "What is the chemical symbol for gold?", answer: "Au" },
    { question: "Who discovered the law of universal gravitation?", answer: "Isaac Newton" },
    { question: "What is the name of the unit used to measure force?", answer: "Newton" },
    { question: "What type of reaction absorbs heat?", answer: "Endothermic" },
    { question: "What is the speed of light in a vacuum?", answer: "299,792 kilometers per second" },
    { question: "Which element is known for its ability to conduct electricity and is often used in electrical wiring?", answer: "Copper" },
    { question: "In physics, what does 'E' represent in Einstein’s equation E=mc²?", answer: "Energy" },
    { question: "What type of bond involves the sharing of electron pairs between atoms?", answer: "Covalent bond" },
    { question: "What is the boiling point of water at sea level?", answer: "100°C" },
    { question: "What is the most abundant element in the universe?", answer: "Hydrogen" },
    { question: "Which particle in an atom carries a positive charge?", answer: "Proton" },
    { question: "What principle explains why airplanes can fly?", answer: "Bernoulli's Principle" },
    { question: "What is the pH level of pure water?", answer: "7" },
    { question: "Which gas is commonly known as laughing gas?", answer: "Nitrous Oxide" },
    { question: "What does the Heisenberg Uncertainty Principle pertain to?", answer: "The position and momentum of particles" }
  ];


  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Shuffle flashcards
  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5); // Shuffle the array
    setCurrentCardIndex(0); // Reset to the first card after shuffling
    setIsFlipped(false); // Reset flip state
    setUserGuess(''); // Clear guess input
    setFeedback(null); // Clear feedback
  };

  // Handle card flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setFeedback(null); // Reset feedback when flipping
  };

  // Handle checking the guess with basic fuzzy matching
  const handleGuessSubmit = () => {
    const correctAnswer = flashcards[currentCardIndex].answer.toLowerCase();
    const guess = userGuess.toLowerCase().trim();
    
    if (correctAnswer.includes(guess)) {
      setFeedback('Correct!');
      setStreak(streak + 1); // Update streak
      if (streak + 1 > longestStreak) setLongestStreak(streak + 1); // Update longest streak
    } else {
      setFeedback('Incorrect. Try again!');
      setStreak(0); // Reset streak if answer is wrong
    }
  };

  // Handle navigation to the next card
  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length); // Cycle through cards
    setIsFlipped(false); // Reset to the question side
    setUserGuess(''); // Clear guess input
    setFeedback(null); // Clear feedback when moving to the next card
  };

  // Handle navigation to the previous card
  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false); // Reset to the question side
    setUserGuess(''); // Clear guess input
    setFeedback(null); // Clear feedback when moving to the previous card
  };

  return (
    <div className="App">
      <h1>The Ultimate Science Whiz Quiz</h1>

      {/* Display streaks */}
      <div className="streaks">
        <p>Current Streak: {streak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>

      <div className="card" onClick={handleFlip}>
        {isFlipped ? flashcards[currentCardIndex].answer : flashcards[currentCardIndex].question}
      </div>

      <div className="guess-input">
        <label>Guess the answer here:</label>
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter your guess"
        />
        <button onClick={handleGuessSubmit}>Submit Guess</button>
      </div>

      {feedback && <div className="feedback">{feedback}</div>}

      <div className="card-navigation">
        <button onClick={handlePrevious}>←</button>
        <button onClick={handleNext}>→</button>
      </div>

      {/* Shuffle button */}
      <button onClick={shuffleCards}>Shuffle Cards</button>
    </div>
  );
}

export default App;