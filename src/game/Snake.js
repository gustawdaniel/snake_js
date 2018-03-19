import config from './Config';
import Board from './Board';
import game from './Game';

export default class Snake {
    constructor(index,body,direction) {
        this.index = index;
        this.points = 0;
        this.body = body;
        this.direction = direction; // right, left, up, down,
        this.inGame = false; // check if snake goes to game area, when snake fail hi is out of game, when enter to game area hi is in game
        this.age = 0; // TODO increment snake age
        this.initialConfig = {
            body: body.slice(),
            direction: direction
        };
        this.logs = [];
    }

    init() {
        this.draw();
    }

    containsCoordinates(inspected) {
        return this.body.filter(function (part) {
            return part.x === inspected.x && part.y === inspected.y }).length
    }

    draw() {
        this.body.forEach((part) => {
            document.querySelector(`div.rect[data-x="${part.x}"][data-y="${part.y}"]`).classList.add(`snake-${this.index}`);
        })
    }

    move(direction) {
        let head = Object.assign({}, this.body[0]);
        switch (direction) {
            case "up":
                head.x = head.x -1; break;
            case "down":
                head.x = head.x + 1; break;
            case "left":
                head.y = head.y - 1; break;
            case "right":
                head.y = head.y + 1; break;
        }
        if (Board.outOfExtendedMap(head) || this.inGame && (Board.outOfMap(head) || this.containsCoordinates(head))) {
            this.gameOver();
        } else {
            if(!this.inGame && !Board.outOfMap(head)) { this.inGame = true; }

            this.body.unshift(head);
            document.querySelector(`div.rect[data-x="${head.x}"][data-y="${head.y}"]`).classList.add(`snake-${this.index}`);
            if (!this.eatApple()) {
                let mapCoordinates = this.body.pop();
                document.querySelector(`div.rect[data-x="${mapCoordinates.x}"][data-y="${mapCoordinates.y}"]`)
                    .classList.remove(`snake-${this.index}`);
            }
        }
    }

    eatApple() {
        if(game.map.apples.filter((part) => {
            return part.x === this.body[0].x && part.y === this.body[0].y }).length
        ) {

            this.points ++;
            game.map.removeApple(this.body[0]);
            game.map.addApple();
            return true;
        }
    }

    gameOver() {
        game.map.clearPositions(this.body);
        this.logResult();
        this.age = 0;
        this.points = 0;
        this.inGame = false;
        this.body = this.initialConfig.body.slice(); // fastest way of cloning array https://stackoverflow.com/questions/3978492/javascript-fastest-way-to-duplicate-an-array-slice-vs-for-loop
        this.direction =  this.initialConfig.direction;

        this.body.forEach(el => document.querySelector(`div.rect[data-x="${el.x}"][data-y="${el.y}"]`).classList.add(`snake-${this.index}`));
    }

    logResult() {

        if(this.inGame) {
            this.logs.unshift({
                now: performance.now().toFixed(2),
                points: this.points,
                age: this.age,
                counter: game.counter
            });
        }
    }
};
