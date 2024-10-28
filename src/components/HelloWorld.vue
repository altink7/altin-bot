<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

  <h2 class="read-the-docs">
    Simulates the Client App which is using our Library
  </h2>

  <AltinBot/>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import AltinBot from "../AltinBot.vue";

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
