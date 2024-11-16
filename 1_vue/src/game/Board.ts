import config from './Config';
import game from './Game';
import {Coordinate} from "../types.ts";

export default class Board {
    width: number;
    height: number;
    apples: Coordinate[];

    constructor() {
        this.width = config.mapWidth;
        this.height = config.mapHeight;
        this.apples = [];
    }

    addApple() {
        let apple = {
            x: Math.floor(Math.random() * this.width),
            y: Math.floor(Math.random() * this.height)
        };
       if(game.snakes[0].containsCoordinates(apple) || game.snakes[1].containsCoordinates(apple)) { // apple is on snake  then repeat
           this.addApple();
       } else {
           this.apples.push(apple);
       }
    }

    removeApple(toRemove: Coordinate) {

        this.apples = this.apples.filter((apple) => {
            return apple.x !== toRemove.x && apple.y !== toRemove.y
        });
    }

    static outOfMap(inspected: Coordinate) {
        return inspected.x < 0 || inspected.x >= config.mapWidth
            || inspected.y < 0 || inspected.y >= config.mapHeight;
    }

    static outOfExtendedMap(inspected: Coordinate) {
        return inspected.x < 0 || inspected.x >= config.mapWidth
            || inspected.y < 0-3 || inspected.y >= config.mapHeight+3;
    }

    clearPositions(positions: Coordinate[]) {
        positions.forEach(position => {
            const el = document.querySelector(`div.rect[data-x="${position.x}"][data-y="${position.y}"]`);
            if(el) {
                el.classList.remove('snake-0');
                el.classList.remove('snake-1');
            }
        });
    }

    init() {
        console.log(game.snakes[0]);
        game.snakes[0].init();
        game.snakes[1].init();
        this.addApple()
    }
}