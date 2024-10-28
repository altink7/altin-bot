<template>
  <ChatHeader :theme="theme" @toggle="toggleChat">AltinBot</ChatHeader>
  <MessageList :messages="messages" :theme="theme"/>
  <InputField :placeholder="inputPlaceholder" @submit="handleUserInput"/>
</template>

<script setup>
import {defineProps} from 'vue';
import ChatHeader from './ChatHeader.vue';
import MessageList from './MessageList.vue';
import InputField from './InputField.vue';

const props = defineProps({messages: Array, theme: Object, inputPlaceholder: String});
const emit = defineEmits(['submit']);
const handleUserInput = (input) => emit('submit', input);
</script>
