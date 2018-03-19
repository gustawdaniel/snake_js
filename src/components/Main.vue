<template>
    <main>
        <State></State>
        <Board></Board>
        <Results></Results>
    </main>
</template>

<script>

    import State from './main/State.vue'
    import Board from './main/Board.vue'
    import Results from './main/Results.vue'
    import Event from '../Event';

    import game from '../game/Game';
    import config from '../game/Config';

    export default {
        name: "Main",
        data() {
            return {
                game
            }
        },
        mounted() {
            game.init();
        },
        components: {
            State, Board, Results
        },
        created() {
            window.addEventListener('keydown', (e) => {
                console.log({key: e.key, code: e.keyCode, "ok":"ok"});
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
                            document.querySelector(".state").innerText = game.state.toUpperCase();
                            game.timeout = game.timeout || setInterval(() => {
                                game.counter ++;
                                document.querySelector('.counter').innerText = game.counter;
                                game.run();
                            },config.roundTime);
                        } else {
                            game.state = 'paused';
                            document.querySelector(".state").textContent = game.state.toUpperCase();
                            clearInterval(game.timeout);
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