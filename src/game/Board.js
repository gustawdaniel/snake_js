import config from './Config';
import game from './Game';

export default class Board {
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
           $(`div.rect[data-x="${apple.x}"][data-y="${apple.y}"]`).addClass('apple');
       }
    }

    removeApple(toRemove) {

        $(`div.rect[data-x="${toRemove.x}"][data-y="${toRemove.y}"]`).removeClass('apple')
        this.apples = this.apples.filter((apple) => {
            return apple.x !== toRemove.x && apple.y !== toRemove.y
        });
    }

    static outOfMap(inspected) {
        return inspected.x < 0 || inspected.x >= config.mapWidth
            || inspected.y < 0 || inspected.y >= config.mapHeight;
    }

    static outOfExtendedMap(inspected) {
        return inspected.x < 0 || inspected.x >= config.mapWidth
            || inspected.y < 0-3 || inspected.y >= config.mapHeight+3;
    }

    clearPositions(positions) {
        positions.forEach(position => {
            $(`div.rect[data-x="${position.x}"][data-y="${position.y}"]`).removeClass('snake-0').removeClass('snake-1');
        });
    }

    init() {
        Event.$emit('reset_map');
        console.log(game.snakes[0]);
        game.snakes[0].init();
        game.snakes[1].init();
        this.addApple()
    }
}