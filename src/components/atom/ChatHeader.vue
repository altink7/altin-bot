<template>
  <div class="chat-header" :style="{ backgroundColor: theme.primaryColor }" @click="toggle">
    <slot/>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({theme: Object});
const emit = defineEmits(['toggle']);
const toggle = () => emit('toggle');
</script>

<style scoped>
.chat-header {
  color: #fff;
  padding: 10px;
  cursor: pointer;
}
</style>
