(function () {

    const config = {
        mapWidth: 10,
        mapHeight: 10
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

    map.init();

    
})();