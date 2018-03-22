<template>


    <div>

        <p class="game-id">{{game.id}} ({{game.position}})</p>


        <div class="logs">

            <div v-for="list in logs" class="history">
                <table>
                    <thead>
                        <tr><th>Age</th><th>Counter</th><th>Points</th><th>Time</th><th>Age/Points</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="log in list" :class="best(list,log.points)">
                            <td>{{log.age}}</td>
                            <td>{{log.counter}}</td>
                            <td class="points">{{log.points}}</td>
                            <td>{{log.now}}</td>
                            <td v-text="(log.age / log.points).toFixed(2)"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import game from '../../game/Game';

    export default {
        name: "Results",
        data() {
            return {
                game: game,
                logs: game.snakes.map(s => s.logs)
            }
        },
        methods: {
            best(list, points) {
                console.log("LIST",list, points);
                return Math.max(...(list.map(l => l.points))) === points ? "best" : ""
            }
        }
    }
</script>