<script>
    import { onMount } from 'svelte';

    let snake = [{ x: 5, y: 5 }];
    let direction = { x: 1, y: 0 };
    let food = { x: 10, y: 10 };

    const move = () => {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
            snake = [head, ...snake];
        } else {
            snake = [head, ...snake.slice(0, -1)];
        }
    };

    setInterval(move, 200);

    let map = Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => 0));

    onMount(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                direction = {x: 0, y: -1};
            } else if (event.key === 'ArrowDown') {
                direction = {x: 0, y: 1};
            } else if (event.key === 'ArrowLeft') {
                direction = {x: -1, y: 0};
            } else if (event.key === 'ArrowRight') {
                direction = {x: 1, y: 0};
            }
        });
    });
</script>

<div>
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
</style>