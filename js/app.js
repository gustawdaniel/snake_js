(function () {

    const config = {
        mapWidth: 10,
        mapHeight: 10,
        snakeColor: "#8165f3",
        mapColor: "#dca6d1",
        appleColor: "#dc5c61",
        roundTime: 500
    };

    let map = {
        width: config.mapWidth,
        height: config.mapHeight,
        apples: [],
        addApple: function () {
            let apple = {
                x: Math.floor(Math.random() * this.width),
                y: Math.floor(Math.random() * this.height)
            };
            if(snake.containsCoordinates(apple)) { // apple is on snake  then repeat
                this.addApple();
            } else {
                this.apples.push(apple);
                $(`div.rect[data-x="${apple.x}"][data-y="${apple.y}"]`).css('background-color',config.appleColor);
            }
        },
        removeApple: function (toRemove) {
            this.apples = this.apples.filter((apple) => {
                return apple.x !== toRemove.x && apple.y !== toRemove.y
            });
        },
        outOfMap: function (inspected) {
            return inspected.x < 0 || inspected.x >= map.width
                || inspected.y < 0 || inspected.y >= map.height;
        },
        init: function () {
            let mapDiv = $('#map');
            mapDiv.html("");
            for(let i=0; i<this.width; i++) {
                let rowDiv =$('<div>', {class: "row"});
                for(let j=0; j<this.width; j++) {
                    rowDiv.append($('<div>',{class:"rect", "data-x":i, "data-y":j}));
                }
                mapDiv.append(rowDiv);
            }
            this.addApple()
        }
    };

    let snake = {
        points: 0,
        body: [],
        init: function () {
            this.body = [{x:5,y:2},{x:4,y:2},{x:3,y:2}];
            this.points = 0;
            $('.points').text(this.points);
            this.draw();
        },
        containsCoordinates: function (inspected) {
            return this.body.filter(function (part) {
                return part.x === inspected.x && part.y === inspected.y }).length
        },
        draw: function() {
            this.body.forEach(function (part) {
                $(`div.rect[data-x="${part.x}"][data-y="${part.y}"]`).css('background-color',config.snakeColor);
            })
        },
        move: function (direction) {
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
            if (map.outOfMap(head) || this.containsCoordinates(head)) {
                game.gameOver();
            } else {
                this.body.unshift(head);
                $(`div.rect[data-x="${head.x}"][data-y="${head.y}"]`)
                    .css('background-color', config.snakeColor);
                if (!this.eatApple()) {
                    let mapCoordinates = this.body.pop();
                    $(`div.rect[data-x="${mapCoordinates.x}"][data-y="${mapCoordinates.y}"]`)
                        .css('background-color', config.mapColor);
                }
            }
        },
        eatApple: function () {
            if(map.apples.filter((part) => {
                return part.x === this.body[0].x && part.y === this.body[0].y }).length
            ) {
                this.points ++;
                $('.points').text(this.points);
                map.removeApple(this.body[0]);
                map.addApple();
                return true;
            }
        }
    };

    let game = {
        counter: 0,
        state: 'paused', // paused, active
        direction: 'right', // right, left, up, down,
        timeout: undefined,
        run: function () {
            snake.move(this.direction);
        },
        init: function () {
            this.counter = 0;
            this.direction = 'right';
            this.state = 'paused';
            $(".state").text(this.state.toUpperCase());
            map.init();
            snake.init();

            document.addEventListener('keypress',(e) => {
                console.log({key: e.key, code: e.keyCode});
                switch (e.key) {
                    case "ArrowUp":
                        this.direction = this.direction === "down" ? this.direction : "up"; break;
                    case "ArrowDown":
                        this.direction = this.direction === "up" ? this.direction : "down"; break;
                    case "ArrowLeft":
                        this.direction = this.direction === "right" ? this.direction : "left"; break;
                    case "ArrowRight":
                        this.direction = this.direction === "left" ? this.direction : "right"; break;
                    case "Enter":
                        if(this.state === 'paused') {
                            this.state = 'active';
                            $(".state").text(this.state.toUpperCase());
                            this.timeout = setInterval(() => {
                                this.counter ++;
                                $('.counter').text(this.counter);
                                this.run();
                            },config.roundTime);
                        }
                }
                if([0, 32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
            })
        },
        logResult: function () {
            $('ul.history').prepend($(`<li>${performance.now().toFixed(2)} - ${snake.points} - ${this.counter} - ${(snake.points/this.counter).toFixed(4)}</li>`));
        },
        gameOver: function () {
            clearInterval(this.timeout);
            this.timeout = undefined;
            this.logResult();
            this.init();
        }
    };

    game.init();

    window.snake = snake;
    window.map = map;
    window.game = game;

})();