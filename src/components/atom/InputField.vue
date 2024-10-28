<template>
  <input :placeholder="placeholder" v-model="input" @keyup.enter="submitInput" class="chat-input"/>
</template>

<script setup>
import {defineProps, ref} from 'vue';

const props = defineProps({placeholder: String});
const emit = defineEmits(['submit']);
const input = ref('');

const submitInput = () => {
  if (input.value.trim()) {
    emit('submit', input.value);
    input.value = '';
  }
};
</script>

<style scoped>
.chat-input {
  padding: 10px;
  border: none;
  border-top: 1px solid #ddd;
  width: 100%;
}
</style>
