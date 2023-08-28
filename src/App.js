import React, { useState } from 'react';
import './App.css';
import { getRandomWord } from './wordBank';

function App() {
    const [word, setWord] = useState(getRandomWord());
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuessCount, setIncorrectGuessCount] = useState(0);
    const maxIncorrectGuesses = 7;

    const resetGame = () => {
        setWord(getRandomWord());
        setGuessedLetters([]);
        setIncorrectGuessCount(0);
    };

    const handleGuess = (letter) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);

            if (!word.includes(letter)) {
                setIncorrectGuessCount(prevCount => prevCount + 1);
            }
        }
    };

    const isWordGuessed = word.split('').every(letter => guessedLetters.includes(letter));

    return (
        <div className="App">
            <WordDisplay word={word} guessedLetters={guessedLetters} />
            <GuessInput onGuess={handleGuess} />

            {isWordGuessed ? <div>Congratulations! You won!</div> :
                incorrectGuessCount >= maxIncorrectGuesses ? <div>You ran out of guesses, try again!</div> :
                <WrongGuesses word={word} guessedLetters={guessedLetters} />
            }

            <button onClick={resetGame}>Restart Game</button>
        </div>
    );
}

function WordDisplay({ word, guessedLetters }) {
    const display = word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');

    return <div>{display}</div>;
}

function GuessInput({ onGuess }) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.length === 1 && /[A-Z]/i.test(inputValue)) {
            onGuess(inputValue.toUpperCase());
            setInputValue("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)} 
                maxLength="1" 
            />
            <button type="submit">Guess</button>
        </form>
    );
}

function WrongGuesses({ word, guessedLetters }) {
    const wrongGuesses = guessedLetters.filter(letter => !word.includes(letter));

    return <div>Incorrect Guesses: {wrongGuesses.join(', ')}</div>;
}

export default App;
