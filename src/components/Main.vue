<template>
    <main v-if="game.id">
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
        components: {
            State, Board, Results
        },
    };


</script>