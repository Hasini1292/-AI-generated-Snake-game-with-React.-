import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 120;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, gameOver, isPaused]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-black border-4 border-cyan shadow-[8px_8px_0px_#FF00FF] relative">
      <div className="flex justify-between w-full items-end mb-2 border-b-2 border-magenta pb-2">
        <div className="text-2xl font-pixel text-glitch text-cyan tracking-widest uppercase" data-text={`DATA: ${score}`}>
          DATA: {score}
        </div>
        <div className="text-xl font-pixel text-glitch text-magenta tracking-widest uppercase" data-text={isPaused ? 'HALTED' : 'EXEC'}>
          {isPaused ? 'HALTED' : 'EXEC'}
        </div>
      </div>

      <div 
        className="relative bg-[#050505] overflow-hidden border-2 border-cyan"
        style={{ 
          width: GRID_SIZE * 20, 
          height: GRID_SIZE * 20,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {/* Grid lines for retro feel */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* Food */}
        <div
          className="absolute w-5 h-5 bg-magenta shadow-[0_0_10px_#FF00FF] animate-pulse"
          style={{
            left: food.x * 20,
            top: food.y * 20,
          }}
        />

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={`${i}-${segment.x}-${segment.y}`}
            className={`absolute w-5 h-5 ${i === 0 ? 'bg-cyan shadow-[0_0_10px_#00FFFF]' : 'bg-cyan/70 border border-black'}`}
            style={{
              left: segment.x * 20,
              top: segment.y * 20,
              zIndex: snake.length - i
            }}
          />
        ))}

        {gameOver && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 border-4 border-magenta">
            <h2 className="text-4xl font-pixel text-glitch text-magenta mb-2 text-center" data-text="FATAL_EXCEPTION">FATAL_EXCEPTION</h2>
            <p className="text-cyan font-mono mb-6">{'>'} SECTORS_LOST: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-black border-2 border-cyan text-cyan font-pixel text-xl hover:bg-cyan hover:text-black transition-colors uppercase"
            >
              [ REBOOT_SEQUENCE ]
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80">
             <button
                onClick={() => setIsPaused(false)}
                className="px-6 py-2 bg-black border-2 border-magenta text-magenta font-pixel text-xl hover:bg-magenta hover:text-black transition-colors uppercase"
              >
                [ INITIATE_EXEC ]
              </button>
          </div>
        )}
      </div>
    </div>
  );
};
