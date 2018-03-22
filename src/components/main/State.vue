<template>
    <div class="info center">
        <!--<span>{{game.snakes[0].points}}<br>{{game.snakes[0].age}}</span>-->
        <span>{{state}}<br>{{game.counter}}</span>
        <!--<span>{{game.snakes[1].points}}<br>{{game.snakes[1].age}}</span>-->
    </div>
</template>

<script>
    import game from '../../game/Game';

    export default {
        name: "State",
        data() {
            return {
                game
            }
        },
        computed: {
            state() {
                return game.state.toUpperCase();
            }
        }
    }
</script>