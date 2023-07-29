import React, { useState, useEffect } from 'react';
import './SnakeGame.css'; // Import the CSS styles

const SnakeGame = () => {
  // Constants
  const cellSize = 20;
  const gridSize = 20;
  const appleScore = 10;
  const chompSound = new Audio('sounds/music.mp3');
  const music = new Audio('sounds/music.mp3');

  // States
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState('right');
  const [apple, setApple] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [snakeSpeed, setSnakeSpeed] = useState(100);

  // Initialize game board
  useEffect(() => {
    // Add event listener for keyboard controls
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  useEffect(() => {
    // Start the game loop when gameStarted is true
    if (gameStarted) {
      const gameLoopInterval = setInterval(gameLoop, snakeSpeed);

      // Clean up the interval on unmount or game over
      return () => {
        clearInterval(gameLoopInterval);
      };
    }
  }, [gameStarted, snakeSpeed]);

  useEffect(() => {
    // Generate initial apple
    spawnApple();
  }, []); // Empty dependency array to ensure the effect runs only once

  // Set up keyboard controls
  const handleKeyDown = (event) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    if (event.code === 'ArrowUp' && direction !== 'down') {
      setDirection('up');
    }
    if (event.code === 'ArrowRight' && direction !== 'left') {
      setDirection('right');
    }
    if (event.code === 'ArrowDown' && direction !== 'up') {
      setDirection('down');
    }
    if (event.code === 'ArrowLeft' && direction !== 'right') {
      setDirection('left');
    }
  };

  // Main game loop
  const gameLoop = () => {
    // Move the snake
    const head = { x: snake[0].x, y: snake[0].y };
    if (direction === 'up') {
      head.y--;
    }
    if (direction === 'right') {
      head.x++;
    }
    if (direction === 'down') {
      head.y++;
    }
    if (direction === 'left') {
      head.x--;
    }
    setSnake([head, ...snake.slice(0, -1)]);

    // Check for collisions with walls
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      gameOver();
      return;
    }

    // Check for collisions with snake's body
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        gameOver();
        return;
      }
    }

    // Check for collision with apple
    if (apple && head.x === apple.x && head.y === apple.y) {
      setScore(score + appleScore);
      spawnApple();
      setSnake([...snake, snake[snake.length - 1]]);
      chompSound.play();
    }

    // Update timer
    setTimer(timer + 1);
  };

  // Helper function to generate a random integer between min and max (inclusive)
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Spawn a new apple at a random location
  const spawnApple = () => {
    let newApple;
    do {
      newApple = {
        x: getRandomInt(0, gridSize - 1),
        y: getRandomInt(0, gridSize - 1),
      };
    } while (snake.some((segment) => segment.x === newApple.x && segment.y === newApple.y));
    setApple(newApple);
  };

  // Start a new game
  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('up');
    setApple(null);
    setScore(0);
    setTimer(0);

    // Reset timer interval
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setTimerInterval(setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000));

    // Start the game loop
    setGameStarted(true);

    // Start playing music
    music.addEventListener('canplaythrough', () => {
      music.play();
    });
  };

  // End the game and display the game over message
  const gameOver = () => {
    clearInterval(timerInterval);
    setGameStarted(false);
  };

  return (
    <div>
      <div id="board">
        {/* Render the game board */}
        {Array.from(Array(gridSize).keys()).map((row) =>
          Array.from(Array(gridSize).keys()).map((col) => {
            const isSnakeSegment = snake.some((segment) => segment.x === col && segment.y === row);
            const isApple = apple && apple.x === col && apple.y === row;

            return (
              <div
                key={`${row}-${col}`}
                className={`cell ${isSnakeSegment ? 'snake' : ''} ${isApple ? 'apple' : ''}`}
                style={{ width: cellSize, height: cellSize }}
              />
            );
          })
        )}
      </div>
      <div id="score">Score: {score}</div>
      <div id="timer">{`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}</div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default SnakeGame;
