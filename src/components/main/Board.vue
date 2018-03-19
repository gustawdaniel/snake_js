<template>
    <div id="map" v-if="show">
        <div v-for="i in range()" class="row">
            <div v-for="j in range()" class="rect" :data-x="i" :data-y="j"></div>
        </div>
    </div>
</template>

<script>

    import Event from '../../Event';

    export default {
        name: "Board",
        data() {
            return {show:true}
        },
        methods: {
            range(direction) {
               return (new Array(10)).fill(1).map((e, i)=>{return i})
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
            }
        },
        created: function () {
            Event.$on("reset_map", () => {
                this.rerender();
            });
        }
    }
</script>