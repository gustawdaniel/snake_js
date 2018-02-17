(function () {

    const config = {
        mapWidth: 10,
        mapHeight: 10,
        snakeColor: "#8165f3"
    };

    let map = {
        width: config.mapWidth,
        height: config.mapHeight,
        init: function () {
            let mapDiv = $('#map');
            for(let i=0; i<this.width; i++) {
                console.log(i);
                let rowDiv =$('<div>', {class: "row"});
                console.log(rowDiv);
                for(let j=0; j<this.width; j++) {
                    rowDiv.append($('<div>',{class:"rect", "data-x":i, "data-y":j}));
                }
                mapDiv.append(rowDiv);
            }
        }
    };

    let snake = {
        body: [{x:5,y:2},{x:4,y:2},{x:3,y:2}],
        drow: function() {
            this.body.forEach(function (part) {
                $(`div.rect[data-x="${part.x}"][data-y="${part.y}"]`).css('background-color',config.snakeColor);
            })
        }
    };

    map.init();
    snake.drow();

    
})();