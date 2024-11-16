<template>
  <div id="map" v-if="show">
    <div v-for="i in range('rows')" class="row">
      <div v-for="j in range('cols')" class="rect" :class="isOutMap(j)" :data-x="i" :data-y="j"
           :data-id="cordsToIndex(i,j)"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {emitter} from "../../eventBus";
import game from '../../game/Game';
import {computed, nextTick, onMounted, ref, watch,} from "vue";

const show = ref(true);

const apples = computed(() => {
  return game.map.apples;
});


// function indexToCords(index) {
//   return {x: index.splice("_")[0], y: index.splice("_")[1]};
// }

function cordsToIndex(i, j) {
  return `${i}_${j}`;
}

function isOutMap(j) {
  return j < 0 || j >= 10 ? "out-map" : "";
}

function range(direction: 'rows' | 'cols') {
  if (direction === 'rows') {
    return (new Array(10)).fill(1).map((e, i) => {
      return i
    })
  } else if (direction === 'cols') {
    return (new Array(10 + 6)).fill(1).map((e, i) => {
      return i - 3
    })
  } else {
    throw new Error("not known direction, possible: rows and cols");
  }
}

function rerender() {
  show.value = false;
  nextTick(() => {
    show.value = true;
    console.log('re-render start');
    nextTick(() => {
      console.log('re-render end')
    })
  })
}

onMounted(() => {
  emitter.on("reset_map", () => {
    rerender();
  });
})

watch(() => game.map.apples, (newApples, oldApples) => {
  oldApples.forEach(a => {
    const element = document.querySelector(`[data-id=${cordsToIndex(a.x, a.y)}]`);
    if (element) {
      element.classList.remove('apple');
    }
  });
  newApples.forEach(a => {
    const element = document.querySelector(`[data-id=${cordsToIndex(a.x, a.y)}]`);
    if (element) {
      element.classList.add('apple');
    }
  });
})

</script>