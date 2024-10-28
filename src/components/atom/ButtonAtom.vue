<template>
  <button :style="{ backgroundColor: theme.primaryColor }" @click="onClick" class="open-chat-button">
    <slot/>
  </button>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({theme: Object});
const emit = defineEmits(['click']);
const onClick = () => emit('click');
</script>

<style scoped>
.open-chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
