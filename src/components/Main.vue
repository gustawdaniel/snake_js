<template>
    <main>
        <State></State>
        <Board></Board>
        <Results></Results>
    </main>
</template>

<script>

    import Zepto from 'zepto'
    import State from './main/State.vue'
    import Board from './main/Board.vue'
    import Results from './main/Results.vue'
    import Event from '../Event';

//    import Snake from '../game/Snake';
    import game from '../game/Game';
//    import map from '../game/Board';
    import config from '../game/Config';

    export default {
        name: "Main",
        data() {
            return {
                game
            }
        },
        mounted() {
            (function ($) {

                game.init();

            })(Zepto);
        },
        components: {
            State, Board, Results
        },
        created() {
            window.addEventListener('keydown', (e) => {
                console.log({key: e.key, code: e.keyCode});
                switch (e.key) {
                    case "ArrowUp":
                        game.snakes[0].direction = game.snakes[0].direction === "down" || game.state === "paused" ? game.snakes[0].direction : "up"; break;
                    case "ArrowDown":
                        game.snakes[0].direction = game.snakes[0].direction === "up" || game.state === "paused" ? game.snakes[0].direction : "down"; break;
                    case "ArrowLeft":
                        game.snakes[0].direction = game.snakes[0].direction === "right" || game.state === "paused" ? game.snakes[0].direction : "left"; break;
                    case "ArrowRight":
                        game.snakes[0].direction = game.snakes[0].direction === "left" || game.state === "paused" ? game.snakes[0].direction : "right"; break;
                    case "w":
                        game.snakes[1].direction = game.snakes[1].direction === "down" || game.state === "paused" ? game.snakes[1].direction : "up"; break;
                    case "s":
                        game.snakes[1].direction = game.snakes[1].direction === "up" || game.state === "paused" ? game.snakes[1].direction : "down"; break;
                    case "a":
                        game.snakes[1].direction = game.snakes[1].direction === "right" || game.state === "paused" ? game.snakes[1].direction : "left"; break;
                    case "d":
                        game.snakes[1].direction = game.snakes[1].direction === "left" || game.state === "paused" ? game.snakes[1].direction : "right"; break;
                    case " ":
                        if(game.state === 'paused') {
                            game.state = 'active';
                            $(".state").text(game.state.toUpperCase());
                            game.timeout = setInterval(() => {
                                game.counter ++;
                                $('.counter').text(game.counter);
                                game.run();
                            },config.roundTime);
                        } else {
                            this.state = 'paused';
                            $(".state").text(game.state.toUpperCase());
                            clearInterval(this.timeout);
                            game.timeout = undefined;
                        }
                }
                if([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.key) > -1) {
                    console.log("CAT",e);
                    e.preventDefault();
                }
            });
        }
    };


</script>