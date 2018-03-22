<template>
    <div id="map" v-if="show">
        <div v-for="i in range('rows')" class="row">
            <div v-for="j in range('cols')" class="rect" :class="isOutMap(i,j)" :data-x="i" :data-y="j" :ref="cordsToIndex(i,j)"></div>
        </div>
    </div>
</template>

<script>

    import Event from '../../Event';
    import game from '../../game/Game';

    export default {
        name: "Board",
        data() {
            return { show:true, game: game }
        },
        computed: {
            apples() {
                return this.game.map.apples;
            },
            snakes() {
                console.log("COMPUTED",game.snakes);
                return game.snakes;
            }
        },
        methods: {
            indexToCords(index) {
                return { x: index.splice("_")[0], y: index.splice("_")[1] };
            },
            cordsToIndex(i, j) {
                return `${i}_${j}`;
            },
            isOutMap(i,j) {
                return j<0 || j>=10 || i<0 || i>=10 ? ( i<0 && j<0 || i>=10 && j>=10 || i<0 && j>=10 || i>=10 && j<0 ? "transparent" : "out-map") : "";
            },
            range(direction) {
                if(direction === 'rows') {
                    return (new Array(10+6)).fill(1).map((e, i)=>{return i-3})
                } else if(direction === 'cols') {
                    return (new Array(10+6)).fill(1).map((e, i)=>{return i-3})
                } else {
                    throw new Error("not known direction, possible: rows and cols");
                }
            },
            rerender(){
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                    console.log('re-render start');
                    this.$nextTick(() => {
                        console.log('re-render end')
                    })
                })
            },
            printSnakes(snakes) {
                snakes.forEach(snake => {
                    snake.body.forEach(a => {
                        console.log(a, this.cordsToIndex(a.x, a.y), this.$refs[this.cordsToIndex(a.x, a.y)], this.$refs);
                        if(this.$refs[this.cordsToIndex(a.x, a.y)]) {
                            this.$refs[this.cordsToIndex(a.x, a.y)][0].classList.add(`snake-${snake.position}`)
                        }
                    });
                });
            }
        },
        created: function () {
            Event.$on("reset_map", () => {
                this.rerender();
            });
        },
        mounted: function() {
            console.log("Mounted", this.$refs);
            this.printSnakes(this.game.snakes);
        },
        watch: {
            apples: function(n, o) {
                o.forEach(a => this.$refs[this.cordsToIndex(a.x,a.y)][0].classList.remove('apple'));
                n.forEach(a => this.$refs[this.cordsToIndex(a.x,a.y)][0].classList.add('apple'));
            },
            snakes: {
                immediate: true,
                handler(n, o) {
                    console.log("SNAKES<WATCH>",n, o);

                    if(o && o.constructor === Array) {
                        console.log("OLD");
                        o.forEach(snake => {
                            snake.body.forEach(a => this.$refs[this.cordsToIndex(a.x, a.y)][0].classList.remove(`snake-${snake.position}`));
                        });
                    }

                    this.printSnakes(n);
                }
            }
        }
    }
</script>