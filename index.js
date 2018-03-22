const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.use('/js', express.static(__dirname + '/js'));
// app.use('/css', express.static(__dirname + '/css'));
// app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
    // res.sendFile(__dirname + '/admin.html');
});

function getFirstFreeGame(state) {
    for(let i=0; i<state.games.length; i++) {

        const positions = ["a","b","c","d"];

        for(let p=0; p<positions.length; p++) {
            if (state.games[i][positions[p]] === undefined) {
                return {game: state.games[i], position: positions[p]}
            }
        }
    }

    // if not found
    const game = {
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined
    };

    state.games.push(game);

    return {game, position: "a"}
}

function registerUser(state, id) {
    const user = {
        id: id,
    };

    const { game, position } = getFirstFreeGame(state);
    user.game = game;
    user.position = position;
    game[position] = user;

    state.users.push(user)

    return user;
}

function findWithAttr(array, attr, value) {
    for(let i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function removeUser(state, id) {
    console.log(findWithAttr(state.users, 'id', id));

    const position = findWithAttr(state.users, 'id', id);

    let user = state.users[position];
    user.game[user.position] = undefined;
    state.users.splice(position,1);
}


global.state = {
    users: [],
    games: []
};

io.on('connection', function(socket){
    console.log('a user connected', socket.id);

    let user = registerUser(state, socket.id);

    socket.emit('register', { id: user.id, position: user.position });

    socket.broadcast.emit('hi');

    socket.on('keydown', function(code){
        console.log('keydown: ' + `[ ${socket.id} ] `  + code );
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
        removeUser(state, socket.id);
    });
});

io.listen(3100);

http.listen(process.env.PORT || 3000, function(){
    console.log(`listening on *:${process.env.PORT || 3000}`);
});

// setInterval(() => {
//     console.log(state);
// },1000);
