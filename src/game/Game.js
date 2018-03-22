import Snake from './Snake';
import Board from './Board';

const game = {
    counter: 0,
    timeout: undefined,
    position: undefined,
    id: undefined,
    snakes: [],
    map: new Board(),
    state: "paused",
    run: function () {
        this.snakes[0].move(this.snakes[0].direction);
        this.snakes[1].move(this.snakes[1].direction);
    },
    addSnakeToPosition(isGamerSnake, position) {
        let snake = undefined;

        snake = new Snake(true, position);

        if(snake) {
            this.snakes.push(snake);
        } else {
            throw new Error("Snake not created");
        }
    },
    init: function (id, position) {
        this.addSnakeToPosition(true, position);
        this.id = id;
        this.position = position;
        this.reset();
    },
    reset: function () {
        this.counter = 0;
        this.state = 'paused';
        this.map.init();
    },
    addListeners: function () {
        window.addEventListener('keydown', (e) => {
            console.log({key: e.key, code: e.keyCode});
            switch (e.key) {
                case "ArrowUp":
                    game.snakes[0].direction = game.snakes[0].direction === "down" || game.state === "paused" ? game.snakes[0].direction : "up"; break;
                case "ArrowDown":
                    game.snakes[0].direction = game.snakes[0].direction === "up" || game.state === "paused" ? game.snakes[0].direction : "down"; break;
                case "ArrowLeft":
                    game.snakes[0].direction = game.snakes[0].direction === "right" || game.state === "paused" ? game.snakes[0].direction : "left"; break;
                case "ArrowRight":
                    game.snakes[0].direction = game.snakes[0].direction === "left" || game.state === "paused" ? game.snakes[0].direction : "right"; break;
                case "w":
                    game.snakes[1].direction = game.snakes[1].direction === "down" || game.state === "paused" ? game.snakes[1].direction : "up"; break;
                case "s":
                    game.snakes[1].direction = game.snakes[1].direction === "up" || game.state === "paused" ? game.snakes[1].direction : "down"; break;
                case "a":
                    game.snakes[1].direction = game.snakes[1].direction === "right" || game.state === "paused" ? game.snakes[1].direction : "left"; break;
                case "d":
                    game.snakes[1].direction = game.snakes[1].direction === "left" || game.state === "paused" ? game.snakes[1].direction : "right"; break;
                case " ":
                    if(game.state === 'paused') {
                        game.state = 'active';
                        game.timeout = game.timeout || setInterval(() => {
                                game.counter ++;
                                game.snakes.forEach(s => s.age++);
                                game.run();
                            },config.roundTime);
                    } else {
                        game.state = 'paused';
                        clearInterval(game.timeout);
                        game.timeout = undefined;
                    }
            }
            if([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.key) > -1) {
                e.preventDefault();
            }
        });
    }
};

// For debug
window.game = game;

export default game