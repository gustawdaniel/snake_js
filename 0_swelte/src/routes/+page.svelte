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

<div>
    {#if gameOver}
        <div class="overlay">
            <p>Game Over!</p>
            <button on:click={resetGame}>Restart</button>
        </div>
    {/if}

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

<style>
    .snake-segment {
        position: absolute;
        width: 20px;
        height: 20px;
        background: green;
    }

    .map-cell {
        position: absolute;
        width: 20px;
        height: 20px;
        background: white;
        border: 1px solid black;
    }

    .food {
        position: absolute;
        width: 20px;
        height: 20px;
        background: red;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }

    .overlay button {
        margin-top: 10px;
        padding: 10px 20px;
        background: white;
        color: black;
        border: none;
        cursor: pointer;
        font-size: 1rem;
    }
</style>
