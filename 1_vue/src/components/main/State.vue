<template>
  <div class="info center">
    <span>{{ game.snakes[0].points }}<br>{{ game.snakes[0].age }}</span>
    <span>{{ state }}<br>{{ game.counter }}</span>
    <span>{{ game.snakes[1].points }}<br>{{ game.snakes[1].age }}</span>
  </div>
</template>

<script lang="ts" setup>
import game from '../../game/Game.ts';
import {computed} from "vue";

const state = computed(() => {
  return game.state.toUpperCase();
})
</script>