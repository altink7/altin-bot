<template>
  <div class="options">
    <div v-for="option in options" :key="option.label" @click="selectOption(option)"
         :style="{ backgroundColor: theme.userOptionColor }" class="option">
      {{ option.label }}
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({options: Array, theme: Object});
const emit = defineEmits(['select']);

const selectOption = (option) => emit('select', option);
</script>

<style scoped>
.option {
  padding: 8px;
  margin: 4px;
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
}
</style>
