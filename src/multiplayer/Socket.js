import io from 'socket.io-client'
import game from '../game/Game';

export default {
    init: function () {
        let socket = io('http://localhost:3100');

        document.addEventListener('keydown', function (e) {
            socket.emit('keydown', e.key);
        });

        socket.on('register', function(user){
            console.log("register",user.id);
            console.log("register",user.position);
            game.init(user.id, user.position);
        });


        socket.on('hi', function(msg){
            console.log("HI",msg);
        });
    }
}