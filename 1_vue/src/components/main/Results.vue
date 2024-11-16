<template>
  <div class="logs">
    <div v-for="(list, index) in logs" :key="`list-${index}`" class="history">
      <table>
        <thead>
        <tr>
          <th>Age</th>
          <th>Counter</th>
          <th>Points</th>
          <th>Time</th>
          <th>Age/Points</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(log, logIndex) in list"
            :key="`log-${logIndex}`"
            :class="best(list, log.points)"
        >
          <td>{{ log.age }}</td>
          <td>{{ log.counter }}</td>
          <td class="points">{{ log.points }}</td>
          <td>{{ log.now }}</td>
          <td>{{ (log.age / log.points).toFixed(2) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import game from '../../game/Game.ts';

// Define the shape of log items for type safety
interface Log {
  age: number;
  counter: number;
  points: number;
  now: string;
}

// Initialize logs with reactive state
const logs = reactive(game.snakes.map((s: any) => s.logs));

// Method to find the best log in a list
const best = (list: Log[], points: number): string => {
  return Math.max(...list.map((l) => l.points)) === points ? 'best' : '';
};
</script>

<style scoped>
/* Add your styles here */
.best {
  font-weight: bold;
  color: green;
}
</style>
