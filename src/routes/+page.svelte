<script lang="ts">
    import { onMount } from 'svelte';

    let snake = [{ x: 5, y: 5 }];
    let direction = { x: 1, y: 0 };
    let food = { x: 10, y: 10 };
    const gridSize = 20;
    let gameOver = false;

    const move = () => {
        if (gameOver) return;

        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Check for collisions with borders
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            endGame("You hit the border!");
            return;
        }

        // Check for collisions with the snake itself
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            endGame("You collided with yourself!");
            return;
        }

        // Check if the snake eats the food
        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
            snake = [head, ...snake];
        } else {
            snake = [head, ...snake.slice(0, -1)];
        }
    };

    const endGame = (message: string) => {
        gameOver = true;
        console.log(message); // Optionally log the message for debugging
    };

    const resetGame = () => {
        gameOver = false;
        snake = [{ x: 5, y: 5 }];
        direction = { x: 1, y: 0 };
        food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    };

    setInterval(move, 200);

    let map = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => 0));

    onMount(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && gameOver) {
                resetGame();
            }

            if (gameOver) return;

            if (event.key === 'ArrowUp' && direction.y === 0) {
                direction = { x: 0, y: -1 };
            } else if (event.key === 'ArrowDown' && direction.y === 0) {
                direction = { x: 0, y: 1 };
            } else if (event.key === 'ArrowLeft' && direction.x === 0) {
                direction = { x: -1, y: 0 };
            } else if (event.key === 'ArrowRight' && direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
        });
    });
</script>

<div class="game-container">
    {#if gameOver}
        <div class="overlay">
            <p>Game Over!</p>
            <button on:click={resetGame}>Restart</button>
        </div>
    {/if}

    <div class="game-grid">
        {#each map as row, y}
            {#each row as cell, x}
                <div class="map-cell" style="top: {y * 20}px; left: {x * 20}px;"></div>
            {/each}
        {/each}

        {#each snake as segment}
            <div class="snake-segment" style="top: {segment.y * 20}px; left: {segment.x * 20}px;"></div>
        {/each}

        <div class="food" style="top: {food.y * 20}px; left: {food.x * 20}px;"></div>
    </div>
</div>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    /* Container for centering the game */
    .game-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background-color: #0d1117; /* Dark background */
        color: #00ff00; /* Neon green text */
        font-family: 'Courier New', Courier, monospace;
    }

    /* Game grid wrapper */
    .game-grid {
        position: relative;
        width: 400px; /* gridSize * cell size */
        height: 400px; /* gridSize * cell size */
        border: 2px solid #00ff00; /* Neon green border */
        box-shadow: 0 0 20px #00ff00;
    }

    .snake-segment {
        position: absolute;
        width: 20px;
        height: 20px;
        background: linear-gradient(145deg, #00ff00, #006600);
        box-shadow: 0 0 10px #00ff00;
    }

    .map-cell {
        position: absolute;
        width: 20px;
        height: 20px;
        background: #0d1117; /* Matches the background */
        border: 1px solid #222; /* Subtle grid effect */
    }

    .food {
        position: absolute;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #ff0000, #990000);
        box-shadow: 0 0 10px #ff0000;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        color: #00ff00; /* Neon green */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
        text-shadow: 0 0 10px #00ff00;
    }

    .overlay p {
        font-size: 2rem;
        margin-bottom: 20px;
    }

    .overlay button {
        margin-top: 10px;
        padding: 10px 20px;
        background: black;
        color: #00ff00;
        border: 2px solid #00ff00;
        cursor: pointer;
        font-size: 1.2rem;
        font-family: 'Courier New', Courier, monospace;
        box-shadow: 0 0 10px #00ff00;
        transition: background-color 0.3s, color 0.3s;
    }

    .overlay button:hover {
        background-color: #00ff00;
        color: black;
    }
</style>
