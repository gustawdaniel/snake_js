import Snake from './Snake';
import Board from './Board.js';

export default {
    counter: 0,
    direction: 'right',
    timeout: undefined,
    snakes: [
        new Snake(0,[{x:9,y:-3}],"up"), // ,{x:8,y:-3},{x:7,y:-3}
        new Snake(1,[{x:0,y:12}],"down") // ,{x:1,y:12},{x:2,y:12}
    ],
    map: new Board(),
    state: "paused",
    run: function () {
       this.snakes[0].move(this.snakes[0].direction);
       this.snakes[1].move(this.snakes[1].direction);
    },
    init: function () {
        this.reset();
    },
    reset: function () {
        this.counter = 0;
        this.direction = 'right';
        this.state = 'paused';
        this.map.init();
    }
};