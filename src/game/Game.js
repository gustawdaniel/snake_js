import Snake from './Snake';
import Board from './Board';

export default {
    counter: 0,
    timeout: undefined,
    position: undefined,
    id: undefined,
    snakes: [
        // , // ,{x:8,y:-3},{x:7,y:-3}
        // new Snake(1,[{x:0,y:12}],"down") // ,{x:1,y:12},{x:2,y:12}
    ],
    map: new Board(),
    state: "paused",
    run: function () {
       this.snakes[0].move(this.snakes[0].direction);
       this.snakes[1].move(this.snakes[1].direction);
    },
    addSnakeToPosition(position) {
        let snake = undefined;

        if(position === "a") { // left
            snake = new Snake(0,[{x:9,y:-3}],"up");
        } else if(position === "b") { //right
            snake = new Snake(1,[{x:0,y:12}],"down");
        } else if(position === "c") { // top
            // TODO: Change positions
            //throw new Error("Position C not implemented");
            snake = new Snake(2,[{x:0,y:-2}],"down");
        } else if(position === "d") { // bottom
            //throw new Error("Position D not implemented");
            snake = new Snake(4,[{x:9,y:11}],"up");
        }

        if(snake) {
            this.snakes.push(snake);
        } else {
            throw new Error("Wrong position, allowed a,b,c and d");
        }
    },
    init: function (id, position) {
        this.addSnakeToPosition(position)
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