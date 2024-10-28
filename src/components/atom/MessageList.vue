<template>
  <div class="chat-messages">
    <MessageBubble v-for="message in messages" :key="message.id" :text="message.text" :messageType="message.type"
                   :theme="theme"/>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';
import MessageBubble from './MessageBubble.vue';

const props = defineProps({messages: Array, theme: Object});
</script>

<style scoped>
.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}
</style>
