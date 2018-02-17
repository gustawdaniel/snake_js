(function () {

    const config = {
        mapWidth: 10,
        mapHeight: 10,
        snakeColor: "#8165f3",
        mapColor: "#dca6d1",
        appleColor: "#dc5c61",
        roundTime: 1000
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
            this.apples.push(apple);
            $(`div.rect[data-x="${apple.x}"][data-y="${apple.y}"]`).css('background-color',config.appleColor);
            // console.log(this.apples);
        },
        init: function () {
            let mapDiv = $('#map');
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
        body: [{x:5,y:2},{x:4,y:2},{x:3,y:2}],
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
            this.body.unshift(head);
            $(`div.rect[data-x="${head.x}"][data-y="${head.y}"]`)
                .css('background-color',config.snakeColor);
            let mapCoordinates  = this.body.pop();
            $(`div.rect[data-x="${mapCoordinates.x}"][data-y="${mapCoordinates.y}"]`)
                .css('background-color',config.mapColor);

        }
    };

    let game = {
        counter: 0,
        direction: 'right', // right, left, up, down
        run: function () {
            snake.move(this.direction);
        },
        init: function () {
            map.init();
            snake.draw();
            setInterval(() => {
                this.counter ++;
                $('.counter').text(this.counter);
                this.run();
            },config.roundTime);
            document.addEventListener('keypress',(e) => {
                console.log(e.key);
                switch (e.key) {
                    case "ArrowUp":
                        this.direction = this.direction === "down" ? this.direction : "up"; break;
                    case "ArrowDown":
                        this.direction = this.direction === "up" ? this.direction : "down"; break;
                    case "ArrowLeft":
                        this.direction = this.direction === "right" ? this.direction : "left"; break;
                    case "ArrowRight":
                        this.direction = this.direction === "left" ? this.direction : "right"; break;
                }
            })
        }
    };

    game.init();

    
})();